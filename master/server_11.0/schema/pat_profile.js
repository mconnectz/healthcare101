const mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 
var autoIncrement = require('mongoose-auto-increment');
 
autoIncrement.initialize(mongoose.connection);

var profileSchema = new Schema({

firstname:{type:String},
   lastname:{type:String},
   relationship:{type:String},
   photo:{type:String},
   address :{type:String},
   city :{type:String},
   state :{type:String},
   country :{type:String},
   mobile:{type:Number},
   dob:{type:String},
   email:{type:String},
   bloodgroup:{type:String},
   pincode:{type:Number},
   gender :{type:String},
   insuranceprovidername: { type: String},
   policyholdername:{type:String },
   policyno:{type:String},
   policyissuancedate:{type:String},
   height: { type:Number},
   weight: { type: Number},
   allergicto:{type:String},
   smoke: { type: String},
   tobacco:{type:String},
   alcohol:{type:String},

   patient: [{type: Number,ref: 'patient'}]
   
});

profileSchema.plugin(autoIncrement.plugin, {
    model: 'profile',
    field: '_id',
    prefix:'prof_',
    startAt: 500,
  
  });

module.exports = mongoose.model('profile', profileSchema);