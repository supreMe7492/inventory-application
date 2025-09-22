const {allPoisions,updatePoisionDetail,getPoisionDetail,allSymptoms} = require("../db/queries");

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
    await updatePoision.updateSymptoms(req.params.poision_id,req.body.symptom);

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
module.exports = {renderAllPoision,updateDetail,renderEditForm}