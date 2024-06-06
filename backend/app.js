const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');
const uuid = require('uuid').v4;
const User = require('./models/user');
const Image = require('./models/image');
const sharp = require('sharp');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

// Create http Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Import Routes
const authRoutes = require('./routes/auth');
const brandRoutes = require('./routes/brand');
const modelRoutes = require('./routes/model');
const carRoutes = require('./routes/car');
const userRoutes = require('./routes/user');
const facilityRoutes = require('./routes/facility');
const cityRoutes = require('./routes/city');
const serviceRoutes = require('./routes/service');
const reviewRoutes = require('./routes/review');
const serviceFacilityRoutes = require('./routes/serviceFacility');
const offerRoutes = require('./routes/offer');
const addressRoutes = require('./routes/address');
const ErrorResponse = require('./utils/errorResponse');
const { s3Upload, s3Uploadv3, s3GetImages} = require('./s3Service');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const conn = mongoose.connection;
// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(cookieParser());
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Routes Middleware
app.use("/api", authRoutes);
app.use("/api", brandRoutes);
app.use("/api", modelRoutes);
app.use("/api", carRoutes);
app.use("/api", userRoutes);
app.use("/api", facilityRoutes);
app.use("/api", cityRoutes);
app.use("/api", serviceRoutes);
app.use("/api", reviewRoutes);
app.use("/api", serviceFacilityRoutes);
app.use("/api", offerRoutes);
app.use("/api", addressRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// Error Handler Middleware
app.use(errorHandler);


// single file upload
// app.post('/api/upload', upload.single("file"), (req, res) => {
//   res.json({ status: 'success' });
// });

// customizing the file name
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `ServiceAuto-${file.originalname}`);
//   }
// });

// decomment for amazon s3
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5, files: 5}});

// decoment for amazon s3
// app.post('/api/upload', upload.array("file"), async (req, res) => {
//   const files = req.files;
//   const username = req.body.name;

//   try {
//     const results = await s3Uploadv3(files, username);
//     console.log(results);
//   } catch (error) {
//     console.log(error);
//   }
//   res.json({ status: 'success' });

// });

// app.get('/api/images/service/:serviceName', async (req, res) => {
//   const serviceName = req.params.serviceName;
//   console.log(serviceName);
//   try {
//     const images = await s3GetImages(serviceName);
//     res.json({ images });
//   } catch (error) {
//     console.log(error);
//   }
//   res.json({ images: [] });
// });

app.post('/api/upload', upload.array("file"), async (req, res) => {
  try {
    const files = req.files;
    const username = req.body.name;
    const length = files.length;
    const fileNames = [];

    if (!files) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    for (let i = 0; i < length; i++) {
      fileNames.push(`${files[i].originalname}`);
  }

    const promises = files.map(async (file, index) => {
      const buffer = await sharp(file.buffer)
        .resize({ width: 600, height: 400, fit: 'contain'  }) // Resize the image to 800px width, adjust as needed
        .toBuffer();

      const filePath = path.join(__dirname, 'public', 'uploads', `${fileNames[index]}`);

      // Ensure the uploads directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Write the resized image to the disk
      fs.writeFileSync(filePath, buffer);
    });

    // Wait for all file processing to complete
    await Promise.all(promises);

    res.status(200).json({status: 'success'})
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/images/service/:serviceName', async (req, res) => {
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Fisierul trebuie sa fie o imagine!' });
    } else if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Dimensiunea fisiserului e prea mare!' });
    } else if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ message: 'Prea multe fisiere selectate!' });
    }
  } else if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});