const Post = require('../models/post');
const getErrorMessage = require('../error/errorHandler');
const formidable = require('formidable');
const fs = require('fs');




const create = async (req, res) => {
    try {
        const caption = req.body.caption;
        const imageUrl = req.file.path;

        if (!caption || !imageUrl) {
            throw new Error('please enter proper details')
        }

        let post = new Post({ text: caption, imageUrl: imageUrl });
        post.postedBy = req.profile;


        let result = await post.save();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ error: err.message })
    }
}

const getAllPost = async (req, res) => {
    try {
        let posts = await Post.find({});
        res.send(posts);
    } catch (error) {
        res.send(error.message);
    }
}


const getAllPostOfUser = async (req, res) => {
    try {
        let posts = await Post.find({ postedBy: req.params.userId }).sort('created');
        res.send(posts);
    } catch (error) {
        res.send(error.message);
    }
}


const like = async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true })
        console.log(result);
        res.send({ result })
    } catch (error) {
        res.status(400).send(error);
    }
}


const unlike = async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true })
        res.send({ result })
    } catch (error) {
        res.send(error.message);
    }
}


const comment = async (req, res) => {
    try {
        let comment = { text: req.body.comment, commentedBy: req.body.userId };
        let result = await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true }).populate('comments.commentedBy', 'name').exec();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
}



const uncomment = async (req, res) => {
    try {
        console.log("uncomment", req.body);
        let result = await Post.findOneAndUpdate(req.body.postId, { $pull: { comments: { _id: req.body.commentId } } }, { new: true }).populate('comments.commentedBy', 'name').exec();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
}


const getAllComments = async (req, res) => {
    try {
        let result = await Post.find({ _id: req.params.postId }).populate('comments.commentedBy', '_id name').exec();
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
}









const postByID = async (req, res, next, id) => {
    try {
        let post = await Post.findById(id).populate('postedBy', '_id name').exec()
        if (!post)
            return res.status('400').json({
                error: "Post not found"
            })
        req.post = post
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve use post"
        })
    }
}

const listByUser = async (req, res) => {
    try {
        let posts = await Post.find({ postedBy: req.profile._id })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(posts)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let posts = await Post.find({ postedBy: { $in: req.profile.following } })
            .populate('comments.postedBy', '_id name')
            .populate('postedBy', '_id name')
            .sort('-created')
            .exec()
        res.json(posts)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    let post = req.post
    try {
        let deletedPost = await post.remove()
        res.json(deletedPost)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}


const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}


// real time try


const isLiked = async (req, res) => {
    try {
        // console.log(req.params);
        let result = await Post.find({ likes: { _id: req.params.userId } });
        // console.log("res", result);
        if (!result[0]) {
            return res.send({ liked: false });
        }
        res.send({ liked: true });
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
}

module.exports = {
    listByUser,
    listNewsFeed,
    create,
    postByID,
    remove,
    photo,
    like,
    unlike,
    comment,
    uncomment,
    isPoster,
    getAllPost,
    isLiked,
    getAllPostOfUser,
    getAllComments
}
