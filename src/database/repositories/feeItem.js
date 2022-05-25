const models = require('../models');

exports.checkDuplicate = async name => {
	const check = await models.FeeItem.findOne({
		where: {
			name: { [models.Sequelize.Op.iLike]: name }
		}
	});

	return !!check;
}

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.FeeItem.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByFeeItemId = async (feeItemId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.FeeItem.update(cleanedData, { where: { feeItemId } });

	return response;
}

exports.getByFeeItemId = async (feeItemId) => {
	const savedRecord = await models.FeeItem.findOne({
		where: { feeItemId }
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedFeeItems = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.FeeItem.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		name: data.name,
		description: data.description,
		adminId: data.adminId,
		status: data.status
	}
}

const toDomain = data => {
	const d = {
		feeItemId: data.feeItemId,
		name: data.name,
		description: data.description,
		adminId: data.adminId,
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