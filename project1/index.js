const express = require('express');
// Initialize the app
const app = express();

const mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const hospRoute=require('./routes/ventilator');

app.use('/',hospRoute);


mongoose.connect('mongodb://localhost/HV',{ useNewUrlParser: true,useUnifiedTopology: true },()=>{
     console.log("Connected to DB");
});
app.listen(8080);