const Auction = require('../models/auction');
const User = require('../models/user');
const Comment = require('../models/comment');

exports.createAuction = async(req, res, next) => {
    try {
        console.log(req.body);
        const auction = await Auction.create(req.body);

        if (!auction) {
            return next(new Error('Licitația nu a putut fi creată!'));
        }

        const user = await User.findById(req.user._id);

        console.log(user);

        if (!user) {
            return next(new Error('Utilizatorul nu a fost găsit!'));
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
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const auctions = await Auction.find().skip((page - 1) * limit)
            .limit(Number(limit)).sort({ createdAt: -1 }).populate('bestBidder').populate('user');
        
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

exports.deleteAuction = async(req, res, next) => {
    try {
        const auction = await Auction.findById(req.params.id);

        if (!auction) {
            return next(new Error('Licitația nu a fost găsită!'));
        }

        await auction.remove();

        await Comment.deleteMany({auction: req.params.id});

        await User.updateOne({ _id: req.user._id }, { $pull: { auctions: req.params.id } });

        res.status(200).json({
            success: true,
            message: 'Licitația a fost ștearsă cu succes!'
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

exports.displayAuctionsForUser = async(req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const auctions = await Auction.find({user: req.user._id}).skip((page - 1) * limit).limit(Number(limit)).sort({ createdAt: -1 }).populate('bestBidder').populate('user');

        if (!auctions) {
            return next(new Error('Licitațiile nu au fost găsite!'));
        }

        const totalAuctions = await Auction.countDocuments({user: req.user._id});

        res.status(200).json({
            success: true,
            auctions,
            totalPages: Math.ceil(totalAuctions / limit),
            currentPage: page,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

