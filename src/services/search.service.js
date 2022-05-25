const firmFeeService = require('./firmFee.service');
const personnelFeeService = require('./personnelFee.service');

exports.getSelectedFees = async (filter, user) => {
    let result = [];

    if (filter.userType == 'Firm') {
        result = await firmFeeService.getSelectedFirmFees(filter);
    } else if (filter.userType == 'Personnel') {
        // Validate the filter params
        // Get the data from db
        //Clean up the data for the frontend
        const param = getParamFrom(filter);
        result = await personnelFeeService.getSelectedPersonnelFees(param);
        result = result.reduce(
            (obj, feeRecord) => {
                obj[feeRecord.personnelCategory] = feeRecord.amount;
                return obj;
            },
            {}
        );
    }

    return result;
}

const getParamFrom = filter => {
    let param = {
        year: filter.year || (new Date()).getFullYear()
    };

    if (filter.userType == 'Firm') {
        return param;
    } else if (filter.userType == 'Personnel') {
        param.membershipType = 'applicant';
        param.feeItem = 'Application/Processing';

        if (filter.eb) param.engineeringBase = filter.eb;
        if (filter.hasOwnProperty('lawin')) param.liveAndWorkInNigeria = filter.lawin == true || filter.lawin == 'true';
        if (filter.hasOwnProperty('ipbm')) param.isProfessionalBodyMember = filter.ipbm == true || filter.ipbm == 'true';
    }

    return param;
}