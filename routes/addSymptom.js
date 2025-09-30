const {Router} = require('express');
const {newSymptomForm,addNewSymptom,symptomValidation,handleValidationErrors} = require('../conrollers/poisonController');
const addSymptom = Router();
addSymptom.get('/',newSymptomForm);
addSymptom.post('/',symptomValidation,handleValidationErrors,addNewSymptom);
module.exports = addSymptom;