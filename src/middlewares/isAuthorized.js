const tokens = require("../utils/tokens");

module.exports = (permission = '') => async (req, res, next) => {
    const token = req.headers['authorization'].replace('Bearer ', '');

    try {
        const user = await tokens.decodeToken(token);
        if (!user) throw new Error();

        req.user = { 
            userId: user.userId, 
            profileId: user.profileId, 
            permission 
        };
        next();

    } catch (error) {
        return res.status(403).json({
            error: 1,
            msg: "User not authorized!"
        });
    }
};