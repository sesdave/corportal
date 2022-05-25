const personnelFeeService = require('../services/personnelFee.service');

exports.create = async (req, res, next) => {
    try {
        const response = await personnelFeeService.create(req.body, req.user);

        return res.status(201).json({
            error: 0,
            msg: `Personnel Fee created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const response = await personnelFeeService.updateByPersonnelFeeId(req.params.personnelFeeId, req.body);
        
        return res.status(200).json({
            error: 0,
            msg: `Personnel Fee updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const response = await personnelFeeService.getByPersonnelFeeId(req.params.personnelFeeId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Personnel Fee details.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const response = await personnelFeeService.getSelectedPersonnelFees(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected Personnel Fees.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}