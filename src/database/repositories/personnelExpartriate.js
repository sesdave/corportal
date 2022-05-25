const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelExpatriate.create({
		...cleanedData,
		personnelId: data.personnelId
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelExpatriateId = async (personnelExpatriateId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.PersonnelExpatriate.update(cleanedData, { where: { personnelExpatriateId } });

	return response;
}

exports.getByPersonnelExpatriateId = async (personnelExpatriateId) => {
	const savedRecord = await models.PersonnelExpatriate.findOne({ where: { personnelExpatriateId } });

	return toDomain(savedRecord);
}

exports.getSelectedPersonnelExpatriates = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelExpatriate.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		passportNumber: data.passportNumber,
		passportIssuePlace: data.passportIssuePlace,
		passportIssueDate: data.passportIssueDate,
		resPermNumber: data.resPermNumber,
		resPermDuration: data.resPermDuration,
		resPermIssuePlace: data.resPermIssuePlace,
		resPermIssueDate: data.resPermIssueDate,
		address: data.address,
		location: data.location
	}
}

const toDomain = data => {
	if (!data) return null;
	
	const d = {
		personnelExpatriateId: data.personnelExpatriateId,
		personnelId: data.personnelId,
		passportNumber: data.passportNumber,
		passportIssuePlace: data.passportIssuePlace,
		passportIssueDate: data.passportIssueDate,
		resPermNumber: data.resPermNumber,
		resPermDuration: data.resPermDuration,
		resPermIssuePlace: data.resPermIssuePlace,
		resPermIssueDate: data.resPermIssueDate,
		address: data.address,
		location: data.location
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