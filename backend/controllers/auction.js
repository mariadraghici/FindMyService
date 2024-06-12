const Auction = require('../models/auction');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.createAuction = async(req, res, next) => {
    try {
        console.log(req.body);
        const auction = await Auction.create(req.body);

        if (!auction) {
            return next(new Error('Auction could not be created!'));
        }

        const user = await User.findById(req.user._id);

        console.log(user);

        if (!user) {
            return next(new Error('User not found!'));
        }

        user.auctions.push(auction._id);

        await user.save();

        res.status(201).json({
            success: true,
            auction
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.displayAuctions = async(req, res, next) => {
    // try {
    //     const posts = await Post.find().populate('comments').populate('user');
    //     posts.sort((a, b) => b.createdAt - a.createdAt);
    //     res.status(201).json({
    //         success: true,
    //         posts
    //     });
    // } catch (error) {
    //     console.log(error);
    //     next(error);
    // }

    try {
        const { page = 1, limit = 10 } = req.query;
        
        const auctions = await Auction.find().skip((page - 1) * limit)
            .limit(Number(limit));
        
        const totalAuctions = await Auction.countDocuments();
        
        res.status(200).json({
            success: true,
            auctions,
            totalPages: Math.ceil(totalAuctions / limit),
            currentPage: page,
        });
    } catch (error) {
        next(error);
    }
}

exports.displayAuction = async(req, res, next) => {
    try {
        const auction = await Auction.findById(req.params.id).populate('comments').populate('user');
        res.status(201).json({
            success: true,
            auction
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.deleteAuction = async(req, res, next) => {
    try {
        await Auction.deleteOne({_id: req.params.id});
        res.status(200).json({
            success: true,
            message: 'Post deleted successfully!'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getCommentsForAuction = async(req, res, next) => {
    try {
        const comments = await Comment.find({auction: req.params.id}).populate('user');

        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

