const CustomError = require('../utils/customError');
const userRepository = require('../database/repositories/user');
const tokens = require('../utils/tokens');

exports.register = async (data, user) => {
    const isDuplicate = await userRepository.checkDuplicate(data);
    if (isDuplicate) throw new CustomError('User record exists: Email or Phone number is already used', 422);

    const newUser = await userRepository.create(data);
    const savedUserTypeRecord = await createByUserType({ ...data, userId: newUser.userId });

    return {
        email: newUser.email,
        phone: newUser.phone,
        userType: newUser.userType,
        ...savedUserTypeRecord
    };
}

exports.login = async (data) => {
    const savedUser = await userRepository.findByEmailOrPhoneAndPassword(data.user, data.password);
    if (!savedUser) throw new CustomError('Incorrect login details!', 400);
    
    const tokenData = getTokenData(savedUser);
    const token = tokens.makeToken(tokenData);
    return {
        token: token,
        refreshToken: token,
        user: savedUser
    };
}

const createByUserType = async data => {
    let savedUser = {};
    if (data.userType == 'Firm') {
        savedUser = await require('../services/firm.service').create(data);
    } else if (data.userType == 'Personnel') {
        savedUser = await require('../services/personnel.service').create(data);
    } else if (data.userType == 'Admin') {
        savedUser = await require('../services/admin.service').create(data);
    }

    return savedUser;
}

const getTokenData = user => {
    const d = { userId: user.userId };
    if (user.userType == 'Firm') {
        d.profileId = user.firmId;
    } else if (user.userType == 'Personnel') {
        d.profileId = user.personnelId;
    } else if (user.userType == 'Admin') {
        d.profileId = user.adminId;
    }

    return d;
};