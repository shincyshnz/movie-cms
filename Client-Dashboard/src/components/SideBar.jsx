import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard, MdAddBox, MdFormatListBulletedAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menus = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Add Movie", link: "/", icon: MdFormatListBulletedAdd },
    { name: "Add Genre", link: "/", icon: MdAddBox },
  ];

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
            className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
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
