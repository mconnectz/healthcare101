const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema; 
var auto = require('mongoose-auto-increment');
 
auto.initialize(mongoose.connection);


let patient = new Schema({
  role:{type: String,default:'Patient' },
  email:{type:String},
  username: { type: String },
  password:{ type: String },
  active:{type:Boolean,default:false},
  temptoken:{type:String},
   
  doctor: [{type: String,ref: 'doctor'}],
  //padmins: [{type: Schema.Types.ObjectId, ref: 'PharmAdmins'}],
  // prescriptions:['prescription'],
 
  profiles: ['profile'],
  prescription: ['prescription']
  
});

patient.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

patient.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

patient.plugin(auto.plugin, {
  model: 'Patients',
  prefix:'Pat-',
  startAt: 5000,
});

module.exports = mongoose.model('Patients', patient);
