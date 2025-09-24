const {Router} = require('express');
const {newSymptomForm,addNewSymptom} = require('../conrollers/poisonController');
const addSymptom = Router();
addSymptom.get('/',newSymptomForm);
addSymptom.post('/',addNewSymptom);
module.exports = addSymptom;