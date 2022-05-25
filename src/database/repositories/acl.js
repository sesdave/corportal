const models = require('../models');

exports.checkDuplicate = async name => {
	const check = await models.Role.findOne({
		where: {
			name: { [models.Sequelize.Op.iLike]: name }
		}
	});

	return !!check;
}

exports.createRole = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.Role.create({
		...cleanedData,
		createdBy: data.createdBy,
	});

	return toDomain(newRecord);
}

exports.createPermission = async data => {
	const newRecord = await models.Permission.create(data);

	return permissionToDomain(newRecord);
}

exports.updateByRoleId = async (roleId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.Role.update(cleanedData, { where: { roleId } });

	return response;
}

exports.getByRoleId = async (roleId) => {
	const savedRecord = await models.Role.findOne({
		where: { roleId }
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.addPermissionsToARole = async (roleId, permissions = []) => {
	const savedRole = await models.Role.findByPk(roleId);
	if (!savedRole) return null;

	const result = await Promise.all(permissions.map(
		async p => new Promise(async (resolve, reject) => {
			const savedPermission = await models.Permission.findByPk(p);
			if (!savedPermission) return resolve({
				error: 1,
				msg: `result for ${p}: Permission not found.`
			});

			const response = await savedRole.addPermission(savedPermission);
			if (!response) return resolve({
				error: 1,
				msg: `result for ${p}: Permission association exists.`
			});

			return resolve({
				error: 0,
				msg: `result for ${p}: Permission added successfully.`
			});
		})
	))
	return result;
}

exports.removePermissionsFromARole = async (roleId, permissions = []) => {
	const savedRole = await models.Role.findByPk(roleId);
	if (!savedRole) return null;

	const result = await Promise.all(permissions.map(
		async p => new Promise(async (resolve, reject) => {
			const savedPermission = await models.Permission.findByPk(p);
			if (!savedPermission) return resolve({
				error: 1,
				msg: `result for ${p}: Permission not found.`
			});

			const response = await savedRole.removePermission(savedPermission);
			if (!response) return resolve({
				error: 1,
				msg: `result for ${p}: Permission association does not exist.`
			});

			return resolve({
				error: 0,
				msg: `result for ${p}: Permission removed successfully.`
			});
		})
	))

	return result;
}

exports.getSelectedRoles = async (filter = {}) => {
	const query = getRoleQueryParams(filter);
	const allRecords = await models.Role.findAll(query);

	return allRecords.map(toDomain);
}

exports.getSelectedPermissions = async (filter = {}) => {
	const query = getPermissionQueryParams(filter);
	const allRecords = await models.Permission.findAll(query);

	return allRecords.map(permissionToDomain);
}

const toDataBase = data => {
	return {
		name: data.name,
		status: data.status
	}
}

const toDomain = data => {
	const d = {
		roleId: data.roleId,
		name: data.name,
		createdBy: data.createdBy,
		status: data.status
	}

	return d;
}

const permissionToDomain = data => {
	const d = {
		permissionId: data.permissionId,
		name: data.name,
	}

	return d;
}

const getRoleQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;
	return query;
}

const getPermissionQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;
	return query;
}