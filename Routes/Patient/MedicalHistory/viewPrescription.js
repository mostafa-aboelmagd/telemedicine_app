

const express = require('express');
const patientHistoryViewPrescriptionController = require('../../../Controllers/Patient/MedicalHistory/viewPrescription');
// const { tokenAuthentication } = require('../../Middleware/User/Authentication');

const router = express.Router();

router.get('', patientHistoryViewPrescriptionController.getPrescription);

module.exports = router;