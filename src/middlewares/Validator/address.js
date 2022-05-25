const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  checkAddressNo: [
    check('address_no')
      .trim()
      .notEmpty()
      .withMessage('ADDRESS NUMBER is required.')
      .isUUID('4')
      .withMessage('ADDRESS NUMBER must be a UUIDv4'),
  ],
  create: [
    check('title')
      .trim()
      .notEmpty()
      .withMessage('TITLE is required.')
      .isString()
      .withMessage(
        'TITLE must be in a string format.'
      ),
    check('address')
      .trim()
      .notEmpty()
      .withMessage('ADDRESS is required.')
      .isString()
      .withMessage(
        'ADDRESS must be in a string format.'
      ),
    check('state')
      .trim()
      .notEmpty()
      .withMessage('STATE is required.')
      .isString()
      .withMessage(
        'STATE must be in a string format.'
      ),
    check('country')
      .trim()
      .notEmpty()
      .withMessage('COUNTRY is required.')
      .isString()
      .withMessage(
        'COUNTRY must be in a string format.'
      ),
    check('longitude')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('LONGITUDE can not empty.')
      .isNumeric()
      .isDecimal({
        force_decimal: false,
        decimal_digits: '1,4',
        locale: 'en-US',
      })
      .withMessage('LONGITUDE must be a float with 4 decimal places.')
      .isFloat({
        min: -180,
        max: 180,
      })
      .withMessage(
        'LONGITUDE has to be within the [-180 -- 180] range.'
      ),
    check('latitude')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('LATITUDE can not be empty.')
      .isNumeric()
      .isDecimal({
        force_decimal: false,
        decimal_digits: '1,4',
        locale: 'en-US',
      })
      .withMessage('LATITUDE must be a float with 4 decimal places.')
      .isFloat({
        min: -90,
        max: 90,
      })
      .withMessage(
        'LATITUDE has to be within the [-90 -- 90] range.'
      ),
  ],
  update: [
    check('title')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('TITLE can not be empty.')
      .isString()
      .withMessage(
        'TITLE must be in a string format.'
      ),
    check('address')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('ADDRESS can not be empty.')
      .isString()
      .withMessage(
        'ADDRESS must be in a string format.'
      ),
    check('state')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('STATE can not be empty.')
      .isString()
      .withMessage(
        'STATE must be in a string format.'
      ),
    check('country')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('COUNTRY can not be empty.')
      .isString()
      .withMessage(
        'COUNTRY must be in a string format.'
      ),
    check('longitude')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('LONGITUDE can not be empty.')
      .isNumeric()
      .isDecimal({
        force_decimal: false,
        decimal_digits: '1,4',
        locale: 'en-US',
      })
      .withMessage('LONGITUDE must be a float with 4 decimal places.')
      .isFloat({
        min: -180,
        max: 180,
      })
      .withMessage(
        'LONGITUDE has to be within the [-180 -- 180] range.'
      ),
    check('latitude')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('LATITUDE can not be empty.')
      .isNumeric()
      .isDecimal({
        force_decimal: false,
        decimal_digits: '1,4',
        locale: 'en-US',
      })
      .withMessage('LATITUDE must be a float with 4 decimal places.')
      .isFloat({
        min: -90,
        max: 90,
      })
      .withMessage(
        'LATITUDE has to be within the [-90 -- 90] range.'
      ),
  ],
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
