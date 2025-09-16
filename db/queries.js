const pool = require('./pool');

async function allPoisions(){
  const {rows} = await pool.query(`SELECT 
                                  p.id,p.name,p.toxin_type,p.lethality_level,s.symptom_name FROM poisions AS p 
                                  JOIN poision_symptoms AS ps ON p.id = ps.poision_id
                                  JOIN symptoms AS s ON ps.symptom_id = s.id
                                  `);
    const organizedRows = organizeRow(rows);
    return organizedRows;
}

 function organizeRow(rows){
  const newRows = [];
  rows.forEach(row =>{
     let existing = newRows.find(r=>r.id===row.id);
     if(!existing){
      let newRow = {
                  id: row.id,
                  poisionName : row.name,
                  toxin_type: row.toxin_type,
                  lethality_level: row.lethality_level,
                  symptoms : [row.symptom_name]
                  };
                  newRows.push(newRow)
     }else{
           existing.symptoms.push(row.symptom_name);
     }
 })
return newRows;
 }

 module.exports = {allPoisions}