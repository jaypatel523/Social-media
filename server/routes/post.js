const express = require('express');
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');
const postCtrl = require('../controllers/post');
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: "uploads/" })
const authentication = require('../middleware/authentication');



// router.route('/api/new/post/:userId').post(postCtrl.createPost);


// my api routes
router.route('/api/new/post/:userId').post(authentication, upload.single('image'), postCtrl.create)
router.route('/api/getposts/:userId').get(authentication, postCtrl.getAllPostOfUser);
router.route('/api/getallposts').get(authentication, postCtrl.getAllPost);
router.route('/api/posts/like').put(authentication, postCtrl.like)
router.route('/api/posts/unlike').put(authentication, postCtrl.unlike)
// router.route('/api/post/isLike/:postId/:userId').get(authentication, postCtrl.isLiked);
router.route('/api/posts/comment').put(authentication, postCtrl.comment);
router.route('/api/posts/uncomment').put(authentication, postCtrl.uncomment);
router.route('/api/posts/getcomments/:postId').get(authentication, postCtrl.getAllComments);




router.route('/api/posts/photo/:postId').get(postCtrl.photo)

router.route('/api/posts/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('/api/posts/feed/:userId')
    .get(authCtrl.requireSignin, postCtrl.listNewsFeed)



router.route('/api/posts/:postId')
    .delete(authCtrl.requireSignin, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

module.exports = router
