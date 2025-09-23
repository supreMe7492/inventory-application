const pool = require('./pool');

async function allPoisions(){
  const {rows} = await pool.query(`SELECT 
                                  p.poision_id,p.name,p.toxin_type,p.lethality_level,s.symptom_id,s.symptom_name FROM poisions AS p 
                                  JOIN poision_symptoms AS ps ON p.poision_id = ps.poision_id
                                  JOIN symptoms AS s ON ps.symptom_id = s.symptom_id
                                  `);
    const organizedRows = organizeRow(rows);
    return organizedRows;
}
 function organizeRow(rows){
  const newRows = [];
  rows.forEach(row =>{
     let existing = newRows.find(r=>r.poision_id===row.poision_id);
     if(!existing){
      let newRow = {
                  poision_id: row.poision_id,
                  poisionName : row.name,
                  toxin_type: row.toxin_type,
                  lethality_level: row.lethality_level,
                  symptoms : [{symptom_id:row.symptom_id,symptom_name: row.symptom_name}]
                  };
                  newRows.push(newRow)
     }else{
           existing.symptoms.push({symptom_id:row.symptom_id,symptom_name: row.symptom_name});
     }
 })
return newRows;
 }

async function getPoisionDetail(poision_id){
  const {rows} = await pool.query(`SELECT 
                                  p.poision_id,p.name,p.toxin_type,p.lethality_level,s.symptom_id,s.symptom_name FROM poisions AS p 
                                  JOIN poision_symptoms AS ps ON p.poision_id = ps.poision_id
                                  JOIN symptoms AS s ON ps.symptom_id = s.symptom_id
                                  WHERE p.poision_id = $1`,[poision_id]);
    const organizedRows = organizeRow(rows);
    return organizedRows;
}

function updatePoisionDetail(poision_id){
  async function updatePoisionName(poision_name){
    const {rows} = await pool.query(`SELECT poisions.poision_id FROM poisions WHERE poisions.name = $1`,[poision_name]);
    if(rows.length === 0 || rows[0].poision_id == poision_id){
    await pool.query(`UPDATE poisions SET name = $1 WHERE poision_id =$2`,[poision_name,poision_id]);
    }else{
      throw new Error('already exists u bitch ass')
    }
  }

  async function updatePoisionType(toxin_type){
        await pool.query(`UPDATE poisions SET toxin_type = $1 WHERE poision_id =$2`,[toxin_type,poision_id]);

  }

  async function updateLethality(lethality_level){
            await pool.query(`UPDATE poisions SET lethality_level = $1 WHERE poision_id =$2`,[lethality_level,poision_id]);
  }

  async function updateSymptoms(symptom_ids){
   symptom_ids = normalizeSymptomId(symptom_ids);
  await pool.query(`DELETE FROM poision_symptoms WHERE poision_id = $1`, [poision_id]);
  addPoisionSymptoms(poision_id,symptom_ids);
  }  

  return {updatePoisionName,updatePoisionType,updateLethality,updateSymptoms}
}

async function allSymptoms(){
  const {rows} = await pool.query(`SELECT * FROM symptoms`);
  return rows;
}

function normalizeSymptomId(symptom_ids){
  if(!symptom_ids){
    throw new Error('at least one symptom is expected')
  }
  if(!Array.isArray(symptom_ids)){
    symptom_ids = [symptom_ids];
  }
  return symptom_ids;
}

async function addPoisionSymptoms(poision_id,symptom_ids){
  for (const symptom_id of symptom_ids) {
    await pool.query(`INSERT INTO poision_symptoms(poision_id,symptom_id) VALUES ($1,$2)`, [poision_id, symptom_id]);
  
 }
}
async function checkPoision(poision_name){
  const {rows} = await pool.query(`SELECT poisions.poision_id FROM poisions WHERE poisions.name = $1`,[poision_name]);
  if(rows.length !== 0){
    throw new Error('the poision already exists')
  }
}
async function addPoision(poision_name,toxin_type,lethality_level,symptom_ids){
  await checkPoision(poision_name);
 const {rows} = await pool.query(`INSERT INTO poisions (name,toxin_type,lethality_level) VALUES ($1,$2,$3) RETURNING poision_id`,[poision_name,toxin_type,lethality_level]);
 const poision_id = rows[0].poision_id;
 console.log(poision_id);
 symptom_ids = normalizeSymptomId(symptom_ids);
 await addPoisionSymptoms(poision_id,symptom_ids);
}
 module.exports = {allPoisions,getPoisionDetail,updatePoisionDetail, allSymptoms,addPoision}  