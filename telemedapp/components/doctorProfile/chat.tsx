"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import userImage from "@/images/user.png";
import Message from "./message"
// import { io } from "socket.io-client";
import io from 'socket.io-client';
import { Socket } from 'socket.io-client'; // Import the Socket type

function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null); // Specify the type of socket
  useEffect(() => {
    console.log(`${process.env.NEXT_PUBLIC_SERVER_NAME}/start-chat-server`)
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_NAME, {
      path: '/start-chat-server'  // Specify the path here
    }); console.log("newSocket", newSocket)

    setSocket(newSocket);
    newSocket.on('connect_error', (error) => {
      console.log('Socket.IO connection error:', error);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);


  const chat_doctorID = localStorage.getItem("userId")
  const chat_appointmentId = localStorage.getItem("chat_appointmentId")
  const chat_patientId = localStorage.getItem("chat_patientId")
  // console.log("patientid", chat_patientId);
  // console.log("appointment is ", chat_appointmentId);
  // console.log("doc is ", chat_doctorID);
  const [inputValue, setInputValue] = useState("");
  const [messagesList, setMessagesList] = useState([{
    time: "",
    text: ""
  }]);
  useEffect(() => {
    if (socket) {
      console.log('useEffect triggered');
      const token = localStorage.getItem("jwt");
      if (!token) {
        window.location.href = "/auth/signin";
      } else if (Math.floor(new Date().getTime() / 1000) > Number(localStorage.getItem("expiryDate"))) {
        localStorage.clear();
        window.location.href = "/auth/signin";
      }

      console.log('Joining room:', chat_appointmentId);
      socket.emit('joinAppointmentChat', chat_appointmentId); // Use correct event name

      const fetchMessages = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_NAME}/appointment-chat/${chat_appointmentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          setMessagesList(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();
      socket.on('newMessage', (message) => {
        console.log('New message received:', message);
        setMessagesList((prevMessages) => [...prevMessages, message]);
      });
      socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
        // Handle the error, e.g., display an error message to the user
      });
    }
  }, [socket, chat_appointmentId]); // Add socket to dependency array


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(() => (value));
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputValue) {
      console.log('Cannot send an empty message');
      return;
    }

    if (socket) { // Check if socket is initialized
      socket.emit('sendMessage', {
        doctorId: chat_doctorID,
        patientId: chat_patientId,
        message: inputValue,
        appointmentId: chat_appointmentId
      });
    } else {
      console.error('Socket.IO not initialized. Cannot send message.');
    }

    setInputValue("");
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col m-2 h-[600px] w-[600px] bg-white">
        <div className="p-2 border-solid border-[1px] border-zinc-200 h-[10%]">
          <div className="flex mx-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image className="inline-block h-10 w-10 rounded-full" src={userImage} alt="Doctor Image" />
              <p className="font-bold">Mahmoud</p>
            </div>
            <button
              onClick={() => (window.location.href = "/doctorProfile/requests")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:scale-105 hover:cursor-pointer"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-3/4 border-solid border-x-[1px] border-x-zinc-300 p-2 overflow-y-scroll">
          {messagesList.length > 1 ? messagesList.slice(1, messagesList.length).map((message) => (
            <Message key={message.text + message.time} time={message.time} text={message.text} />
          )) :
            <></>}
        </div>

        <div className="flex gap-2 p-2 border-solid border-[1px] border-zinc-300 items-center h-[15%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="ml-2 size-6 hover:scale-105 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-[81%] p-2.5"
            placeholder="Aa"
            value={inputValue}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="inline-block h-8 w-8 bg-blue-600 stroke-blue-600 rounded-full size-6 fill-white hover:scale-105 hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;