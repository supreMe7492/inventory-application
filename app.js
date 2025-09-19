const express = require("express");
const path = require("node:path");
const app = express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const poisonDetails = require('./routes/poisionRoute')
app.use('/',poisonDetails);

app.listen(3000,()=>{
    console.log("check it out on the port 3000")
})
