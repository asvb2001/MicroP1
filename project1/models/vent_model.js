const mongoose=require('mongoose');

const ventSchema=mongoose.Schema({
    h_ID: {
        type:String,
        required:true
    },
    vent_ID: {
        type:String,
        required:true
    },
    status: String,
    hosp_name: {
        type:String,
        required:true
    }
});


module.exports=mongoose.model('Ventilator',ventSchema);