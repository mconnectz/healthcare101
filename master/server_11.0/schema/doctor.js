const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema; 
var auto = require('mongoose-auto-increment');
 
auto.initialize(mongoose.connection);

let doctor = new Schema({
  role:{type: String,default:'Doctor' },
  username: { type: String },
  password:{ type: String },
  dphoto:{type:String},
  dfirstname:{ type: String },
  dlastname:{ type: String },
  daddress:{ type: String },
  dmobile:{ type: Number },
  demail:{ type: String },
  darea:{ type: String },
  dcity:{ type: String },
  dcountry:{ type: String },
  dstate:{ type: String },
  dpincode:{ type: Number },
  deducationdetails:{ type: String },
  dcertificateno:{ type: String },
  dspecialist:{ type: String },
  dregistrationno:{ type: String },
  dyearsofexperience:{ type: String },

  patient: ['patient'],
  prescription: ['prescription'],
});


doctor.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

doctor.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

doctor.plugin(auto.plugin, {
  model: 'Doctor',
  prefix:'Doc-',
  startAt: 1000,
});

module.exports = mongoose.model('Doctor', doctor);
