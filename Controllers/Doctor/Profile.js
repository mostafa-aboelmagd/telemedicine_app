const database = require("../../Database/Doctor/Profile");

const doctorInfo = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";
  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json(message);
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json(message);
  }
  const doctor = await database.retrieveDoctorInfo(doctorUserId, doctorEmail);
  if (!doctor) {
    message = "Could not retrieve doctor info";
    return res.status(400).json(message);
  }
  const formattedDoctor = {
    firstName: doctor[0].user_first_name,
    lastName: doctor[0].user_last_name,
    email: doctor[0].user_email,
    gender: doctor[0].user_gender,
    phone: doctor[0].user_phone_number,
    birthYear: doctor[0].user_birth_year,
    image: doctor[0].doctor_image,
    residenceCountry: doctor[0].doctor_country,
    sixtyMinPrice: doctor[0].doctor_sixty_min_price,
    thirtyMinPrice: doctor[0].doctor_thirty_min_price,
    specialization: doctor[0].doctor_specialization,
    languages: doctor[0].languages,
  };
  message = "Doctor info retrieved successfully";
  return res.json({ message, formattedDoctor });
};

const doctorPatients = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";
  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json(message);
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json(message);
  }
  const patients = await database.retrieveDoctorPatients(
    doctorUserId,
    doctorEmail
  );
  if (!patients) {
    message = "No pending requests found ";
    return res.status(400).json(message);
  }
  return res.json(patients);
};
// Doctor View pending requests
const doctorPendingRequests = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";

  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json({ message });
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json({ message });
  }

  const pendingAppointments = await database.retrievePendingAppointments(
    doctorUserId
  );
  if (!pendingAppointments) {
    message = "No pending requests found";
    return res.status(400).json({ message });
  }

  return res.json(pendingAppointments);
};

// view doctors coming appointments.
const doctorAppointments = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";

  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json({ message });
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json({ message });
  }

  const pendingAppointments = await database.retrieveDoctorAppointments(
    doctorUserId
  );
  if (!pendingAppointments) {
    message = "No coming appointments found";
    return res.status(400).json({ message });
  }

  return res.json(pendingAppointments);
};

// view doctors declined appointments.
const doctorDeclinedRequests = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";

  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json({ message });
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json({ message });
  }

  const pendingAppointments = await database.retrieveDoctorDeclinedAppointments(
    doctorUserId
  );
  if (!pendingAppointments) {
    message = "No declined requests found";
    return res.status(400).json({ message });
  }

  return res.json(pendingAppointments);
};

const doctorReviews = async (req, res) => {
  const doctorUserId = req.id;
  const doctorEmail = req.email;
  let message = "";
  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json(message);
  }
  if (!doctorEmail) {
    message = "Doctor email not found";
    return res.status(404).json(message);
  }
  const reviews = await database.retrieveDoctorReviews(
    doctorUserId,
    doctorEmail
  );
  if (!reviews) {
    message = "No reviews found";
    return res.status(400).json(message);
  }
  return res.json(reviews);
};
const doctor_Further_Informtion = async (req, res) => {
  const doctorUserId = req.id;
  let message = "";
  if (!doctorUserId) {
    message = "Doctor ID not found";
    return res.status(404).json(message);
  }
  const FurtherInformation = await database.retrieveDoctorFurtherInformation(
    doctorUserId
  );
  if (!FurtherInformation) {
    message = "No Further Information found";
    return res.status(400).json(message);
  }
  return res.json(FurtherInformation);
};

const add_doctor_Further_Informtion = async (req, res) => {
    const doctorUserId = req.id;
    let message = '';
    if (!doctorUserId) {
        message = 'Doctor ID not found';
        return res.status(404).json(message);
    }
    const FurtherInformation = await database.retrieveDoctorFurtherInformation(doctorUserId);
    if (!FurtherInformation) {
        message = 'No Further Information found';
        return res.status(400).json(message);
    }
    return res.json(FurtherInformation);
}
// const doctorExperience = async (req, res) => {
//     const doctorUserId = req.id;
//     const doctorEmail = req.email;
//     let message = '';
//     if (!doctorUserId) {
//         message = 'Doctor ID not found';
//         return res.status(404).json(message);
//     }
//     if (!doctorEmail) {
//         message = 'Doctor email not found';
//         return res.status(404).json(message);
//     }
//     const experience = await database.retrieveDoctorExperience(doctorUserId, doctorEmail);
//     if (!experience) {
//         message = 'No experience found';
//         return res.status(400).json(message);
//     }
//     return res.json(experience);
// }

// const doctorEducation = async (req, res) => {
//     const doctorUserId = req.id;
//     const doctorEmail = req.email;
//     let message = '';
//     if (!doctorUserId) {
//         message = 'Doctor ID not found';
//         return res.status(404).json(message);
//     }
//     if (!doctorEmail) {
//         message = 'Doctor email not found';
//         return res.status(404).json(message);
//     }
//     const education = await database.retrieveDoctorEducation(doctorUserId, doctorEmail);
//     if (!education) {
//         message = 'Could not retrieve education';
//         return res.status(400).json(message);
//     }
//     return res.json(education);
// }

// const doctorInterests = async (req, res) => {
//     const doctorUserId = req.id;
//     const doctorEmail = req.email;
//     let message = '';
//     if (!doctorUserId) {
//         message = 'Doctor ID not found';
//         return res.status(404).json(message);
//     }
//     if (!doctorEmail) {
//         message = 'Doctor email not found';
//         return res.status(404).json(message);
//     }
//     const interests = await database.retrieveDoctorInterests(doctorUserId, doctorEmail);
//     if (!interests) {
//         message = 'Could not retrieve interests';
//         return res.status(400).json(message);
//     }
//     return res.json(interests);
// }

// const doctorLanguages = async (req, res) => {
//     const doctorUserId = req.id;
//     const doctorEmail = req.email;
//     let message = '';
//     if (!doctorUserId) {
//         message = 'Doctor ID not found';
//         return res.status(404).json(message);
//     }
//     if (!doctorEmail) {
//         message = 'Doctor email not found';
//         return res.status(404).json(message);
//     }
//     const languages = await database.retrieveDoctorLanguages(doctorUserId, doctorEmail);
//     if (!languages) {
//         message = 'Could not retrieve languages';
//         return res.status(400).json(message);
//     }
//     return res.json(languages);
// }

module.exports = {
  doctor_Further_Informtion,
  doctorDeclinedRequests,
  doctorInfo,
  doctorPatients,
  doctorAppointments,
  doctorReviews,
  doctorPendingRequests,
};
