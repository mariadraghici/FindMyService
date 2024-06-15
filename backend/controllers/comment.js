const Comment = require('../models/comment');
const Auction = require('../models/auction');

exports.createCommentAndAddToAuction = async(req, res, next) => {
    try {
        const comment = await Comment.create(req.body);

        if (!comment) {
            return next(ErrorResponse('Comment could not be created!', 400));
        }

        const auctionId = req.body.auction;

        const auction = await Auction.findById(auctionId);

        const bestBid = auction.bestBid;

        auction.comments.push(comment._id);

        await auction.save();

        if (comment.price < bestBid || bestBid === 0) {
            auction.bestBid = comment.price;
            auction.bestBidder = comment.user;
            await auction.save();
        }

        res.status(201).json({
            success: true,
            comment
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getComments = async(req, res, next) => {
    try {
        const comments = await Comment.find({auction: req.params.id});
        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}