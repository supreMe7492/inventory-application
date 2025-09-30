const {Router} = require('express');
const {updateDetail,renderEditForm,poisionValidation,handleValidationErrors} = require('../conrollers/poisonController')
const editRouter = Router();

editRouter.get('/:poision_id',renderEditForm);
editRouter.post('/:poision_id',poisionValidation,handleValidationErrors,updateDetail)

module.exports = editRouter;