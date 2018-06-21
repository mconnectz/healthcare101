var express = require('express');
var router = express.Router();

const patient = require('./schema/patient');
const padmin = require('./schema/pharm_admin');
const prescription = require('./schema/prescribe');
const controller = require('./controllers/pl');

router.get('/prescriptions',function(req,res,next){
prescription.find(function(err, result){
res.send(result);
});
});

router.get('/prescriptions/:_id', function(req, res){
    
      prescription.find({_id:req.params._id} , function(err,result){
          if(err) throw err;
          res.json(result);
      });
  });

  router.delete('/prescriptions/:_id',(req, res, next)=>{
      prescription.remove({_id: req.params._id}, function(err, result){
      if(err)
        {
          res.json(err);  
        }
          else{
                res.json(result);
              }
            });    
          });
     

router.route('/')
     .get(controller.getPatient)
      .post(controller.newPatient)

   router.route('/:patId')
         .get(controller.getPatbyId)

   router.route('/:patId/padmin')
         .get(controller.getPadmin)
         .post(controller.newPadmin)   
         
   router.route('/:patId/padmin/:pharmId')
         .get(controller.getPadminbyId)
            
  router.route('/:patId/padmin/:pharmId/prescriptions')
         .get(controller.getPrescription)
         .post(controller.newPrescription)
 

//  router.route('/:patId/padmin/:pharmId/prescriptions/:presId')      
//          .get(controller.getPrescriptionbyId)



         module.exports = router;
        