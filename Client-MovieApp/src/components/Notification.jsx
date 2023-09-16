import React, { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";

const Notification = () => {
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    // Open a connection to recieve events from server
    const eventSource = new EventSource(import.meta.env.VITE_NOTIFICATION_SSE_URL);

    // attaching handlers to recieve message events
    eventSource.onmessage = (event) => {
      const movieData = JSON.parse(event.data);
      console.log(movieData);
      // setNotification((prev) => (prev = movieData));
    };

    //terminatin connection on component unmount
    return () => eventSource.close();
  }, []);

  return (
    <div className="notification pt-1 mr-2">
      <FiBell />
      <div className="absolute flex text-sm text-center">
        {/* <span className="animate-ping absolute inline-flex h-full -top-6 left-3  w-full rounded-full bg-white opacity-75"></span> */}
        <span className="absolute inline-flex rounded-full h-4 w-4 -top-6 left-3 bg-violet-800 text-center">{notification.length !== 0 && notification.length}</span>
      </div>
    </div>
  );
};

export default Notification;
