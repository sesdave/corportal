const Paystack = require('./paystack');
const Flutterwave = require('./flutterwave');

module.exports = (payment_gateway) => {
    if( payment_gateway == 'paystack') return Paystack;
    if( payment_gateway == 'flutterwave') return Flutterwave;

    // We need amount(in naira), currency, 
}