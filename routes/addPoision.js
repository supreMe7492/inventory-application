const {Router} = require('express');
const addPoision = Router();
const {addPoisionForm,addNewPoision} = require('../conrollers/poisonController')
addPoision.get('/',addPoisionForm);
addPoision.post('/',addNewPoision);
module.exports = addPoision;