const { Router } = require("express");
const firmFeeController = require('../../controllers/firmFee.controller');
const isAuthorized = require('../../middlewares/isAuthorized');

const router = Router();

router.get('/:firmFeeId', isAuthorized(''), firmFeeController.getOne);
router.put('/:firmFeeId', isAuthorized(''), firmFeeController.update);
router.post('/', isAuthorized(''), firmFeeController.create);
router.get('/', firmFeeController.getAll);

module.exports = router;