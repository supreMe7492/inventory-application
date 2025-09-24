const {Router} = require('express');
const poisonDetails = Router();
const {renderAllPoision,removePoision} = require('../conrollers/poisonController');

poisonDetails.get('/',renderAllPoision);
poisonDetails.post('/delete/:poision_id',removePoision);
module.exports = poisonDetails