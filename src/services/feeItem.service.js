const feeItemRepository = require('../database/repositories/feeItem');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    const isDuplicate = await feeItemRepository.checkDuplicate(data.name, user.userId);
    if (isDuplicate) throw new CustomError('Fee Item record exists!', 400);

    const createData = { ...data, adminId: user.profileId };
    const savedRecord = await feeItemRepository.create(createData);

    return savedRecord;
}

exports.updateByAFeeItemId = async (feeItemId, data, user) => {
    const response = await feeItemRepository.updateByFeeItemId(feeItemId, data);
    if (!response) throw new CustomError('Fee Item record not found!', 404);

    return true;
}

exports.getByFeeItemId = async (feeItemId, user) => {
    const savedRecord = await feeItemRepository.getByFeeItemId(feeItemId);
    if (!savedRecord) throw new CustomError('Fee Item record not found!', 404);

    return savedRecord;
}

exports.getSelectedFeeItems = async (filter, user) => {
    const result = await feeItemRepository.getSelectedFeeItems(filter);

    return result;
}