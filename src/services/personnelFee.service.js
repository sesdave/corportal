const personnelFeeRepository = require('../database/repositories/personnelFee');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    const isDuplicate = await personnelFeeRepository.checkDuplicate(data.personnelCategory, data.year);
    if (isDuplicate) throw new CustomError('Duplicate Personnel Fee record exists!', 400);

    const createData = { ...data, adminId: user.profileId };
    const savedRecord = await personnelFeeRepository.create(createData);

    return savedRecord;
}

exports.updateByPersonnelFeeId = async (personnelFee, data, user) => {
    const response = await personnelFeeRepository.updateByPersonnelFeeId(personnelFee, data);
    if (!response) throw new CustomError('Personnel Fee record not found!', 404);

    return true;
}

exports.getByPersonnelFeeId = async (personnelFee, user) => {
    const savedRecord = await personnelFeeRepository.getByPersonnelFeeId(personnelFee);
    if (!savedRecord) throw new CustomError('Personnel Fee record not found!', 404);

    return savedRecord;
}

exports.getSelectedPersonnelFees = async (filter, user) => {
    const result = await personnelFeeRepository.getSelectedPersonnelFees(filter);

    return result;
}