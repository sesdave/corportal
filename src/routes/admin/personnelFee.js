const { Router } = require("express");
const personnelFeeController = require('../../controllers/personnelFee.controller');
const isAuthorized = require('../../middlewares/isAuthorized');

const router = Router();

router.get('/:personnelFeeId', isAuthorized(''), personnelFeeController.getOne);
router.put('/:personnelFeeId', isAuthorized(''), personnelFeeController.update);
router.post('/', isAuthorized(''), personnelFeeController.create);
router.get('/', personnelFeeController.getAll);

module.exports = router;