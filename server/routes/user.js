const express = require('express');
const multer = require('multer');
const upload = multer({ dest: "uploads/" })
const {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    photo,
    defaultPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    editProfile,
    getProfile
} = require('../controllers/user');
const {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}
    = require('../controllers/auth');
const authentication = require('../middleware/authentication');

const router = express.Router()

// my roues
router.route('/api/newuser').post(create)
router.route('/api/profile/:userId').get(authentication, getProfile);
router.route('/api/editprofile').put(authentication, upload.single('profile'), editProfile);




router.route('/api/users/photo/:userId').get(photo, defaultPhoto)
router.route('/api/users/defaultphoto').get(defaultPhoto)
router.route('/api/users/follow').put(requireSignin, addFollowing, addFollower)
router.route('/api/users/unfollow').put(requireSignin, removeFollowing, removeFollower)
router.route('/api/users/findpeople/:userId').get(requireSignin, findPeople)
router.route('/api/users/:userId')
    .get(requireSignin, read)
    .put(requireSignin, hasAuthorization, update)
    .delete(requireSignin, hasAuthorization, remove)
router.param('userId', userByID)

module.exports = router
