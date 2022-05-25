const states = require('./src/config/states');
const countries = require('./src/config/countries');

const country = countries.find(a=> a.name == 'Nigeria');
const state = states[country.code];
console.log(state);