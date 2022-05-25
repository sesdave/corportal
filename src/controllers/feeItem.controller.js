const feeItemService = require('../services/feeItem.service');

exports.create = async (req, res, next) => {
    try {
        const response = await feeItemService.create(req.body, req.user);

        return res.status(201).json({
            error: 0,
            msg: `Fee Item created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const response = await feeItemService.updateByAFeeItemId(req.params.feeItemId, req.body);
        
        return res.status(200).json({
            error: 0,
            msg: `Fee Item updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const response = await feeItemService.getByFeeItemId(req.params.feeItemId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Fee Item details.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const response = await feeItemService.getSelectedFeeItems(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Fee Items.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}