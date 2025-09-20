const {Router} = require('express');
const {updateDetail,renderEditForm} = require('../conrollers/poisonController')
const editRouter = Router();

editRouter.get('/:poision_id',renderEditForm);
editRouter.post('/:poision_id',updateDetail)

module.exports = editRouter;