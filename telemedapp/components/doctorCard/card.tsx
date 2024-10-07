import React, { useState } from "react";
import RatingComp from "@/components/common/RatingComp";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoMdAlarm } from "react-icons/io";
import { FaMoneyBill1Wave, FaCircle } from "react-icons/fa6";
import styles from "./card.module.css";
import { formatDate } from "@/utils/date";

const DoctorCard = ({ doctor }: { doctor: any }) => {
  const [openRatingDialog, setOpenRatingDialog] = useState(false); // Controls rating dialog visibility
  const userImage = <FaCircle className="h-20 w-20 text-[#035fe9]" />;

  const bufferToBase64 = (buffer: number[]) => {
    const binary = String.fromCharCode.apply(null, buffer);
    return window.btoa(binary);
  };

  const base64Image = doctor.image
    ? `data:image/jpeg;base64,${bufferToBase64(doctor.image.data)}`
    : ""; // Handle no image scenario

  const handleRatingDialogOpen = () => {
    setOpenRatingDialog(true);
  };

  const handleRatingDialogClose = () => {
    setOpenRatingDialog(false);
  };

  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col space-y-8 hover:scale-105 transition shadow-lg max-w-96 min-w-72 md:mx-2 mx-auto">
      <div className="flex flex-col space-y-4 md:space-y-0 items-center md:items-start md:flex-row space-x-2">
        <div>
          {base64Image ? (
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={base64Image}
              alt="doc"
            />
          ) : (
            userImage
          )}
        </div>
        <div className="flex flex-col space-y-2 grow">
          <h2 className="text-xs md:text-sm">{doctor.name}</h2>
          <div className="flex justify-between items-center">
            <p className="text-[#035fe9] text-xs md:text-sm">{doctor.title}</p>
            <p className="text-[#035fe9] text-xs md:text-sm flex items-center">
              <HiOutlineUserGroup className="h-6 w-6 mr-2" />{" "}
              {doctor.numSessions} Sessions
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Stack spacing={1}>
              {doctor.rating > 0 ? (
                <Rating
                  sx={{
                    fontSize: {
                      xs: "16px",
                      sm: "18px",
                      md: "20px",
                    },
                  }}
                  name="rating"
                  defaultValue={doctor.rating}
                  precision={0.01}
                  readOnly
                />
              ) : (
                <button
                  onClick={handleRatingDialogOpen}
                  className="text-blue-500 underline text-xs"
                >
                  Write a Review
                </button>
              )}
            </Stack>
            <p className="text-[#343a40] text-xs">
              {doctor.rating > 0
                ? `${doctor.rating} (${doctor.numReviews} Reviews)`
                : "No Reviews"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="text-sm">Interests:</div>
        <div className="flex">
          {doctor.interests.map((interest: string) => (
            <div
              key={interest}
              className={
                styles.text_control +
                " text-xs text-center text-[#60A899] bg-[#6CCA871A] px-2 py-1 rounded-full "
              }
            >
              {interest}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <div>
          <IoMdAlarm className="h-6 w-6 text-[#035fe9]" />
        </div>
        <div className="grow text-xs md:text-sm">
          Next available: {formatDate(doctor.nearestApp)}
        </div>
      </div>

      <div className="flex justify-between items-center space-x-2">
        <FaMoneyBill1Wave className="h-6 w-6 text-[#035fe9]" />
        <div className="grow text-xs md:text-sm">Fee: ${doctor.fee}</div>
      </div>

      {/* Rating Dialog */}
      <RatingComp
        text="Write a Review"
        variant="outlined"
        item={doctor} // Pass the doctor object
        open={openRatingDialog}
        onClose={handleRatingDialogClose}
      />
    </div>
  );
};

export default DoctorCard;
