const models = require('../models');
const { Op } = require('sequelize');
const tokens = require('../../utils/tokens');


exports.checkDuplicate = async (data) => {
	const check = await models.User.findOne({
		where: {
			[Op.or]: [
				{ email: { [Op.iLike]: data.email } },
				{ phone: data.phone }
			]
		},
	});
	return !!check;
}

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.User.create({
		...cleanedData,
		password: await tokens.makeHash(data.password)
	});

	return toDomain(newRecord);
}

exports.updateByUserId = async (data) => {
	const cleanedData = toDatabase(data);
	const response = await models.User.update(cleanedData, { where: { userId: data.userId } });

	return response;
}

exports.findByUserId = async (userId) => {
	const savedRecord = await models.User.findOne({
		where: { userId },
		include: [
			models.Personnel,
			models.Firm,
			models.Admin
		]
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.findByEmailOrPhoneAndPassword = async (emailOrPhone, password) => {
	const savedRecord = await models.User.findOne({
		where: {
			[Op.or]: [
				{ email: { [Op.iLike]: emailOrPhone } },
				{ phone: emailOrPhone }
			]
		},
		include: [models.Personnel, models.Firm, models.Admin]
	});

	if (!savedRecord) return null;

	const isPasswordVerified = await tokens.checkHash(savedRecord.password, password);
	if (!isPasswordVerified) return null;

	return toDomain(savedRecord);
};

exports.getSelectedUsers = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.User.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		phone: data.phone,
		email: data.email,
		userType: data.userType,
		token: data.token,
		lastSeen: data.lastSeen,
		status: data.status
	}
}

const toDomain = data => {
	let d = {
		userId: data.userId,
		phone: data.phone,
		email: data.email,
		userType: data.userType,
		token: data.token,
		lastSeen: data.lastSeen,
		status: data.status
	}
	if (data.userType == 'Personnel' && data.Personnel) d = { ...d, ...data.Personnel.dataValues };
	if (data.userType == 'Firm' && data.Firm) d = { ...d, ...data.Firm.dataValues };
	if (data.userType == 'Admin' && data.Admin) d = { ...d, ...data.Admin.dataValues };

	return d;
}

const getQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};
	if (filter.userType) query.where.userType = filter.userType;
	if (filter.status) query.where.status = filter.status;

	return query;
}