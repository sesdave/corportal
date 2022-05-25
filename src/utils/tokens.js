const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/sysConfig');

const secret=config.JWT_SECRET;
const expiresIn = config.JWT_EXPIRES_IN;

exports.makeHash = async string => await bcrypt.hash(string, 12);
exports.checkHash = async (hash, string) => await bcrypt.compare(string, hash);
exports.makeToken = (data) => jwt.sign(data, secret, { expiresIn });
exports.decodeToken = (token) => jwt.verify(token, secret);