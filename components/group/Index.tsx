import React, { useCallback, useEffect, useState } from 'react'
import { useRouteData } from '../hook/hook';
import tokenConfig, { URL } from '../utils/format/tokenConfig';
import axios from 'axios';
import { GroupData, StudentData } from '../interface/interface';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Index from '@/components/course/Index';
import Modal from '../share/Modal';
import ModalTable from '../share/modalTable';

const Group = () => {

  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);

  const token = useRouteData();
  const validToken = typeof token === "string" ? token : '';

  const onSubmit = useCallback( async () => {
    try {
    const url = `${URL()}/groups`;
    const response = await axios.get(url, tokenConfig(validToken));
    setGroupData(response.data);
    console.log("grupo data:", response.data)
    setDataLoading(true);
    } catch (error: any) {
    if (error && typeof error === 'object' && 'response' in error) {
    } else if (error instanceof Error) {
        console.log("Error desconocido", error.message);
    } else {
        console.log("Error:", error);
    }
    }
  }, [validToken, setGroupData, setDataLoading]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const openModal = (group: GroupData) => {
    setSelectedGroup(group);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="overflow-x-auto mt-5 mb-5 bg-secondary-color-gradient rounded-2xl">
      <div className="relative p-2 mb-3 mr-5 float-left">
        <label htmlFor="inputSearch" className="sr-only">
          Search{" "}
        </label>
        <input
          id="inputSearch"
          type="text"
          placeholder="Search..."
          className="block w-56 rounded-lg border py-2 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"/>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4 text-primary-color">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </span>
      </div>

      <div className="relative mb-3 p-2 float-right hidden sm:block">
        <label htmlFor="inputFilter" className="sr-only">
          Filter
        </label>
        <select
          id="inputFilter"
          className="block w-40 rounded-lg border dark:border-none p-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          <option value="1" selected>
            Last week
          </option>
          <option value="2">Last month</option>
          <option value="3">Yesterday</option>
          <option value="4">Last 7 days</option>
          <option value="5">Last 30 days</option>
        </select>
      </div>

      <table className="min-w-full text-left text-sm whitespace-nowrap text-gray-600">
        <thead className="uppercase tracking-wider border-b-2 border-secondary-color bg-primary-color/35 border-t">
          <tr>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              #
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Nombre del grupo
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Nombre del ciclo
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Estudiantes
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Estudiantes
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {groupData?.map((group, index) => (
            <tr key={index} className="border-b hover:bg-primary-color/35">
              <th scope="row" className="px-6 py-4">
                {index + 1}
              </th>
              <th scope="row" className="px-6 py-4">
                {group.groupName}
              </th>
              <th scope="row" className="px-6 py-4">
                {group.cycle.name}
              </th>
              <th scope="row" className="px-6 py-4">
                {group.students.map((student) =>(
                  <div key={student.studentId} className='flex flex-col'>
                  <p> {student.student.name}</p>
                  <p> {student.student.role}</p>
                  <p> {student.student.user}</p>
                </div>
                ))}
              </th>
              <th scope="row" className="px-6 py-4">
                <button onClick={() => openModal(group)} className='text-primary-color text- underline'>
                  Ver
                </button>
              </th>
              <th scope="row" className="px-6 py-4">
                <button /* onClick={() => {setSelectedCycleId(cycle.id); setConfirmationModalOpen(true)}} */>
                  <RiDeleteBin5Line className="text-2xl text-error hover:scale-125 duration-200 cursor-pointer" />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedGroup && (
        <ModalTable open={showModal} onClose={closeModal}>
          <h2>Detalles de los Estudiantes</h2>
          {selectedGroup.students.map((student, index) => (
            <div key={index} className='mb-4'>
              <h3>Estudiante {index + 1}</h3>
              <p>Nombre: {student.student.name}</p>
              <p>Rol: {student.student.role}</p>
              <p>Usuario: {student.student.user}</p>
              {/* Más detalles si es necesario */}
            </div>
          ))}
        </ModalTable>
      )}
    </div>
  )
}

export default Group