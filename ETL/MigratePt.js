const fs = require("fs");
const mariadb = require('mariadb');
require('dotenv').config();
const Patient = require('./Patient');
const schema = fs.readFileSync('test/fhir.schema.json');
const fhir = require('fhir-validator');
const pool = mariadb.createPool({
	host: process.env.DB_HOST,
			user: process.env.DB_USER, 
			password: process.env.DB_PWD, 
			database:process.env.DB_DB,
	                acquireTimeout: 1000000,
                	connectionLimit: 33 });

var pt_ct = 0;

function migrate_pt(item) {
  item.ID_assigner = 'Athena';
  let pt = new Patient(item);
  var result = fhir.validate(pt.to_JSON());
  if(result.errors.length > 0) {
    throw { errors: result.errors, message: 'This is not valid ' + pt.to_JSON()};
  } else {
    console.log("The resource was valid per fhir-validator.");
    pool.getConnection()
    .then(conn => {
      conn.query("REPLACE INTO Patients_JSON (AthenaID, attr) VALUES (?, ?)", 
        [item.AthenaID, pt.to_JSON()])
      .then(res => {
        console.log("The AID is " + item.AthenaID);
	console.log("Inserted patient number: " + ++pt_ct);
        conn.release();
      })
      .catch(err => {
        //handle query error
        console.error("The query was not valid and produced error:", err);
      });
    })
    .catch(err => {
      //handle connection error
      console.error("The DB connection failed with error:", err);
      process.exit();
    });
  }
}

pool.getConnection()
.then(conn => {
  conn.query("SELECT * FROM patients WHERE AthenaID < 25000")
  .then(rows => {
    rows.forEach(migrate_pt);
    conn.release();
    //process.exit();
  })
  .catch(err => {
    //handle query error
    console.error("The query was not valid and produced error:", err);
    process.exit();
  });
})
.catch(err => {
  //handle connection error
  console.error("The DB connection failed with error:", err);
  process.exit();
});
