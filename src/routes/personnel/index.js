const { Router } = require("express");
const authController = require('../../controllers/auth.controller');
const validate = require('../../middlewares/Validator/auth');

const router = Router();

router.post('/signup', validate('createPersonnel'), authController.register);
// router.post(
//     '/update-password',
//     isAuthenticated,
//     isAuthorized(),
//     validate('updatePassword'),
//     buyerController.updatePassword
// );
// router.post(
//     '/forgot-password', 
//     validate('forgotPassword'),
//     buyerController.setPassword
// );

module.exports = router;