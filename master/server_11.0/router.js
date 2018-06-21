const express = require('express');
const router = express.Router();

const auth = require('./controllers/auth');
const doctor = require('./controllers/doctor');
const hospital = require('./controllers/hospital');
const hAdmin = require('./controllers/hospital_admin');
const lab = require('./controllers/lab');
const lAdmin = require('./controllers/lab_admin');
const labAssist = require('./controllers/lab_assist');
const patient = require('./controllers/patient');
const pat = require('./controllers/user');

const pharm = require('./controllers/pharm');
const pAdmin = require('./controllers/pharm_admin');
const pharmAssist = require('./controllers/pharm_assist');
const sAdmin = require('./controllers/super_admin');
const jwt = require('jsonwebtoken');
var User = require('./schema/patient');
const secret = 'crypto';
const pres = require('./controllers/user');

router.post('/register',auth.register);
router.get('/activate/:token',auth.activate);
router.post('/login',auth.login);

router.get('/prescriptions/count',pres.count)
router.get('/patient/count',patient.count)
router.get('/patient/:userId/profiles/count',patient.countProf)


  // router.use(function(req, res, next) {
  //   const token = req.headers['authorization']; // Create token found in headers
  // jwt.verify(token,secret, (err, decoded) => {
  //   if (err) {
  //      res.json({ success: false, message: 'Token invalid: ' + err });
  //    } else {
  //     req.decoded = decoded;
  //    next(); // Exit middleware
  // }
  //  });
  // });

router.post('/getProfile',auth.get);


router.post('/admin/lab',lAdmin.insert);
router.put('/admin/lab/:id',lAdmin.update);
router.delete('/admin/lab/:id',lAdmin.remove);
router.get('/admin/lab/:id',lAdmin.get);
router.get('/admin/lab',lAdmin.getAll);
router.get('/admin/lab/count',lAdmin.count);
router.post('/admin/lab/search',lAdmin.search);

router.post('/assist/lab',lab.insert);
router.put('/assist/lab/:id',lab.update);
router.delete('/assist/lab/:id',lab.remove);
router.get('/assist/lab/:id',lab.get);
router.get('/assist/lab',lab.getAll);
router.get('/assist/lab/count',lab.count);
router.post('/assist/lab/search',lab.search);

router.post('/lab',lab.insert);
router.put('/lab/:id',lab.update);
router.delete('/lab/:id',lab.remove);
router.get('/lab/:id',lab.get);
router.get('/lab',lab.getAll);
router.get('/lab/count',lab.count);
router.post('/lab/search',lab.search);

router.post('/admin/hospital',hAdmin.insert);
router.put('/admin/hospital/:id',hAdmin.update);
router.delete('/admin/hospital/:id',hAdmin.remove);
router.get('/admin/hospital/:id',hAdmin.get);
router.get('/admin/hospital',hAdmin.getAll);
router.get('/admin/hospital/count',hAdmin.count);
router.post('/admin/hospital/search',hAdmin.search);

router.post('/hospital',hospital.insert);
router.put('/hospital/:id',hospital.update);
router.delete('/hospital/:id',hospital.remove);
router.get('/hospital/:id',hospital.get);
router.get('/hospital',hospital.getAll);
router.get('/hospital/count',hospital.count);
router.post('/hospital/search',hospital.search);

router.post('/admin/pharm',pAdmin.insert);
router.put('/admin/pharm/:id',pAdmin.update);
router.delete('/admin/pharm/:id',pAdmin.remove);
router.get('/admin/pharm/:id',pAdmin.get);
router.get('/admin/pharm',pAdmin.getAll);
router.get('/admin/pharm/count',pAdmin.count);
router.post('/admin/pharm/search',pAdmin.search);

router.post('/assist/pharm',pharmAssist.insert);
router.put('/assist/pharm/:id',pharmAssist.update);
router.delete('/assist/pharm/:id',pharmAssist.remove);
router.get('/assist/pharm/:id',pharmAssist.get);
router.get('/assist/pharm',pharmAssist.getAll);
router.get('/assist/pharm/count',pharmAssist.count);
router.post('/assist/pharm/search',pharmAssist.search);

router.post('/pharm',pharm.insert);
router.put('/pharm/:id',pharm.update);
router.delete('/pharm/:id',pharm.remove);
router.get('/pharm/:id',pharm.get);
router.get('/pharm',pharm.getAll);
router.get('/pharm/count',pharm.count);
router.post('/pharm/search',pharm.search);

router.post('/admin',sAdmin.insert);
router.put('/admin/:id',sAdmin.update);
router.delete('/admin/:id',sAdmin.remove);
router.get('/admin/:id',sAdmin.get);
router.get('/admin',sAdmin.getAll);
router.get('/admin/count',sAdmin.count);
router.post('/admin/search',sAdmin.search);

// router.post('/doctor',doctor.insert);
// router.put('/doctor/:id',doctor.update);
// router.delete('/doctor/:id',doctor.remove);
// router.get('/doctor/:id',doctor.get);
// router.get('/doctor',doctor.getAll);
// router.get('/doctor/count',doctor.count);
// router.post('/doctor/search',doctor.search);

router.post('/patient',patient.insert);
router.put('/patient/:id',patient.update);
router.delete('/patient/:id',patient.remove);
router.get('/patient/',patient.getAll);
router.get('/patient/:id',patient.get);
router.get('/patient',patient.getAll);
router.get('/patient/:patId/prescriptions',pat.getPrescription)
router.get('/patient/:patId/prescriptions/:presId',pat.getPrescriptionbyId)
//router.post('/patient/:patId/prescriptions/:presId/padmin',pat.new)

router.post('/patient/:userId/profiles/search',patient.search);


router.post('/doctors/prescriptions/search',pres.search);

router.route('/patient/:userId/profiles')
.get(patient.getUserProfiles)
 .post(patient.newUserProfile);

 router.route('/patient/:userId/profiles/:profId')
 .get(patient.getProfilebyId)
 .put(patient.putProfilebyId)
 .delete(patient.deleteProfilebyId)



module.exports = router ;


