const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let hAdmin_schema = mongoose.Schema({
  role:{type: String,default:'Hadmin' },
  username: { type: String },
  password:{ type: String },
});

hAdmin_schema.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

hAdmin_schema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Hadmins', hAdmin_schema);

