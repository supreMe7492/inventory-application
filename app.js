const express = require("express");
const path = require("node:path");
const app = express();
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("this is Supreme")
});

app.listen(3000,()=>{
    console.log("check it out on the port 3000")
})
