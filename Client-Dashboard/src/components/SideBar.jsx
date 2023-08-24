import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  MdDashboard,
  MdAddBox,
  MdFormatListBulletedAdd,
  MdLogout,
  MdOutlineWatchLater
} from "react-icons/md";
import { Link } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: MdDashboard },
    { name: "Add Movies", link: "/add-movies", icon: MdFormatListBulletedAdd },
    { name: "Add Genre", link: "/add-genre", icon: MdAddBox },
    { name: "Watch Later", link: "/watch-later", icon: MdOutlineWatchLater },
    { name: "Logout", link: "/logout", icon: MdLogout },
  ];

  useEffect(() => {
    window.innerWidth <= 769 && setIsOpen(false);
  }, [window.innerWidth]);

  const handleIsOpen = () => {
    setIsOpen((prev) => !isOpen);
  };

  return (
    <div
      className={`bg-gray-950 min-h-screen ${
        isOpen ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={handleIsOpen}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, index) => (
          <Link
            to={menu?.link}
            key={index}
            className="flex items-center text-sm gap-3.5 font-medium p-2 rounded-md hover:bg-violet-800 focus:ring-1 focus:bg-violet-800"
          >
            <div className="group relative">
              <div>
                {React.createElement(menu?.icon, {
                  size: "20",
                })}
              </div>
              {!isOpen && (
                <span className="absolute -top-0.5 left-12 scale-0 rounded bg-white p-2 text-xs text-gray-800 group-hover:scale-100 w-[85px]">
                  {menu?.name}
                </span>
              )}
            </div>

            <h2
              style={{ transitionDelay: `${index * 3}00ms` }}
              className={`whitespace-pre duration-500 ${
                !isOpen && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
