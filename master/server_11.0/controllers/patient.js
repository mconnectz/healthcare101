const User = require('../schema/patient');
const Profile = require('../schema/pat_profile');
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
  countProf:(req, res)=> {
    Profile.count((err, count) => {
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
  // search:(req,res)=>{
      
  //     var query = new RegExp('^'+req.body.search,'i');

  //     User.find({
  //         "$or":[
  //                 {name:{$regex:query}},
  //                 {phone:{$regex:query}}
  //             ]},(err, data) => {
  //                 res.json(data);
  //     });    
   
  // },
  search:(req,res)=>{
      
    var query = new RegExp('^'+req.body.search,'i');

    Profile.find({
        "$or":[
                {firstname:{$regex:query}},
                {lastname:{$regex:query}}
            ]},(err, data) => {
                res.json(data);
    });    
 
},

  getUserProfiles: async(req,res,next)=>{
    const {userId} = req.params;
    const user = await User.findById(userId).populate('profiles');
    res.send(user.profiles);
  },
  
  newUserProfile: async(req,res,next)=>{
    const {userId} = req.params;
    const newProfile = new Profile(req.body);
    const user = await User.findById(userId);
    newProfile.patient = user;
    await newProfile.save();
    user.profiles=user.profiles.concat(newProfile);
    //user.prescription_form.push(newProfile);
    await user.save();
    res.send(newProfile);
  },

  getProfilebyId: async(req, res, next) =>{
    const {profId}= req.params;
    const user = await Profile.findById(profId);
    res.send(user);
   },

   putProfilebyId: async(req, res, next) =>{
      const {profId} = req.params;
      const prof = await Profile.findByIdAndUpdate(profId,req.body);
      await prof.save();
      res.send(prof);
   },

   deleteProfilebyId: async(req, res, next) =>{
    const {profId} = req.params;
    const prof = await Profile.findByIdAndRemove(profId,req.body);
    await prof.save();
    res.send(prof);
   },
   getpresId:(req, res) => {
    const {presId} = req.params;
    Prescription.findById(presId, (err, result) => {
      if (err) { return console.error(err); }
      res.status(200).json(result);
    });
  },
  getpres:(req, res) => {
    Prescription.find({ patient: req.params.patId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  },

  getdoc:(req, res) => {
    Doctor.find({ prescription: req.params.presId }, (err, item) => {
      if (err) { return console.error(err); }
      res.status(200).json(item);
    });
  },
  getdocId:(req, res) => {
    const {docId} = req.params;
    Doctor.findById(docId, (err, result) => {
      if (err) { return console.error(err); }
      res.status(200).json(result);
    });
  },

}