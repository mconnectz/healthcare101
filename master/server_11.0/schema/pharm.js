const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let pharm_schema = mongoose.Schema({
  role:{type: String,default:'Pharm' },
  userrname: { type: String },
  password:{ type: String },
  password:{ type: String },
  pfirstname:{ type: String },
  plastname:{ type: String },
  paddress:{ type: String },
  pphone:{ type: Number },
  ppemail:{ type: String },
  parea:{ type: String },
  pcity:{ type: String },
  pstate:{ type: String },
  ppincode:{ type: Number },
  peducationaldetails:{ type: String },
  pcertificateno:{ type: String },
  pspecialization:{ type: String },
  pregno:{ type: String },
  pyearofexp:{ type: String },
});

pharm_schema.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

pharm_schema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Pharmacy', pharm_schema);

