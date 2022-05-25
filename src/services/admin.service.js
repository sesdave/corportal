const adminRepository = require('../database/repositories/admin');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    const savedRecord = await adminRepository.create({ 
        ...data, 
        createdBy: user.profileId || null // defaults to null for Super Admin
    });

    return savedRecord;
}

exports.updateByAdminId = async (adminId, data) => {
    const response = await adminRepository.updateByAdminId(adminId, data);
    if (!response) throw new CustomError('Admin record not found!', 404);

    return true;
}

exports.getByAdminId = async (adminId, user) => {
    const savedRecord = await adminRepository.getByAdminId(adminId);
    if (!savedRecord) throw new CustomError('Admin record not found!', 404);

    return savedRecord;
}

exports.getSelectedAdmins = async (filter, user) => {
    const query = getQueryParams(filter);
    const result = await adminRepository.getByAdminId(query);

    return result;
}

const getQueryParams = filter => {
    return filter;
}