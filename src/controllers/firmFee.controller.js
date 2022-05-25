const firmFeeService = require('../services/firmFee.service');

exports.create = async (req, res, next) => {
    try {
        const response = await firmFeeService.create(req.body, req.user);

        return res.status(201).json({
            error: 0,
            msg: `Firm Fee created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const response = await firmFeeService.updateByFirmFeeId(req.params.firmFeeId, req.body);
        
        return res.status(200).json({
            error: 0,
            msg: `Firm Fee updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const response = await firmFeeService.getByFirmFeeId(req.params.firmFeeId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Firm Fee details.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const response = await firmFeeService.getSelectedFirmFees(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Firm Fees.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}