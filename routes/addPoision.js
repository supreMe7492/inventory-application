const {Router} = require('express');
const addPoision = Router();
const {addPoisionForm,addNewPoision,handleValidationErrors,poisionValidation} = require('../conrollers/poisonController')
addPoision.get('/',addPoisionForm);
addPoision.post('/',poisionValidation,handleValidationErrors,addNewPoision);
module.exports = addPoision;