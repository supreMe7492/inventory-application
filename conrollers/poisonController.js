const {allPoisions,updatePoisionDetail,getPoisionDetail,allSymptoms,addPoision,deletePoision,deleteSymptom,addSymptom} = require("../db/queries");
const {body,validationResult} = require('express-validator');


function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const poisionValidation = [
     body('poisionName').notEmpty().trim().withMessage('required name of poision'),
     body('toxin_type').notEmpty().trim().withMessage('add toxin type'),
     body('lethality_level').notEmpty().withMessage('select one level of lethality')

]

const symptomValidation = [
    body('symptom_name').notEmpty().trim().withMessage('atleast write the name of symptom')
]

async function renderAllPoision(req,res){
    const poisons = await allPoisions();
    res.render('index',{poisions:poisons});
}

async function updateDetail (req,res){
    try{
    const updatePoision = updatePoisionDetail(req.params.poision_id);
    await updatePoision.updatePoisionName(req.body.poisionName);
    await updatePoision.updatePoisionType(req.body.toxin_type);
    await updatePoision.updateLethality(req.body.lethality_level);
    await updatePoision.updateSymptoms(req.body.symptom);

    res.redirect('/');
    }catch(err){
        res.send(err.message)
    }
}

async function renderEditForm(req,res){
    const poision = await getPoisionDetail(req.params.poision_id)
    const symptoms = await allSymptoms();
    res.render('editForm',{poision:poision[0],symptoms:symptoms})
}

async function addPoisionForm(req,res){
   const symptoms = await allSymptoms()
   res.render('addForm',{symptoms:symptoms});
}

async function addNewPoision(req,res){
    try{
        await addPoision(
            req.body.poisionName,
            req.body.toxin_type,
            req.body.lethality_level,
            req.body.symptom
        )

      res.redirect('/')  
    }catch(err){
       res.send(err.message)
    }
}

async function removePoision(req,res){
    await deletePoision(req.params.poision_id);
    res.redirect('/')
}

async function renderSymptoms(req,res){
    const symptoms = await allSymptoms();
    res.render('editSymptom',{symptoms:symptoms});
}

async function removeSymptom(req,res){
    await deleteSymptom(req.params.symptom_id);
    res.redirect('/edit_symptom');              
}
function newSymptomForm(req,res){
    res.render('addSymptom')
}

async function addNewSymptom(req,res){
    try{
        await addSymptom(req.body.symptom_name);
        res.redirect('/edit_symptom')
    }catch(err){
        res.send(err.message);
    }
}

module.exports = {renderAllPoision,updateDetail,renderEditForm,addPoisionForm,addNewPoision,removePoision,renderSymptoms,removeSymptom,newSymptomForm,addNewSymptom,handleValidationErrors,poisionValidation,symptomValidation}