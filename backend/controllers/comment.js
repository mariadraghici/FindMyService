const Comment = require('../models/comment');

exports.createCommentAndAddToAuction = async(req, res, next) => {
    try {
        const comment = await Comment.create(req.body);
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