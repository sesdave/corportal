const firmFeeRepository = require('../database/repositories/firmFee');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    // const isDuplicate = await firmFeeRepository.checkDuplicate(data.name, user.userId);
    // if (isDuplicate) throw new CustomError('Fee Item record exists!', 400);

    const createData = { ...data, adminId: user.profileId };
    const savedRecord = await firmFeeRepository.create(createData);

    return savedRecord;
}

exports.updateByFirmFeeId = async (firmFeeId, data, user) => {
    const response = await firmFeeRepository.updateByFirmFeeId(firmFeeId, data);
    if (!response) throw new CustomError('Firm Fee record not found!', 404);

    return true;
}

exports.getByFirmFeeId = async (firmFeeId, user) => {
    const savedRecord = await firmFeeRepository.getByFirmFeeId(firmFeeId);
    if (!savedRecord) throw new CustomError('Firm Fee record not found!', 404);

    return savedRecord;
}

exports.getSelectedFirmFees = async (filter, user) => {
    const result = await firmFeeRepository.getSelectedFirmFees(filter);

    return result;
}