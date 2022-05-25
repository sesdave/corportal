const aclService = require('../services/acl.service');

exports.createRole = async (req, res, next) => {
    try {
        const response = await aclService.create(req.body, req.user);

        return res.status(201).json({
            error: 0,
            msg: `Role created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.updateRole = async (req, res, next) => {
    try {
        const response = await aclService.updateByRoleId(req.params.roleId, req.body);

        return res.status(200).json({
            error: 0,
            msg: `Role updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOneRole = async (req, res, next) => {
    try {
        const response = await aclService.getByRoleId(req.params.roleId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Role details.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAllRoles = async (req, res, next) => {
    try {
        const response = await aclService.getSelectedRoles(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Roles.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAllPermissions = async (req, res, next) => {
    try {
        const response = await aclService.getSelectedPermissions(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Permissions.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.addPermissionsToRole = async (req, res, next) => {
    try {
        const response = await aclService.addPermissionsToARole(req.params.roleId, req.body.permissionIds);

        return res.status(200).json({
            error: 0,
            msg: 'Add Permissions request completed.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.removePermissionsFromRole = async (req, res, next) => {
    try {
        const response = await aclService.removePermissionsFromARole(req.params.roleId, req.body.permissionIds);

        return res.status(200).json({
            error: 0,
            msg: 'Remove Permissions request completed.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}