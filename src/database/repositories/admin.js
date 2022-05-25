const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.Admin.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByAdminId = async (data) => {
	const cleanedData = toDatabase(data);
	const response = await models.Admin.update(cleanedData, { where: { adminId: data.adminId } });

	return response;
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.Admin.findOne({ where: { userId }, order: [['createdAt', 'desc']] });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getByAdminId = async (adminId) => {
	const savedRecord = await models.Admin.findOne({ where: { adminId } });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedPersonnels = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.Admin.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	const d = {
		userId: data.userId,
		name: data.name,
		roleId: data.roleId,
		createdBy: data.createdBy,
		status: data.status
	}
	if (data.states) d.accessStates = JSON.stringify(data.states);
	if (data.categories) d.accessCategories = JSON.stringify(data.categories);

	return d;
}

const toDomain = data => {
	const d = {
		userId: data.userId,
		adminId: data.adminId,
		roleId: data.roleId,
		createdBy: data.createdBy,
		name: data.name,
		states: JSON.parse(data.accessStates),
		accessCategories: JSON.parse(data.accessCategories),
		status: data.status
	}

	if (data.Role) {
		d.role = data.Role.name;
		d.permissions = JSON.parse(data.Role.permissions);
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