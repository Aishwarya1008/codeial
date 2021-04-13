const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.profileUpdate);
router.get('/posts', userController.usersPosts);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),userController.createSession);
router.get('/sign-out', userController.destroySession);
module.exports = router;