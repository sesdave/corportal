const { Router } = require("express");
const aclController = require('../../controllers/acl.controller');
const isAuthorized = require('../../middlewares/isAuthorized');
const validate = require('../../middlewares/Validator/acl');

const router = Router();

router.get('/roles/:roleId', validate('checkRoleId'),isAuthorized(''), aclController.getOneRole);
router.put('/roles/:roleId', validate('checkRoleId'),validate('update'),isAuthorized(''), aclController.updateRole);
router.post('/roles', validate('create'),isAuthorized(''), aclController.createRole);
router.get('/roles', isAuthorized(''), aclController.getAllRoles);

router.get('/permissions', isAuthorized(''), aclController.getAllPermissions);
router.post('/roles/:roleId/permissions', validate('checkRoleId'),validate('checkPermissionIds'),isAuthorized(''), aclController.addPermissionsToRole);
router.delete('/roles/:roleId/permissions', validate('checkRoleId'),validate('checkPermissionIds'),isAuthorized(''), aclController.removePermissionsFromRole);

module.exports = router;