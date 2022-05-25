module.exports = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) throw new Error();

        const tokenArray = req.headers['authorization'].split(' ');
        if (tokenArray[0] !== 'Bearer') throw new Error();

        const token = tokenArray[1];
        if (!token) throw new Error();

        next();
    } catch (error) {
        return res.status(401).json({
            error: 1,
            msg: "User not authenticated!"
        });
    }
};