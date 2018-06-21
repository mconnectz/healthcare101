const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let lAdmin_schema = mongoose.Schema({
  role:{type: String,default:'Ladmin' },
  username: { type: String },
  password:{ type: String },
  lfirstname:{ type: String },
  llastname:{ type: String },
  laddress:{ type: String },
  lphone:{ type: Number },
  lemail:{ type: String },
  larea:{ type: String },
  lcity:{ type: String },
  lstate:{ type: String },
  lcountry:{ type: String },
  lpincode:{ type: Number },
  leducationdetails:{ type: String },
  lcertificateno:{ type: String },
  lspecialist:{ type: String },
  lregno:{ type: String },
  lyearsofexperience:{ type: String },
});

lAdmin_schema.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

lAdmin_schema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('LabAdmins', lAdmin_schema);

