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

 module.exports = {allPoisions,getPoisionDetail}