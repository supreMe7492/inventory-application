require('dotenv').config();
const {Client} = require('pg');

const SQL = `
                 CREATE TABLE IF NOT EXISTS poisions (
                 poision_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                 name VARCHAR (255),
                 toxin_type VARCHAR (255),
                 lethality_level VARCHAR (255)
                 );
                
                INSERT INTO poisions (name,toxin_type,lethality_level) VALUES
                ('Nightshade','Plant','High'),
                ('Snake Venom','Animal','Deadly'),
                ('Lead Powder','Mineral','Medium');

              CREATE TABLE IF NOT EXISTS symptoms (
              symptom_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
              symptom_name VARCHAR(255)     
                );

                INSERT INTO symptoms (symptom_name) VALUES
                ('Hallucinations'),
                ('Seizures'),
                ('Coma'),
                ('Paralysis'),
                ('Breathing Difficulty'),
                ('Fatigue'),
                ('Anemia'),
                ('Stomach Cramps');

               CREATE TABLE poision_symptoms(
               poision_id INTEGER,
               symptom_id INTEGER,
               PRIMARY KEY (poision_id,symptom_id),
               FOREIGN KEY (poision_id) REFERENCES  poisions(poision_id) ON DELETE CASCADE,
               FOREIGN KEY (symptom_id) REFERENCES  symptoms(symptom_id) ON DELETE CASCADE
               );
             

               INSERT INTO poision_symptoms(poision_id,symptom_id) VALUES 
               (1,1),
               (1,2),
               (1,3),
               (2,4),
               (2,5),
               (3,6),
               (3,7),
               (3,8);
`;

async function main(){
    console.log('sending.....');
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database:process.env.DB_NAME

    });

  await client.connect();
  await client.query(SQL);
  await client.end();
  
  console.log('done....')
}
main();