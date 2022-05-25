const { Router } = require("express");
const authController = require('../../controllers/auth.controller');
const validate = require('../../middlewares/Validator/auth');
const isAuthenticated = require('../../middlewares/isAuthenticated');

const router = Router();
const feeItemRoutes = require('./feeItem');
const aclRoutes = require('./acl');

router.post('/signup', validate('createAdmin'), authController.register);
// router.get('/send-otp', validate('sendOtp'), buyerController.sendOtp);
// router.post('/verify-otp', validate('sendOtp'), buyerController.verifyOtp);

router.use('/feeItems', isAuthenticated, feeItemRoutes);
router.use('/acl', isAuthenticated, aclRoutes);

module.exports = router;