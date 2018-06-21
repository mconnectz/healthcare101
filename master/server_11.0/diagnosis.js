var express = require('express');
var router = express.Router();

const doctor = require('./controllers/doctor');
const patient = require('./controllers/patient');

// const controller = require('./controllers/user');

// router.get('/prescriptions',function(req,res,next){
// prescription.find(function(err, result){
// res.send(result);
// });
// });

// router.get('/prescriptions/:_id', function(req, res){
    
//       prescription.find({_id:req.params._id} , function(err,result){
//           if(err) throw err;
//           res.json(result);
//       });
//   });

//   router.delete('/prescriptions/:_id',(req, res, next)=>{
//       prescription.remove({_id: req.params._id}, function(err, result){
//       if(err)
//         {
//           res.json(err);  
//         }
//           else{
//                 res.json(result);
//               }
//             });    
//           });
     

// router.route('/')
//      .get(controller.getDoctor)
//       .post(controller.newDoctor)

// router.route('/:userId')
//          .get(controller.getDoctorbyId)
// router.route('/:userId/patients')
//          .get(controller.getPatient)
//          .post(controller.newPatient)   
         
// router.route('/:userId/patients/:patId')
//          .get(controller.getPatbyId)
            
// router.route('/:userId/patients/:patId/prescriptions')
//          .get(controller.getPrescription)
//          .post(controller.newPrescription)

        //  router.route('/:patId/prescriptions')
        //  .get(controller.getPrescription)
         

// router.route('/:userId/patients/:patId/prescriptions/:presId')      
//          .get(controller.getPrescriptionbyId)


//          router.route('/prescriptions/search') 
//           .post(controller.search)

router.route('/doctor').post(doctor.insert)
                       .get(doctor.getAll);

router.route('/patient').get(patient.getAll);
                    

router.route('/doctor/:id').put(doctor.update)
                            .delete(doctor.remove)
                            .get(doctor.get);

router.route('/patient/:id').put(patient.update)
                            .delete(patient.remove)
                            .get(patient.get);

router.route('/doctor/:id/patient').post(doctor.newpatient)
                                    .get(doctor.getpatient)

router.route('/doctor/:docId/patient/:patId').get(doctor.getpatId)
                                             .put(doctor.putPatient)
                                              .delete(doctor.removePatient)          
                                                
router.route('/doctor/:userId/prescription').get(doctor.getpres);

router.route('/doctor/:userId/prescription/:presId').get(doctor.getpresId)
                                                    .put(doctor.putPres)
                                                    .delete(doctor.removePres);

router.route('/doctor/:userId/prescription/:presId/patient').get(doctor.getprespatient);
                                     

router.route('/patient/:patId/prescription').get(patient.getpres);
router.route('/patient/:patId/prescription/:presId').get(patient.getpresId);
router.route('/patient/:patId/prescription/:presId/doctor/').get(patient.getdoc);
router.route('/patient/:patId/prescription/:presId/doctor/:userId').get(patient.getdocId);
                                 
router.route('/doctor/:userId/patient/:patId').get(doctor.getpatId);

router.route('/doctor/:userId/patient/:patId/prescription').post(doctor.newprescription)
                                                        .get(doctor.getpresc);      

router.route('/doctor/:userId/patient/:patId/prescription/:presId').get(doctor.getpresId)
                                                                .put(doctor.putPres)
                                                                .delete(doctor.removePres);

module.exports = router;
        