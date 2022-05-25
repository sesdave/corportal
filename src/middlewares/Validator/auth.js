const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  checkUserNo: [
    check('user_no')
      .trim()
      .notEmpty()
      .withMessage('User Number is required.')
      .isMongoId()
      .withMessage('User Number must be a mongo ID'),
  ],
  createPersonnel: [
    check('firstName')
      .trim()
      .notEmpty()
      .withMessage('FIRST NAME is required')
      .isString()
      .withMessage(
        'FIRST NAME must be in a string format.'
      ),
    check('lastName')
      .trim()
      .notEmpty()
      .withMessage('LAST NAME is required')
      .isString()
      .withMessage(
        'LAST NAME must be in a string format.'
      ),
    check('otherNames')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('OTHER NAME cannot be empty')
      .isString()
      .withMessage(
        'OTHER NAME must be in a string format.'
      ),
    check('email')
      .trim()
      .notEmpty()
      .withMessage('EMAIL is required.')
      .isEmail()
      .withMessage('EMAIL must be in an email format.'),
    check('phone')
      .trim()
      .notEmpty()
      .withMessage('PHONE NUMBER is required.')
      .isNumeric()
      .withMessage('PHONE NUMBER must be numberic.')
      .isLength({ min: 8 })
      .withMessage('PHONE NUMBER must have minimum length of 8.'),
    check('userType')
      .trim()
      .notEmpty()
      .withMessage('USER TYPE is required.')
      .isIn(["Personnel"])
      .withMessage('USER TYPE must be "Personnel"'),
    check('password').trim().notEmpty().withMessage('PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
    check('proposer1')
      .trim()
      .notEmpty()
      .withMessage('PROPOSER 1 cannot be empty')
      .isString()
      .withMessage(
        'PROPOSER 1 must be in a string format.'
      ),
    check('proposer2')
      .trim()
      .notEmpty()
      .withMessage('PROPOSER 2 cannot be empty')
      .isString()
      .withMessage(
        'PROPOSER 2 must be in a string format.'
      ),
    check('practiceState')
      .trim()
      .notEmpty()
      .withMessage('PRACTICE STATE cannot be empty')
      .isString()
      .withMessage(
        'PRACTICE STATE must be in a string format.'
      ),
    check('personnelCategory')
      .trim()
      .notEmpty()
      .withMessage('PERSONNEL CATEGORY cannot be empty')
      .isString()
      .withMessage(
        'PERSONNEL CATEGORY must be in a string format.'
      ),
    check('liveAndWorkInNigeria')
      .notEmpty()
      .withMessage('"liveAndWorkInNigeria" cannot be empty')
      .isBoolean()
      .withMessage(
        '"liveAndWorkInNigeria" must be in a boolean format.'
      ),
    check('isProfessionalBodyMember')
      .optional()
      .notEmpty()
      .withMessage('"isProfessionalBodyMember" cannot be empty')
      .isBoolean()
      .withMessage(
        '"isProfessionalBodyMember" must be in a boolean format.'
      ),
    check('professionalBody')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"professionalBody" cannot be empty')
      .isString()
      .withMessage(
        '"professionalBody" must be in a string format.'
      ),
    check('professionalMembershipNumber')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"professionalMembershipNumber" cannot be empty')
      .isString()
      .withMessage(
        '"professionalMembershipNumber" must be in a string format.'
      ),
    check('engineeringBase')
      .trim()
      .notEmpty()
      .withMessage('"engineeringBase" cannot be empty')
      .isString()
      .withMessage(
        '"engineeringBase" must be in a string format.'
      ),
    check('applicationStatus')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"applicationStatus" cannot be empty')
      .isString()
      .withMessage(
        '"applicationStatus" must be in a string format.'
      ),
  ],
  createFirm: [
    check('firmName')
      .trim()
      .notEmpty()
      .withMessage('FIRM NAME is required')
      .isString()
      .withMessage(
        'FIRM NAME must be in a string format.'
      ),
    check('firmType')
      .trim()
      .notEmpty()
      .withMessage('FIRM TYPE is required')
      .isString()
      .withMessage(
        'FIRM TYPE must be in a string format.'
      ),
    check('yearOfIncorporation')
      .trim()
      .notEmpty()
      .withMessage('"yearOfIncorporation" is required')
      .isInt()
      .withMessage(
        '"yearOfIncorporation" must be in an integer format.'
      ),
    check('email')
      .trim()
      .notEmpty()
      .withMessage('EMAIL is required.')
      .isEmail()
      .withMessage('EMAIL must be in an email format.'),
    check('phone')
      .trim()
      .notEmpty()
      .withMessage('PHONE NUMBER is required.')
      .isNumeric()
      .isLength({ min: 8 })
      .withMessage('PHONE NUMBER must be numberic.'),
    check('userType')
      .trim()
      .notEmpty()
      .withMessage('USER TYPE is required.')
      .isIn(['Firm'])
      .withMessage('USER TYPE must be "Firm"'),
    check('password').trim().notEmpty().withMessage('PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
    check('rcNumber')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"rcNumber" cannot be empty.')
      .isString()
      .withMessage(
        '"rcNumber" must be in a string format.'
      ),
    check('rcRegType')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"rcRegType" cannot be empty.')
      .isString()
      .withMessage(
        '"rcRegType" must be in a string format.'
      ),
    check('practiceState')
      .trim()
      .notEmpty()
      .withMessage('PRACTICE STATE is required.')
      .isString()
      .withMessage(
        'PRACTICE STATE must be in a string format.'
      ),
    check('firmCategory')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('FIRM CATEGORY cannot be empty')
      .isString()
      .withMessage(
        'FIRM CATEGORY must be in a string format.'
      ),
    check('firmSize')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"firmSize" cannot be empty')
      .isString()
      .withMessage(
        '"firmSize" must be in a string format.'
      ),
    check('consultingRegType')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"consultingRegType" cannot be empty')
      .isString()
      .withMessage(
        '"consultingRegType" must be in a string format.'
      ),
    check('applicationStatus')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"applicationStatus" cannot be empty')
      .isString()
      .withMessage(
        '"applicationStatus" must be in a string format.'
      ),
  ],
  createAdmin: [
    check('name')
      .trim()
      .notEmpty()
      .withMessage('NAME is required')
      .isString()
      .withMessage(
        'NAME must be in a string format.'
      ),
      check('roleId')
        .trim()
        .notEmpty()
        .withMessage('ROLE ID is required.')
        .isUUID('4')
        .withMessage('ROLE ID must be a UUIDv4'),
    check('states')
      .optional()
      .notEmpty()
      .withMessage('STATES is required')
      .isArray()
      .withMessage(
        'STATES must be in an array format.'
      ),
    check('categories')
      .optional()
      .notEmpty()
      .withMessage('CATEGORIES is required')
      .isArray()
      .withMessage(
        'CATEGORIES must be in an array format.'
      ),
    check('email')
      .trim()
      .notEmpty()
      .withMessage('EMAIL is required.')
      .isEmail()
      .withMessage('EMAIL must be in an email format.'),
    check('phone')
      .trim()
      .notEmpty()
      .withMessage('PHONE NUMBER is required.')
      .isNumeric()
      .isLength({ min: 8 })
      .withMessage('PHONE NUMBER must be numberic.'),
    check('userType')
      .trim()
      .notEmpty()
      .withMessage('USER TYPE is required.')
      .isIn(['Admin'])
      .withMessage('USER TYPE must be "Admin"'),
    check('password').trim().notEmpty().withMessage('PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
 
    check('status')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"status" cannot be empty')
      .isString()
      .withMessage(
        '"status" must be in a string format.'
      ),
  ],
  update: [
    check('name')
      .trim()
      .optional()
      .notEmpty()
      .isAlpha()
      .withMessage(
        'NAME must be in a string format.'
      ),
  ],
  sendOtp: oneOf([
    check('email')
      .trim()
      .notEmpty()
      .withMessage('EMAIL is required.')
      .isEmail()
      .withMessage('EMAIL must be in an email format.'),
    check('phone')
      .trim()
      .notEmpty()
      .withMessage('PHONE NUMBER is required.')
      .isNumeric()
      .isLength({ min: 8, max: 15 })
      .withMessage('PHONE NUMBER must be numberic.'),
  ]),
  verifyOtp: oneOf([
    [
      check('email')
        .trim()
        .notEmpty()
        .withMessage('EMAIL is required.')
        .isEmail()
        .withMessage('EMAIL must be in an email format.'),
      check('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required.')
        .isNumeric()
        .withMessage('OTP must be numeric.'),

    ], [
      check('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required.')
        .isNumeric()
        .withMessage('OTP must be numeric.'),
      check('phone')
        .trim()
        .notEmpty()
        .withMessage('PHONE NUMBER is required.')
        .isNumeric()
        .isLength({ min: 8, max: 15 })
        .withMessage('PHONE NUMBER must be numberic.'),
    ]
  ]),
  signIn: [
    check('user')
      .trim()
      .notEmpty()
      .withMessage('USER is required')
      .isString()
      .withMessage(
        'USER must be in a string format.'
      ),
    check('password').trim().notEmpty().withMessage('PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
  ],
  updatePassword: [
    check('password').trim().notEmpty().withMessage('PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
    check('new_password').trim().notEmpty().withMessage('NEW PASSWORD is required.')
      .matches('(?=.{6,})').withMessage('NEW PASSWORD must be six characters or longer.')
      .matches('(?=.*[a-z])').withMessage('NEW PASSWORD must contain at least 1 lowercase alphabetical character.')
      .matches('(?=.*[A-Z])').withMessage('NEW PASSWORD must contain at least 1 uppercase alphabetical character.')
      .matches('(?=.*[0-9])').withMessage('NEW PASSWORD must contain at least 1 numeric character.')
      .matches('(?=.*[!@#$%^&*])').withMessage('NEW PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
  ],
  forgotPassword: oneOf([
    [
      check('email')
        .trim()
        .notEmpty()
        .withMessage('EMAIL is required.')
        .isEmail()
        .withMessage('EMAIL must be in an email format.'),
      check('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required.')
        .isNumeric()
        .withMessage('OTP must be numeric.'),
      check('password').trim().notEmpty().withMessage('PASSWORD is required.')
        .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
        .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
        .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
        .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
        .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),

    ], [
      check('otp')
        .trim()
        .notEmpty()
        .withMessage('OTP is required.')
        .isNumeric()
        .withMessage('OTP must be numeric.'),
      check('phone')
        .trim()
        .notEmpty()
        .withMessage('PHONE NUMBER is required.')
        .isNumeric()
        .isLength({ min: 8, max: 15 })
        .withMessage('PHONE NUMBER must be numberic.'),
      check('password').trim().notEmpty().withMessage('PASSWORD is required.')
        .matches('(?=.{6,})').withMessage('PASSWORD must be six characters or longer.')
        .matches('(?=.*[a-z])').withMessage('PASSWORD must contain at least 1 lowercase alphabetical character.')
        .matches('(?=.*[A-Z])').withMessage('PASSWORD must contain at least 1 uppercase alphabetical character.')
        .matches('(?=.*[0-9])').withMessage('PASSWORD must contain at least 1 numeric character.')
        .matches('(?=.*[!@#$%^&*])').withMessage('PASSWORD must contain at least one of these special characters-->!@#$%^&*.'),
    ]
  ]),
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
