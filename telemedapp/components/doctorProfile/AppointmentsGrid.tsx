import React from "react";
import AppointmentCard from "./AppointmentCard";

const AppointmentsGrid = ({
  appointments,
  profileData,
}: {
  appointments: any[];
  profileData: any;
}) => {
  let appointmentList = appointments.map((appointment) => {
    return (
      <AppointmentCard
        appointment={appointment}
        key={appointment.id}
        profileData={profileData}
      />
    );
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {appointmentList}
    </div>
  );
};

export default AppointmentsGrid;
