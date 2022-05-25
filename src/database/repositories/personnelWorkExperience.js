const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelWorkExperience.create({
		...cleanedData,
		personnelId: data.personnelId
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelExpatriateId = async (personnelWorkExpId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.PersonnelWorkExperience.update(cleanedData, { where: { personnelWorkExpId } });

	return response;
}

exports.getByPersonnelExpatriateId = async (personnelWorkExpId) => {
	const savedRecord = await models.PersonnelWorkExperience.findOne({ where: { personnelWorkExpId } });

	return toDomain(savedRecord);
}

exports.getSelectedPersonnelExpatriates = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelWorkExperience.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		businessName: data.businessName,
		businessType: data.businessType,
		address: data.address,
		city: data.city,
		state: data.state,
		country: data.country,
		startDate: data.startDate,
		endDate: data.endDate,
		position: data.position,
		duties: data.duties,
		workCost: data.workCost,
		papers: data.papers
	}
}

const toDomain = data => {
	if (!data) return null;
	
	const d = {
		personnelWorkExpId: data.personnelWorkExpId,
		personnelId: data.personnelId,
		businessName: data.businessName,
		businessType: data.businessType,
		address: data.address,
		city: data.city,
		state: data.state,
		country: data.country,
		startDate: data.startDate,
		endDate: data.endDate,
		position: data.position,
		duties: data.duties,
		workCost: data.workCost,
		papers: data.papers
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