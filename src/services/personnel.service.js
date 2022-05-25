const personnelRepository = require('../database/repositories/personnel');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    console.log({data});
    const createData = preparePersonnelData(data, user);
    const savedRecord = await personnelRepository.create(createData);

    return savedRecord;
}

exports.updateByPersonnelId = async (personnelId, data, user) => {
    const updateData = preparePersonnelData(data, user);
    const response = await personnelRepository.updateByPersonnelId(personnelId, updateData);
    if (!response) throw new CustomError('Personnel record not found!', 404);

    if (data.applicationStatus) await logTreatmentData({ ...data, personnelId }, user);

    return true;
}

exports.getByPersonnelId = async (personnelId, user) => {
    const savedRecord = await personnelRepository.getByPersonnelId(personnelId);
    if (!savedRecord) throw new CustomError('Personnel record not found!', 404);

    return savedRecord;
}

exports.getSelectedPersonnels = async (filter, user) => {
    const query = getQueryParams(filter);
    const result = await personnelRepository.getSelectedPersonnels(query);

    return result;
}

const getQueryParams = filter => {
    return filter;
}

const logTreatmentData = async (data, user) => {
    const treatmentLogRepository = require('../database/repositories/treatmentLog');
    const isAdminRequest = user.permission && user.permission != '';
    let adminId = null,
        applicantType = 'Personnel',
        submittedAt = Date.now(),
        treatedAt = null,
        reason = '* Submitted By Applicant *';

    if (isAdminRequest) {
        const lastApplicantLog = await treatmentLogRepository.getLastSubmittedLog(data.personnelId, applicantType);

        adminId = user.profileId;
        submittedAt = lastApplicantLog.submittedAt;
        treatedAt = Date.now();
        reason = data.reason || null;
    }

    const logPayload = {
        applicationStatus: data.applicationStatus,
        personnelId: data.personnelId,
        applicantType,
        reason,
        submittedAt,
        treatedAt,
        adminId
    }
    await treatmentLogRepository.create(logPayload);
}

const preparePersonnelData = (data) => {
    const d = {
        userId: data.userId,
		profileImage: data.profileImage,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		personnelCategory: data.personnelCategory,
		engineeringBase: data.engineeringBase,
		engineeringField: data.engineeringField,
		isCorenMember: data.isCorenMember,
		applicationStatus: data.applicationStatus,
		email: data.email,
		phone: data.phone,
		alt_phone: data.alt_phone,
		address: data.address,
		contactCity: data.contactCity,
		contactState: data.contactState,
		contactCountry: data.contactCountry,
		practiceCity: data.practiceCity,
		practiceState: data.practiceState,
		practiceCountry: data.practiceCountry,
		sex: data.sex,
		dob: data.dob,
		originLGA: data.originLGA,
		originState: data.originState,
		originCountry: data.originCountry,
		about: data.about,

		proposer1: data.proposer1,
		proposer2: data.proposer2,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember
    }

    // This is set according to the workflow of the Registration
    if (data.hasOwnProperty('liveAndWorkInNigeria')) {
        if (data.liveAndWorkInNigeria == false || data.liveAndWorkInNigeria == "false") {
            d.isProfessionalBodyMember = false;
            d.professionalBody = null;
            d.professionalMembershipNumber = null;
        } else if (data.liveAndWorkInNigeria == true || data.liveAndWorkInNigeria == "true") {
            if (data.isProfessionalBodyMember == false || data.isProfessionalBodyMember == "false") {
                d.isProfessionalBodyMember = false;
                d.professionalBody = null;
                d.professionalMembershipNumber = null;
            } else if (data.isProfessionalBodyMember == false || data.isProfessionalBodyMember == "false") {
                d.isProfessionalBodyMember = true;
                d.professionalBody = data.professionalBody;
                d.professionalMembershipNumber = data.professionalMembershipNumber;
            }
        }
    }

    return d;
}