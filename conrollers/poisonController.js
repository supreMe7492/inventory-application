const {allPoisions,updatePoisionDetail,getPoisionDetail} = require("../db/queries");

async function renderAllPoision(req,res){
    const poisons = await allPoisions();
    res.render('index',{poisions:poisons});
}

async function updateDetail (req,res){
    try{
    const updatePoision = updatePoisionDetail(req.params.poision_id);
    await updatePoision.updatePoisionName(req.body.poisionName);
    await updatePoision.updatePoisionType(req.body.toxin_type);
    await updatePoision.updateLethality(req.body.lethality_level)
    res.redirect('/');
    }catch(err){
        res.send(err.message)
    }
}

async function renderEditForm(req,res){
    const poision = await getPoisionDetail(req.params.poision_id)

    res.render('editForm',{poision:poision[0]})
}
module.exports = {renderAllPoision,updateDetail,renderEditForm}