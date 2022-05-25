const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.FirmApplication.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByFirmAppId = async (firmAppId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.FirmApplication.update(cleanedData, { where: { firmAppId } });

	return response;
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.FirmApplication.findOne({ where: { userId }, order: [['createdAt', 'desc']] });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getByFirmAppId = async (firmId) => {
	const savedRecord = await models.FirmApplication.findOne({ where: { firmAppId } });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedFirmApplications = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.FirmApplication.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		userId: data.userId,
		firmName: data.firmName,
		firmType: data.firmType,
		yearOfIncorporation: data.yearOfIncorporation,
		rcNumber: data.rcNumber,
		rcRegType: data.rcRegType,
		practiceState: data.practiceState,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		consultingRegType: data.consultingRegType,
		cacDoc: data.cacDoc,
		applicationStatus: data.applicationStatus,
	}
}

const toDomain = data => {
	const d = {
		userId: data.userId,
		firmAppId: data.firmAppId,
		firmName: data.firmName,
		firmType: data.firmType,
		yearOfIncorporation: data.yearOfIncorporation,
		rcNumber: data.rcNumber,
		rcRegType: data.rcRegType,
		practiceState: data.practiceState,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		consultingRegType: data.consultingRegType,
		cacDoc: data.cacDoc,
		applicationStatus: data.applicationStatus,
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