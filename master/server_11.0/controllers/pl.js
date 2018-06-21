
const doctor = require('../schema/doctor');
const patient = require('../schema/patient');
const padmin = require('../schema/pharm_admin');
//const ladmin = require('../schema/lab_admin');

const prescribe = require('../schema/prescribe');

module.exports={

newPatient: async(req,res,next)=>{
        const newDoctor = new patient(req.body);
        const user = await newPatient.save(); 
        res.send(user);
      },

getPatient:async (req, res, next)=>{
  
  const users = await patient.find({});
  res.send(users);
  
  },

  getPatbyId: async(req, res, next) =>{
    const {patId}= req.params;
    const user = await patient.findById(patId);
    res.send(user);
  },


getPadmin: async(req,res,next)=>{
  const {patId} = req.params;
  const user = await patient.findById(patId).populate('padmins');
  res.send(user.padmins);
},

getPadminbyId: async(req, res, next) =>{
    const {pharmId}= req.params;
    const user = await padmin.findById(pharmId);
    res.send(user);
  },

newPadmin: async(req,res,next)=>{
  const {patId} = req.params;
  const newPadmin = new padmin(req.body);
  const user = await patient.findById(patId);
  newPadmin.patients = user;
  await newPadmin.save();

  //user.patients.push(newPatient);
  user.padmins=user.padmins.concat(newPadmin);
  await user.save();
  res.send(newPadmin);
},

getPrescription: async(req,res,next)=>{
  const {pharmId} = req.params;
  const user = await padmin.findById(pharmId).populate('prescriptions');
  res.send(user.prescriptions);
},

getPrescriptionbyId :  async(req, res, next) =>{
  const {presId}= req.params;
  const user = await prescribe.findById(presId);
  res.send(user);
},

newPrescription: async(req,res,next)=>{
  const {patId} = req.params;
  const {pharmId} = req.params;
  
  const newPrescription = new prescribe(req.body);

  const pat = await patient.findById(patId);
  const user = await padmin.findById(pharmId);
  
  newPrescription.patients=pat;
  newPrescription.padmins = user;
  
  await newPrescription.save();

  user.prescriptions=user.prescriptions.concat(newPrescription);
  pat.prescriptions=pat.prescriptions.concat(newPrescription);

  await user.save();
  await pat.save();

      res.send(newPrescription);        
  
},

count:(req, res)=> {
  prescribe.count((err, count) => {
    if (err) { return console.error(err); }
    res.status(200).json(count);
  });
},

     
search:(req,res)=>{
  var query = new RegExp('^'+req.body.search,'i');
       
    prescribe.find({
      "$or":[
            {healthissue:{$regex:query}},
            {medicine:{$regex:query}}
           ]},(err, data) => {
           res.json(data);
      });    
          
   }

};