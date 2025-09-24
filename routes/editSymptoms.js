const {Router} = require('express');
const {renderSymptoms,removeSymptom} = require('../conrollers/poisonController');

const editSymtpoms = Router();

editSymtpoms.get('/',renderSymptoms);
editSymtpoms.post('/delete_symptom/:symptom_id',removeSymptom)
module.exports = editSymtpoms;