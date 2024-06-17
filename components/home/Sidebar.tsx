"use client"
import React, { useRef, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { FiFolder, FiShoppingCart } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { FaReadme } from "react-icons/fa6";
import { Search, SearchIcon } from "./style";
import Course from "../course/Index";
import Post from "../posts/Index";
import User from "../users/Index";

interface Menu {
  name: string;
  link: React.ComponentType<{ size: string }> | string; // Puede ser un componente o una cadena (ruta)
  icon: React.ComponentType<{ size: string }>;
  margin?: boolean;
}

const Sidebar: React.FC = () => {
  const menus: Menu[] = [
    { name: "dashboard", link: Course, icon: MdOutlineDashboard },
    { name: "user", link: User, icon: AiOutlineUser },
    { name: "Cursos", link: Course, icon: FaReadme },
    { name: "analytics", link: "/users", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Setting", link: "/", icon: RiSettings4Line },
    { name: "Cerrar sesión", link: "/", icon: TbLogout2, margin: true },
  ];
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<React.ComponentType<{ size: string }> | null>(null);

  const searchClickHandler = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
      if (searchRef.current !== null) {
        searchRef.current.focus();
      }
    } else {
    }
  };

  const handleSidebarClick = (link: React.ComponentType<{ size: string }> | string) => {
    setSelectedRoute(() => {
      if (typeof link === 'string') {
        return null; // Devuelve null si link es una cadena (por ejemplo, una ruta)
      } else {
        return link; // Devuelve el componente de React si link es un componente
      }
    });
  };
  
  const handleClickMenu = () => {
    if (typeof document !== 'undefined') {
      setOpen(!open);
      setIsOpen(!isOpen);
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
      {isOpen ? (
        <HiMenuAlt3
          size={30}
          className="cursor-pointer hover:bg-secondary-color rounded-lg"
          onClick={handleClickMenu}
        />
      ) : (
        <HiX
          size={30}
          className="cursor-pointer hover:bg-secondary-color rounded-lg"
          onClick={handleClickMenu}
        />
      )}
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
            <div key={i}>
                <div
                  onClick={() => handleSidebarClick(menu.link)}
                  className={` ${
                    menu?.margin && "mt-5"
                  } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-secondary-color rounded-md cursor-pointer`}
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
                } absolute left-40 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
      {selectedRoute && React.createElement(selectedRoute, { size: "80px" })}
      </div>
    </section>
  );
};

export default Sidebar;
