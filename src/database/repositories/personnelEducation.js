const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelEducation.create({
		...cleanedData,
		personnelId: data.personnelId
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelEducationId = async (personnelEducationId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.PersonnelEducation.update(cleanedData, { where: { personnelEducationId } });

	return response;
}

exports.getByPersonnelEducationId = async (personnelEducationId) => {
	const savedRecord = await models.PersonnelEducation.findOne({ where: { personnelEducationId } });

	return toDomain(savedRecord);
}

exports.getSelectedPersonnelEducations = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelEducation.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		qualificationType: data.qualificationType,
		qualification: data.qualification,
		school: data.school,
		discipline: data.discipline,
		startDate: data.startDate,
		endDate: data.endDate,
		certificate: data.certificate
	}
}

const toDomain = data => {
	if (!data) return null;
	
	const d = {
		personnelEducationId: data.personnelEducationId,
		personnelId: data.personnelId,
		qualification: data.qualification,
		qualificationType: data.qualificationType,
		school: data.school,
		discipline: data.discipline,
		startDate: data.startDate,
		endDate: data.endDate,
		certificate: data.certificate
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