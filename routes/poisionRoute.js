const {Router} = require('express');
const poisonDetails = Router();
const {renderAllPoision} = require('../conrollers/poisonController');

poisonDetails.get('/',renderAllPoision);

module.exports = poisonDetails