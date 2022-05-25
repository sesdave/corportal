const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.TreatmentLog.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByTreatmentId = async (treatmentId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.TreatmentLog.update(cleanedData, { where: { treatmentId } });

	return response;
}

exports.getLastSubmittedLog = async (applicantId, applicantType) => {
	const query = getLastSubmittedQuery(applicantId, applicantType);
	const savedRecords = await models.TreatmentLog.findOne(query);

	return savedRecords.length ? toDomain(savedRecords[0]) : null;
}

exports.getByTreatmentId = async (treatmentId) => {
	const savedRecord = await models.TreatmentLog.findOne({ where: { treatmentId } });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedTreatmentLogs = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.TreatmentLog.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		applicationStatus: data.applicationStatus,
		applicantType: data.applicantType,
		submittedAt: data.submittedAt,
		treatedAt: data.treatedAt,
		reason: data.reason,
		firmId: data.firmId,
		personnelId: data.personnelId,
		adminId: data.adminId,
	}
}

const toDomain = data => {
	const d = {
		treatmentId: data.treatmentId,
		applicationStatus: data.applicationStatus,
		applicantType: data.applicantType,
		submittedAt: data.submittedAt,
		treatedAt: data.treatedAt,
		reason: data.reason,
		firmId: data.firmId,
		personnelId: data.personnelId,
		adminId: data.adminId,
	}

	return d;
}

const getQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};
	if (filter.status) query.where.status = filter.status;

	return query;
}

const getLastSubmittedQuery = (applicantId, applicantType) => {
	let query = {
		where: {
			applicationStatus: "Awaiting Admin Action",
			applicantType: applicantType,
		},
		order: [['submittedAt', 'DESC']]
	};

	if (applicantType == 'Personnel') query.personnelId = applicantId;
	if (applicantType == 'Firm') query.firmId = applicantId;

	return query;

}