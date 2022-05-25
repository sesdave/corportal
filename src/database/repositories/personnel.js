const models = require('../models');
const { Op } = require('sequelize');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.Personnel.create({
		...cleanedData,
		registrationDate: Date.now(),
		userId: data.userId,
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelId = async (personnelId, data) => {
	const cleanedData = toDatabase(data);
	const response = await models.Personnel.update(cleanedData, { where: { personnelId } });

	return response;
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.Personnel.findOne({ where: { userId }, order: [['createdAt', 'desc']] });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getByPersonnelId = async (personnelId) => {
	const savedRecord = await models.Personnel.findOne({ where: { personnelId } });

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedPersonnels = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.Personnel.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
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
}

const toDomain = data => {
	const d = {
		userId: data.userId,
		personnelId: data.personnelId,
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