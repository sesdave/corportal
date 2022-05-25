const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  checkRoleId: [
    check('roleId')
      .trim()
      .notEmpty()
      .withMessage('"roleId" is required.')
      .isUUID('4')
      .withMessage('"roleId" must be a UUIDv4'),
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
  checkPermissionIds: [
    check('permissionIds')
      .notEmpty()
      .withMessage('"personnelIds" is required.')
      .isArray({ min: 1 })
      .withMessage(
        '"permissionIds" must be a non-empty array of permission ids.'
      ),
  ],
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
