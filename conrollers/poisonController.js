const {allPoisions} = require("../db/queries");

async function renderAllPoision(req,res){
    const poisons = await allPoisions();
    res.render('index',{poisons:poisons});
}



module.exports = {renderAllPoision}