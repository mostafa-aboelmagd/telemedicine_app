const express = require("express");
const backOfficeController = require("../../Controllers/backOffice/backOfficeController");
const { tokenAuthentication } = require("../../Middleware/User/Authentication");
const { restrictTo } = require("../../Utilities");
const router = express.Router();

router.use("/", tokenAuthentication, restrictTo("Admin"));

router.get("/getAllPatients", backOfficeController.getAllPatients);

router.get("/getPatient/:field", backOfficeController.getPatientInfo);

router.get(
  "/getPatientAppointment/:id",
  backOfficeController.getPatientAppointment
);

router.patch(
  "/changePatientState/:id",
  backOfficeController.changePatientState
);

router.get("/getAllDoctors", backOfficeController.getAllDoctors);

router.patch("/changeDoctorState/:id", backOfficeController.changeDoctorState);

router.get("/getDoctor/:field", backOfficeController.getDoctorInfo);

module.exports = router;
