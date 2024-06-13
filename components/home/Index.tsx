"use client"
import React, { useRef, useState } from "react";
import { NextRouter } from 'next/router';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { Search, SearchIcon } from "./style";
import Course from "../course/Course";

interface SidebarProps {
  router: NextRouter; // Especifica el tipo de router
}

const Sidebar: React.FC<SidebarProps> = ({ router }) => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "user", link: "/course", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      if (searchRef.current !== null) {
        searchRef.current.focus();
      }
    } else {
      // search functionality
    }
  };
  

  const handleClickMenu = () => {
    if (typeof document !== 'undefined') {
      setOpen(!open);
    }
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-primary-color min-h-screen ${
          open ? "lg:w-56 w-40" : "lg:w-16 w-12"
        } duration-500 text-gray-100 lg:px-4 px-2`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={handleClickMenu}
          />
        </div>
        <Search
          onClick={searchClickHandler}
          style={!sidebarOpen ? { width: `fit-content` } : {}}
        >
          <SearchIcon>
            <AiOutlineSearch />
          </SearchIcon>
          <input
            ref={searchRef}
            placeholder="Search"
            style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
          />
      </Search>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}>
                <div
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary-color rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
        REACT TAILWIND
        {router.pathname === "/course" && <Course />}
      </div>
    </section>
  );
};

export default Sidebar;
