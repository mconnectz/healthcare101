var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var auto = require('mongoose-auto-increment');

auto.initialize(mongoose.connection);

var prescription = new Schema({
  date:{type:Date, default:Date.now},
  healthissue:{type:String},
  diagnosisreport: {type: String},
  otherremark: {type: String},
  medicine: {type: String},
  dosage:{type:String},
  frequency:{type:String},
  comments:{type:String},
  pharmacie:{type:String},
  test:{type:String},
  lab:{type:String},
  patientname:{type:String},
  doctorname:{type:String},
  
  doctor: {type: String,ref: 'doctor'},
  patient: {type: String,ref: 'patient'},
});

prescription.plugin(auto.plugin, {
  model: 'prescription',
  prefix:'pres_',
  startAt: 10000,

});

module.exports = mongoose.model('prescription', prescription);