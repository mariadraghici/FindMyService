// const {S3} = require("aws-sdk");
const {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const Image = require('./models/image');
const User = require('./models/user');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require('sharp');

// exports.s3Uploadv2 = async (files) => {
//     const s3 = new S3();

//     const params = files.map(file => {
//         return {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: `uploads/${uuid()}-${file.originalname}`,
//             Body: file.buffer
//         }
//     });

//     return await Promise.all(params.map(param => s3.upload(param).promise()));
// }

exports.s3Uploadv3 = async (files, username) => {
    const s3client = new S3Client();
    console.log(username);

    const length = files.length;
    const fileNames = [];

    for (let i = 0; i < length; i++) {
        fileNames.push(`uploads/${username}-${uuid()}-${files[i].originalname}`);
    }

    // Resize images with Sharp
    const resizedImages = await Promise.all(files.map(file => {
        return sharp(file.buffer)
            .resize({ width: 600, height: 400, fit: 'contain'})
            .toBuffer();
    }));

    const params = resizedImages.map((file, index) => {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileNames[index],
            Body: file.buffer
        }
    });

    await Promise.all(params.map(param => s3client.send(new PutObjectCommand(param))));

    const user = await User.findOne({name: username});
    console.log(user);
    imagesIds = [];
    const result = await Promise.all(fileNames.map(async (fileName) => {
        const image = await Image.create({imageName: fileName});
        imagesIds.push(image._id);
    }));

    user.images.push(...imagesIds);
    const res = await user.save();

    return res;
}

exports.s3GetImages = async (serviceName) => {
    const s3 = new S3Client();
    const user = await User.find({name: serviceName}).populate('images');
    const images = user[0].images;
    // console.log(images);

    for (const image of images) {
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: image.imageName,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        image.url = url;
    }

    return images;
}

exports.s3DeleteImages = async (serviceName, imageId) => {
    const s3client = new S3Client();
    const user = await User.findOne({ name: serviceName }).populate('images');
    
    if (!user) {
        throw new Error("User not found");
    }

    const image = user.images.find(image => image._id == imageId);

    if (!image) {
        throw new Error("Image not found");
    }

    // Delete the image from S3
    const deleteObjectParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imageName,
    };
    await s3client.send(new DeleteObjectCommand(deleteObjectParams));

    // Remove the image reference from the user's images array
    user.images.pull(imageId);
    await user.save();

    // Delete the image document from the database
    await Image.findByIdAndDelete(imageId);

    return { message: "Image deleted successfully" };
};