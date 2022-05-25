const models = require('../models');

exports.checkDuplicate = async title => {
	const check = await models.FirmFee.findOne({
		where: {
			title: { [models.Sequelize.Op.iLike]: title }
		}
	});

	return !!check;
}

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.FirmFee.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByFirmFeeId = async (firmFeeId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.FirmFee.update(cleanedData, { where: { firmFeeId } });

	return response;
}

exports.getByFirmFeeId = async (firmFeeId) => {
	const savedRecord = await models.FirmFee.findOne({
		where: { firmFeeId }
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedFirmFees = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.FirmFee.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		adminId: data.adminId,
		feeItemId: data.feeItemId,
		year: data.year,
		amount: data.amount,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		membershipType: data.membershipType,
		status: data.status
	}
}

const toDomain = data => {
	const d = {
		firmfeeId: data.firmfeeId,
		adminId: data.adminId,
		feeItemId: data.feeItemId,
		year: data.year,
		amount: data.amount,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		membershipType: data.membershipType,
		status: data.status
	}

	if(data.Admin) d.admin = data.Admin;

	return d;
}

const getQueryParams = filter => {
	let query = {
		where: { },
		include: []
	};

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;
	return query;
}