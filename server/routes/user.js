const express = require('express');
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
    findPeople
} = require('../controllers/user');
const {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}
    = require('../controllers/auth');

const router = express.Router()

router.route('/api/newuser').get(list).post(create)
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
