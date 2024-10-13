const express = require("express");
const doctorProfileController = require("../../Controllers/Doctor/Profile");
const { tokenAuthentication } = require("../../Middleware/User/Authentication");

const router = express.Router();

router.get("/info", tokenAuthentication, doctorProfileController.doctorInfo);
router.get(
  "/patients",
  tokenAuthentication,
  doctorProfileController.doctorPatients
);
router.get(
  "/appointments",
  tokenAuthentication,
  doctorProfileController.doctorAppointments
);
// router.get('/availabilities', tokenAuthentication, doctorProfileController.doctorAvailabilities);
router.get(
  "/DoctorFurtherInformation",
  tokenAuthentication,
  doctorProfileController.doctor_Further_Informtion
);
// router.get('/experience', tokenAuthentication, doctorProfileController.doctorExperience);
// router.get('/education', tokenAuthentication, doctorProfileController.doctorEducation);
// router.get('/interests', tokenAuthentication, doctorProfileController.doctorInterests);
router.get(
  "/reviews",
  tokenAuthentication,
  doctorProfileController.doctorReviews
);
router.get(
  "/PendingRequests",
  tokenAuthentication,
  doctorProfileController.doctorPendingRequests
);
router.get(
  "/DeclinedRequests",
  tokenAuthentication,
  doctorProfileController.doctorDeclinedRequests
);

module.exports = router;
