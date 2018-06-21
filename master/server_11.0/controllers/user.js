
const doctor = require('../schema/doctor');
const patient = require('../schema/patient');
const prescribe = require('../schema/prescribe');

module.exports={

 
getDoctor:async (req, res, next)=>{
  
  const users = await doctor.find({});
  res.send(users);
  
  },

getDoctorbyId: async(req, res, next) =>{
  const {userId}= req.params;
  const user = await doctor.findById(userId);
  res.send(user);
},

newDoctor: async(req,res,next)=>{
  const newDoctor = new doctor(req.body);
  const user = await newDoctor.save(); 
  res.send(user);
},


getPatient: async(req,res,next)=>{
  const {userId} = req.params;
  const user = await doctor.findById(userId).populate('Patients');
  res.send(user.patients);
},

getPatbyId: async(req, res, next) =>{
  const {patId}= req.params;
  const user = await patient.findById(patId);
  res.send(user);
},

newPatient: async(req,res,next)=>{
  const {userId} = req.params;
  const newPatient = new patient(req.body);
  const user = await doctor.findById(userId);
  newPatient.doctor = user;
  await newPatient.save();

  //user.patient.push(newPatient);
  user.patient=user.patient.concat(newPatient);
  await user.save();
  res.send(newPatient);
},

getPrescription: async(req,res,next)=>{
  const {patId} = req.params;
  const user = await patient.findById(patId).populate('prescriptions');
  res.send(user.prescriptions);
},

getPrescriptionbyId :  async(req, res, next) =>{
  const {presId}= req.params;
  const user = await prescribe.findById(presId);
  res.send(user);
},

newPrescription: async(req,res,next)=>{
  const {patId} = req.params;
  const {userId} = req.params;
  const newPrescription = new prescribe(req.body);
  const user = await patient.findById(patId);
  const doc = await doctor.findById(userId);
  newPrescription.patients = user;
  newPrescription.doctors=doc;
  await newPrescription.save();

  //user.profiles.push(newProfile);
  user.prescriptions=user.prescriptions.concat(newPrescription);
  doc.prescriptions=doc.prescriptions.concat(newPrescription);

  await user.save();
  await doc.save();

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