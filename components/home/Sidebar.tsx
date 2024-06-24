"use client"
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { BsBoxArrowRight, BsBoxArrowLeft } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiFolder, FiShoppingCart } from "react-icons/fi";
import { TbLogout2 } from "react-icons/tb";
import { FaReadme } from "react-icons/fa6";
import Course from "../course/Index";
import User from "../user/Index";
import { Role, StudentData } from '../interface/interface';
import { getToken, getUserId } from "../hook/hook";
import axios from "axios";
import tokenConfig, { URL } from "../utils/format/tokenConfig";
import Cycle from "../cycle/Index";
import Group from "../group/Index";
import Student from "../student/Index";

interface Menu {
  name: string;
  link: React.ComponentType<any> | string; // Puede ser un componente o una cadena (ruta)
  icon: React.ComponentType<{ size: string }>;
  margin?: boolean;
}

const Sidebar: React.FC = () => {

  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedRoute, setSelectedRoute] = useState<React.ComponentType<{ size: string }> | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const token = getToken();
  const validToken = typeof token === "string" ? token : '';
  const userId = getUserId(token)

  useEffect (() => {
    const onSubmit = async () => {
      if (!validToken || !userId) return;
      try {
        const id = userId;
        console.log("ID", id);
        const url = `${URL()}/student/${id}`;
        const response = await axios.get(url, tokenConfig(validToken));

        setStudentData(response.data);
        //setDataLoading(true);
      } catch (error: any) {
        if (error && typeof error === 'object' && 'response' in error) {
          console.log(error.response.data);
        } else if (error instanceof Error) {
          console.log("Error desconocido", error.message);
        } else {
          console.log("Error:", error);
        }
      } finally {
        setDataLoading(false)
      }
    }
    if (validToken) {
      onSubmit();
    }
  }, [validToken, userId]);
  console.log("studentData:", studentData)

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
    setOpen(!open);
    setIsOpen(!isOpen);
  };

  const menus: Menu[] = [
    { name: "dashboard", link: Course, icon: MdOutlineDashboard },
    { name: "Usuario", link: User, icon: AiOutlineUser },
    { name: "Cursos", link: Course, icon: FaReadme },
    /* studentData?.role === Role.ADMIN ? { name: "Ciclo", link: Cycle, icon: TbReportAnalytics, margin: true } : null,
    studentData?.role === Role.ADMIN ? { name: "Estudiantes", link: Student, icon: FiFolder } : null, */
    { name: "Grupo", link: Cycle, icon: TbReportAnalytics, margin: true },
    { name: "Cerrar sesión", link: "/", icon: TbLogout2, margin: true },
  ].filter(Boolean) as Menu[];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="bg-[#374BF6] text-gray-100 flex items-center justify-between px-4 py-5 shadow-md">
        <div className="flex items-center gap-3">
          <div>
            {isOpen ? (
              <BsBoxArrowRight
                size={50}
                className="cursor-pointer p-2 hover:bg-secondary-color rounded-lg"
                onClick={handleClickMenu}/>
            ) : (
              <BsBoxArrowLeft
                size={50}
                className="cursor-pointer p-2 hover:bg-secondary-color rounded-lg"
                onClick={handleClickMenu}/>
            )}
          </div>

          <div className="relative lg:block hidden" data-twe-input-wrapper-init>
            <input
              type="url"
              className="peer block min-h-[auto] w-[600px] rounded-lg border-2 border-gray-300 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInputURL"
              placeholder="Example label" />
            <label
              htmlFor="exampleFormControlInputURL"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-100 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-100 dark:peer-focus:text-primary"
              >Buscar
            </label>
          </div>
        </div>

        {studentData && (
          <div className="text-gray-200 grid grid-cols-3 gap-2">
            <div className="flex justify-end items-center text-5xl">
              <CgProfile className="items-center"/>
            </div>
            <div className="p-2 font-mono">
              <p className="truncate">{studentData.user}</p>
              <p className="truncate">{studentData.name}</p>
            </div>

            <div className="p-2 font-mono">
              <div className="flex items-center">
                {studentData.active ? (
                  <div className="flex items-center">
                    <p className="mr-2">Activo</p>
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p className="mr-2">Inactivo</p>
                    <div className="h-3 w-3 bg-error rounded-full mr-1"></div>
                  </div>
                )}
              </div>
              <div className="">
                <p>{studentData.role ? 'Usuario' : 'Admin'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contenedor principal para sidebar y contenido */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-[#374BF6] ${open ? "lg:w-56 w-40" : "lg:w-16 w-12"} duration-500 text-gray-100 lg:px-4 px-2`}
          style={{ marginTop: "0rem" }} // Espacio para la barra de menú superior fija
        >
          <div className="relative">
            <div className="mt-4 flex flex-col gap-4 relative">
              {menus?.map((menu, i) => (
                <div key={i}>
                  <div
                    onClick={() => handleSidebarClick(menu.link)}
                    className={`${
                      menu?.margin && "mt-5"
                    } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-secondary-color rounded-md cursor-pointer`}
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
                      } absolute z-50 left-40 bg-primary-color font-semibold whitespace-pre text-gray-100 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-11 group-hover:duration-300 group-hover:w-fit`}
                    >
                      {menu?.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <section className="flex-1 px-5 py-5 text-xl text-gray-900 font-semibold overflow-y-auto">
          {selectedRoute && React.createElement(selectedRoute, { size: "80px" })}
        </section>
      </div>
    </div>
  );
};

export default Sidebar;

