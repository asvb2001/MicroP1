const express=require('express');
const router=express.Router();
const app=express();
const vent_model=require('../models/vent_model');
const hosp_model=require('../models/hosp_model');
const middleware=require('../servers/middleware');
const server=require('../servers/server');


router.get('/ventilator_details', middleware,async(req,res)=>{
   try{
       const vents=await vent_model.find();
       console.log("Ventilator details");
       res.json(vents);
   }
   catch(err){
       res.json({message:err});
   }
});


router.get('/hospital_details',middleware,async (req,res)=>{
    try{
        const hosps=await hosp_model.find();
        console.log("Hospital details");
        res.json(hosps);
    }
    catch(err){
        res.json({message:err});
    }
 });
 
 router.post('/add_hospital',middleware,async (req,res)=>{
    const hosp=new hosp_model({
        h_ID:req.body.h_ID,
        hosp_name:req.body.hosp_name,
        location:req.body.location,
        address:req.body.address,
        contactno:req.body.contactno
    });
    try{
        console.log('Adding Hospitals');
        const savedHosp= await hosp.save();
        res.json(savedHosp);
    }
    catch(err){
        res.json({message:err});
    }
});


 router.route("/search_status").post(middleware,function(req, res) {
    var status_org=req.body.status;
    console.log('Search ventilators by status');
    vent_model.find({status:status_org}, function(err, result) {
        if (err) {
            res.send(err);
        }else {
            res.send(result);
        }
    });
});


router.route("/search_name").post(middleware,function(req, res) {
    var name=req.body.hosp_name;
    console.log('Search ventilators by hospital name');
    vent_model.find({hosp_name:name}, function(err, result) {
        if (err) {
            res.send(err);
        }else {
            res.send(result);
        }
    });
});

router.route("/search_hosp").post(middleware,function(req, res) {
    var name=req.body.hosp_name;
    console.log('Search hospitals by name');
    hosp_model.find({hosp_name:name}, function(err, result) {
        if (err) {
            res.send(err);
        }else {
            res.send(result);
        }
    });
});


router.patch('/update_ventilator',middleware,async (req,res)=>{
    try{
        var id=req.body.vent_ID;
        console.log('Updating ventilators');
        const updatedVent=await vent_model.updateOne({vent_ID:id},{status:"occupied"});
        res.json(updatedVent);
    }
    catch(err){
        res.json({message:err});
    }
});


router.post('/add_ventilator',middleware,async (req,res)=>{
    const vent=new vent_model({
        h_ID:req.body.h_ID,
        vent_ID:req.body.vent_ID,
        hosp_name:req.body.hosp_name,
        status:req.body.status
    });
    try{
        console.log('Adding Ventilators');
        const savedVent= await vent.save();
        res.json(savedVent);
    }
    catch(err){
        res.json({message:err});
    }
});


router.delete('/delete_ventilator',middleware,async (req,res)=>{
    try{
        console.log('Deleting ventilators');
        var id=req.body.vent_ID;
        const removedVent=await vent_model.deleteOne({vent_ID:id});
        res.json(removedVent);
    }
    catch(err){
        res.json({message:err});
    }
});
module.exports=router;
