const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  checkFeeItemID: [
    check('feeItemId')
      .trim()
      .notEmpty()
      .withMessage('"feeItemId" is required.')
      .isUUID('4')
      .withMessage('"feeItemId" must be a UUIDv4'),
  ],
  create: [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('NAME is required.')
      .isString()
      .withMessage(
        'NAME must be in a string format.'
      ),
    check('description')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"description" can not be empty.')
      .isString()
      .withMessage(
        '"description" must be in a string format.'
      ),
  ],
  update: [
    check('name')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('NAME is required.')
      .isString()
      .withMessage(
        'NAME must be in a string format.'
      ),
    check('description')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"description" can not be empty.')
      .isString()
      .withMessage(
        '"description" must be in a string format.'
      ),
    check('status')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"status" cannot be empty')
      .isIn(['pending', 'published', 'inactive'])
      .withMessage(
        '"status" must be in ["pending", "published", "inactive"]'
      ),
  ],
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
