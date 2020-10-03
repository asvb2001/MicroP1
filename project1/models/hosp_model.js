const mongoose=require('mongoose');

const hospSchema=mongoose.Schema({
    h_ID: {
        type:String,
        required:true
    },
    hosp_name: {
        type:String,
        required:true
    },
    location:String,
    address :String,
    contactno :String
});


module.exports=mongoose.model('Hospital',hospSchema);