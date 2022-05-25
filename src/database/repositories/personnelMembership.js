const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelMembership.create({
		...cleanedData,
		personnelId: data.personnelId
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelMembershipId = async (personnelMembershipId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.PersonnelMembership.update(cleanedData, { where: { personnelMembershipId } });

	return response;
}

exports.getByPersonnelMembershipId = async (personnelMembershipId) => {
	const savedRecord = await models.PersonnelMembership.findOne({ where: { personnelMembershipId } });

	return toDomain(savedRecord);
}

exports.getSelectedPersonnelMemberships = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelMembership.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		personnelId: data.personnelId,
		orgName: data.orgName,
		orgType: data.orgType,
		orgBase: data.orgBase,
		regDate: data.regDate,
		memGrade: data.memGrade,
		memNumber: data.memNumber
	}
}

const toDomain = data => {
	if (!data) return null;
	
	const d = {
		personnelMembershipId: data.personnelMembershipId,
		personnelId: data.personnelId,
		orgName: data.orgName,
		orgType: data.orgType,
		orgBase: data.orgBase,
		regDate: data.regDate,
		memGrade: data.memGrade,
		memNumber: data.memNumber
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