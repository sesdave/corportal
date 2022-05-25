const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelApplication.create(cleanedData);
	
	return toDomain(newRecord);
}

exports.updateByPersonnelAppId = async (personnelAppId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.PersonnelApplication.update(cleanedData, { where: { personnelAppId } });

	return response;
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.PersonnelApplication.findOne({ where: { userId }, order: [['createdAt', 'desc']] });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getByPersonnelAppId = async (personnelAppId) => {
	const savedRecord = await models.PersonnelApplication.findOne({ where: { personnelAppId } });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedPersonnelApplications = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelApplication.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		userId: data.userId,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		proposer1: data.proposer1,
		proposer2: data.proposer2,
		practiceState: data.practiceState,
		personnelCategory: data.personnelCategory,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		professionalBody: data.professionalBody,
		professionalMembershipNumber: data.professionalMembershipNumber,
		engineeringBase: data.engineeringBase,
		applicationStatus: data.applicationStatus
	}
}

const toDomain = data => {
	const d = {
		userId: data.userId,
		personnelAppId: data.personnelAppId,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		proposer1: data.proposer1,
		proposer2: data.proposer2,
		practiceState: data.practiceState,
		personnelCategory: data.personnelCategory,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		professionalBody: data.professionalBody,
		professionalMembershipNumber: data.professionalMembershipNumber,
		engineeringBase: data.engineeringBase,
		applicationStatus: data.applicationStatus
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