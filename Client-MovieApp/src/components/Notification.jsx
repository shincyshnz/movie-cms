import React, { useEffect, useState } from "react";
import { FiBell, FiMoreVertical, FiX } from "react-icons/fi";

const Notification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState([]);
  const [notificationNumber, setNotificationNumber] = useState(
    notification.length
  );

  useEffect(() => {
    // Open a connection to recieve events from server
    const eventSource = new EventSource(
      import.meta.env.VITE_NOTIFICATION_SSE_URL
    );

    // attaching handlers to recieve message events
    eventSource.onmessage = (event) => {
      const movieData = JSON.parse(event.data);
      if (movieData.type !== 3) {
        setNotification((prev) => [...prev, movieData]);
      }
    };
    //terminatin connection on component unmount
    return () => eventSource.close();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    setShowNotification((prev) => !prev);
    setNotificationNumber((prev) => (prev = 0));
  };

  const handleNotificationClear = (event, index) => {
    event.preventDefault();

    const newNoti = notification.slice((index,1));
    console.log(newNoti);
    setNotification((prev) => (prev = newNoti));
  };

  return (
    <>
      <div
        className="notification pt-1 mr-2 px-2"
        id="dropdown"
        onClick={handleClick}
      >
        <FiBell />
        <div className="absolute flex text-sm text-center">
          {/* <span className="animate-ping absolute inline-flex h-full -top-6 left-3  w-full rounded-full bg-white opacity-75"></span> */}
          <span className="absolute inline-flex rounded-full -top-6 left-4 px-1 bg-violet-800 text-center">
            {notification.length}
          </span>
        </div>
      </div>

      {showNotification && (
        <div
          id="dropdown"
          className="absolute z-10 top-16 right-4 md:w-1/2 lg:w-1/4 py-3 bg-white rounded-sm shadow"
        >
          <ul
            className="py-2 text-gray-500 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            {notification.length > 0 ? (
              notification.map((noti, index) => {
                let tag, color;
                if (noti.type == 1) {
                  tag = "New";
                  color = "bg-green-600";
                } else {
                  tag = "Updated";
                  color = "bg-blue-600";
                }
                return (
                  <li
                    className="flex justify-between gap-2 items-center py-2 bg-slate-100 px-4 mt-1"
                    key={index}
                  >
                    <div className="flex justify-start gap-3 items-center">
                      <img
                        className="w-10 h-10"
                        src={noti.url}
                        alt={noti.title}
                      />
                      <p className="text-md text-gray-600">
                        {noti.title[0].toUpperCase() + noti.title.slice(1)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <span
                        className={`text-sm text-white ${color} px-2 py-1 rounded-md`}
                      >
                        {tag}
                      </span>
                      <FiX className="text-lg"
                        onClick={(e) => handleNotificationClear(e, index)}
                      ></FiX>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-md text-gray-600 p-3 text-center">
                No New Notifications
              </p>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Notification;
