const firmApplicationRepository = require('../database/repositories/firmApplication');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    const createData = prepareFirmData(data, user);
    const savedRecord = await firmApplicationRepository.create(createData);

    return savedRecord;
}

exports.updateByFirmAppId = async (firmAppId, data, user) => {
    const updateData = prepareFirmData(data, user);
    const response = await firmApplicationRepository.updateByFirmAppId(firmAppId, updateData);
    if (!response) throw new CustomError('Firm Application record not found!', 404);

    if (data.applicationStatus) await logTreatmentData({ ...data, firmId }, user);

    return true;
}

exports.getByFirmAppId = async (firmAppId, user) => {
    const savedRecord = await firmApplicationRepository.getByFirmAppId(firmAppId);
    if (!savedRecord) throw new CustomError('Firm Application record not found!', 404);

    return savedRecord;
}

exports.getSelectedFirmApplications = async (filter, user) => {
    const query = getQueryParams(filter);
    const result = await firmApplicationRepository.getSelectedFirmApplications(query);

    return result;
}

const getQueryParams = filter => {
    return filter;
}

const logTreatmentData = async (data, user) => {
    const treatmentLogRepository = require('../database/repositories/treatmentLog');
    const isAdminRequest = user.permission && user.permission != '';
    let adminId = null,
        applicantType = 'Firm',
        submittedAt = Date.now(),
        treatedAt = null,
        reason = '* Submitted By Applicant *';

    if (isAdminRequest) {
        const lastApplicantLog = await treatmentLogRepository.getLastSubmittedLog(data.firmAppId, applicantType);

        adminId = user.profileId;
        submittedAt = lastApplicantLog.submittedAt;
        treatedAt = Date.now();
        reason = data.reason || null;
    }

    const logPayload = {
        applicationStatus: data.applicationStatus,
        firmAppId: data.firmAppId,
        applicantType,
        reason,
        submittedAt,
        treatedAt,
        adminId
    }
    await treatmentLogRepository.create(logPayload);
}

const prepareFirmData = (data) => {
    const d = {
        userId: data.userId,
        firmId: data.firmId,
        firmName: data.firmName,
        yearOfIncorporation: data.yearOfIncorporation,
        rcRegType: data.rcRegType,
        rcNumber: data.rcNumber,
        practiceState: data.practiceState,
        applicationStatus: data.applicationStatus,
    }

    // This is set according to the workflow of the Registration
    if (data.hasOwnProperty(firmType)) {
        if (data.firmType == "Engineering") {

            d.consultingRegType = null;
            d.firmCategory = data.firmCategory;
            d.firmSize = data.firmSize;

        } else if (data.firmType == "Consulting") {

            d.consultingRegType = data.consultingRegType;
            d.firmCategory = null;
            d.firmSize = null;
            
        }
    }

    return d;
}