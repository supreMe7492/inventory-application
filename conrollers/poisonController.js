const {allPoisions,updatePoisionDetail,getPoisionDetail,allSymptoms,addPoision,deletePoision} = require("../db/queries");

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

module.exports = {renderAllPoision,updateDetail,renderEditForm,addPoisionForm,addNewPoision,removePoision}