const { Router } = require("express");
const feeItemController = require('../../controllers/feeItem.controller');
const validate = require('../../middlewares/Validator/feeItem');
const isAuthorized = require('../../middlewares/isAuthorized');

const router = Router();

const firmFeeRoutes = require('./firmFee');
const personnelFeeRoutes = require('./personnelFee');

router.use('/:feeItemId/firms', validate('checkFeeItemID'), firmFeeRoutes);
router.use('/:feeItemId/personnels', validate('checkFeeItemID'), personnelFeeRoutes);

router.get('/:feeItemId', isAuthorized(''), validate('checkFeeItemID'), feeItemController.getOne);
router.put('/:feeItemId', isAuthorized(''), validate('checkFeeItemID'), validate('update'), feeItemController.update);
router.post('/', isAuthorized(''), validate('create'), feeItemController.create);
router.get('/', isAuthorized(''), feeItemController.getAll);

module.exports = router;