const models = require('../models');

exports.checkDuplicate = async (personnelCategory, year) => {
	const check = await models.PersonnelFee.findOne({
		where: {
			personnelCategory: { [models.Sequelize.Op.iLike]: personnelCategory },
			year,
		}
	});

	return !!check;
}

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelFee.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByPersonnelFeeId = async (personnelFeeId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.PersonnelFee.update(cleanedData, { where: { personnelFeeId } });

	return response;
}

exports.getByPersonnelFeeId = async (personnelFeeId) => {
	const savedRecord = await models.PersonnelFee.findOne({
		where: { personnelFeeId }
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedPersonnelFees = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelFee.findAll(query);
	
	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		adminId: data.adminId,
		feeItemId: data.feeItemId,
		year: data.year,
		amount: data.amount,
		personnelCategory: data.personnelCategory,
		engineeringBase: data.engineeringBase,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		membershipType: data.membershipType,
		status: data.status
	}
}

const toDomain = data => {
	const d = {
		personnelFeeId: data.personnelFeeId,
		adminId: data.adminId,
		feeItemId: data.feeItemId,
		year: data.year,
		amount: data.amount,
		personnelCategory: data.personnelCategory,
		engineeringBase: data.engineeringBase,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		membershipType: data.membershipType,
		status: data.status
	}

	if (data.Admin) d.admin = data.Admin;

	return d;
}

const getQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};
	if (filter.membershipType) query.where.membershipType = filter.membershipType;
	if (filter.engineeringBase) query.where.engineeringBase = filter.engineeringBase;
	if (filter.year) query.where.year = filter.year;
	if (filter.hasOwnProperty('liveAndWorkInNigeria')) query.where.liveAndWorkInNigeria = filter.liveAndWorkInNigeria;
	if (filter.hasOwnProperty('isProfessionalBodyMember')) query.where.isProfessionalBodyMember = filter.isProfessionalBodyMember;

	if (filter.feeItem) query.include.push({
		model: models.FeeItem,
		where: {
			name: { [models.Sequelize.Op.iLike]: filter.feeItem },
		}
	});

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;

	return query;
}