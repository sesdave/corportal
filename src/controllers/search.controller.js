const searchService = require('../services/search.service');

exports.getSelectedFees = async (req, res, next) => {
    try {
        const response = await searchService.getSelectedFees(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Fees.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}
