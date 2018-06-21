const User = require('../schema/doctor');
const Patient = require('../schema/patient');
const Doctor = require('../schema/doctor');
const Prescription = require('../schema/prescribe');

module.exports = {
  
  getAll:(req, res)=> {
      User.find({}, (err, docs) => {
        if (err) { return console.error(err); }
        res.status(200).json(docs);
      });
  },
  count:(req, res)=> {
      User.count((err, count) => {
        if (err) { return console.error(err); }
        res.status(200).json(count);
      });
  },
  insert:(req, res) => {
      const obj = new User(req.body);
      obj.save((err, item) => {
        if (err && err.code === 11000) {res.sendStatus(400)}
        if (err) {return console.error(err);}
        res.status(200).json(item);
      });
  },
  get:(req, res) => {
      User.findOne({ _id: req.params.id }, (err, item) => {
        if (err) { return console.error(err); }
        res.status(200).json(item);
      });
  },
  update:(req, res) => {
      User.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
  },
  remove:(req, res) => {
      User.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) { return console.error(err); }
        res.sendStatus(200);
      });
  },

  search:(req,res)=>{
      
      var query = new RegExp('^'+req.body.search,'i');

      User.find({
          "$or":[
                  {name:{$regex:query}},
                  {phone:{$regex:query}}
              ]},(err, data) => {
                  res.json(data);
      });    
   
  },

  newpatient:async(req,res,next)=>{
    const {id} = req.params;
    const newPatient = new Patient(req.body);
    const admin = await User.findById(id);
    newPatient.doctor= admin;
    await newPatient.save();
    admin.patient.push(newPatient);
    await admin.save()
    res.send(newPatient);
  },

  
  getpatient:(req, res) => {

    Patient.find({ doctor: req.params.id }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  },

  putPatient: async(req, res, next) => {
    const {docId} = req.params;
    const {patId} = req.params;
    const newPat = await Patient.findByIdAndUpdate(patId,req.body)
    const admin = await Doctor.findOneAndUpdate({"_id":docId,"patient._id":patId},{"patient.$":req.body})
    res.json(200);
  },

    removePatient:async(req, res,next) => {
    const {docId} = req.params;
    const {patId} = req.params;
    const newPat = await Patient.findByIdAndRemove(patId)
    const admin = await Doctor.findByIdAndUpdate(docId,{$pull:{"patient":{"_id":patId}}})
    res.send(200);
  },

  putPres: async(req, res, next) => {
    const {userId} = req.params;
    const {patId} = req.params;
    const {presId} = req.params;
    const newPres = await Prescription.findByIdAndUpdate(presId,req.body)

    const admin1 = await Doctor.findOneAndUpdate({"_id":userId,"prescription._id":presId},{"prescription.$":req.body})

    const admin = await Patient.findOneAndUpdate({"_id":patId,"prescription._id":presId},{"prescription.$":req.body})

    res.json(200);
  },

    removePres:async(req, res,next) => {
    const {userId} = req.params;
    const {patId} = req.params;
    const {presId} = req.params;
    const newPres = await Prescription.findByIdAndRemove(presId)
    const admin = await Doctor.findByIdAndUpdate(userId,{$pull:{"prescription":{"_id":presId}}})
    const admin1 = await Patient.findByIdAndUpdate(patId,{$pull:{"prescription":{"_id":presId}}})
    res.send(200);
  },

  getprespatient:(req, res) => {

    Patient.find({ prescription: req.params.presId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  },
  
  getpatId:(req, res) => {
    const {patId} = req.params;
    Patient.findById(patId, (err, result) => {
      if (err) { return console.error(err); }
      res.status(200).json(result);
    });
  },
  newprescription:async(req,res,next)=>{
    const {userId} = req.params;
    const {patId} = req.params;
    const newpres = new Prescription(req.body);
    const admin = await User.findById(userId);
    const admin1 = await Patient.findById(patId);
    newpres.doctor = admin
    newpres.patient = admin1
    await newpres.save();
    admin.prescription.push(newpres)
    await admin.save();
    admin1.prescription.push(newpres)
    await admin1.save();
    res.send(newpres);
  },
  getpresId:(req, res) => {
    const {presId} = req.params;
    Prescription.findById(presId, (err, result) => {
      if (err) { return console.error(err); }
      res.status(200).json(result);
    });
  },
  // getpres:(req, res) => {
  //   Prescription.find({$and:[{ doctor: req.params.id },{patient: req.params.patId }]}, (err, item) => {
  //     if (err) { return console.error(err); }
  //     res.status(200).json(item);
  //   });
  // },
 
  getpres:(req, res) => {

    Prescription.find({ doctor: req.params.userId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  },
  getpresc:(req, res) => {

    Prescription.find({ patient: req.params.patId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  }

}