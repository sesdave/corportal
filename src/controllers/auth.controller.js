const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const response = await authService.register(req.body);

        return res.status(201).json({
            error: 0,
            msg: `User created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const response = await authService.login(req.body);
        return res.status(200).json({
            error: 0,
            msg: `User signed in successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getRegData = (req, res, next) => {
    const constants = require('../config/constants');
    const { user } = req.query;
    const applicantData = {
        personnel: {
            userType: 'Personnel',
            personnelCategory: constants.personnelCategory,
            engineeringBase: constants.engineeringBase,
            practiceState: constants.states
        },
        firm: {
            userType: 'Firm',
            firmCategory: constants.firmCategory,
            consultingRegType: constants.rcRegType,
            firmType: constants.firmType,
            firmSize: constants.firmSize,

        }
    }

    if (applicantData[user]) {
        return res.status(201).json({
            error: 0,
            msg: `Applicant registration data.`,
            data: applicantData[user]
        })
    } else {
        return res.status(422).json({
            error: 1,
            msg: user ? `"user" is required.` : '"user" must be in: "Personnel", "Firm".'
        })
    }
}