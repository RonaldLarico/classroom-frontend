import React, { useCallback, useEffect, useState } from 'react'
import { useRouteData } from '../hook/hook';
import tokenConfig, { URL } from '../utils/format/tokenConfig';
import axios from 'axios';
import { GroupData } from '../interface/interface';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ModalTable from '@/components/share/ModalTable';
import Modal from '../share/Modal';

const Group = () => {
  const [groupData, setGroupData] = useState<GroupData[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCycleId, setSelectedCycleId] = useState<number | null>(null);
  const [selectAllChecked, setSelectAllChecked] = useState(true);

  const token = useRouteData();
  const validToken = typeof token === "string" ? token : '';

  const onSubmit = useCallback( async () => {
    try {
    const url = `${URL()}/groups`;
    const response = await axios.get(url, tokenConfig(validToken));
    const groupsData: GroupData[] = response.data.map((group: GroupData) => ({
      ...group,
      students: group.students.map((student: any) => ({
        ...student,
        isChecked: student.isChecked !== undefined ? student.isChecked : true, // Inicializar isChecked para cada estudiante
      })),
    }));
    setGroupData(groupsData)
    } catch (error: any) {
    if (error && typeof error === 'object' && 'response' in error) {
    } else if (error instanceof Error) {
        console.log("Error desconocido", error.message);
    } else {
        console.log("Error:", error);
    }
    }
  }, [validToken, setGroupData, setDataLoading]);

  const handleDelete = async (id: number | null) => {
    try {
      console.log("ID del grupo a eliminar:", id);
      if (id !== null) {
        const response = await axios.delete(`${URL()}/group/${id}`, tokenConfig(validToken));
        console.log("Eliminación exitosa:", response.data);
        setConfirmationModalOpen(true); // Llamamos a la función de éxito de eliminación
        onSubmit();
      }
    } catch (error) {
      console.error('Error al eliminar grupo:', error);
    } finally {
        setConfirmationModalOpen(false);
    }
  };

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const openModal = (group: GroupData) => {
    setSelectedCycleId(group.id);
    setSelectedGroup(group);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCycleId(null);
    setSelectedGroup(null);
    setShowModal(false);
    setConfirmationModalOpen(false);
  };
  console.log("groupDatas:", groupData);

    const handleSelectAll = () => {
    const updatedGroupData = groupData.map(group => ({
      ...group,
      students: group.students.map(student => ({
        ...student,
        isChecked: !selectAllChecked,
      })),
    }));
    setGroupData(updatedGroupData);
    setSelectAllChecked(!selectAllChecked);
  };

  const toggleSwitch = (studentId: number) => {
    if (selectedGroup) {
      const updatedStudents = selectedGroup.students.map((student) => {
        if (student.student.id === studentId) {
          return {
            ...student,
            isChecked: !student.isChecked,
          };
        }
        return student;
      });
      const updatedGroup = {
        ...selectedGroup,
        students: updatedStudents,
      };
      setSelectedGroup(updatedGroup);
      const updatedGroupData = groupData.map((group) => {
        if (group.id === updatedGroup.id) {
          return updatedGroup;
        }
        return group;
      });
      setGroupData(updatedGroupData);
    }
  };

  return (
    <div className="overflow-x-auto mt-5 mb-5 bg-error/15 rounded-2xl">
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
        <thead className="uppercase tracking-wider border-b-2 border-error bg-error/35 border-t-2">
          <tr>
            <th scope="col" className="px-6 py-4 text-center">
              #
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Nombre del ciclo
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Nombre del grupo
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Fecha
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Estudiantes
            </th>
            <th scope="col" className="px-6 py-4 text-center">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {groupData?.map((group, index) => (
            <tr key={index} className="border-b border-secondary-color hover:bg-secondary-color/10">
              <th scope="row" className="px-6 py-4 text-center">
                {index + 1}
              </th>
              <th scope="row" className="px-6 py-4 text-center">
                {group.cycle.name}
              </th>
              <th scope="row" className="px-6 py-4 text-center">
                {group.groupName}
              </th>
              <th scope="row" className="px-6 py-4 text-center">
                {group.date}
              </th>
              <th scope="row" className="px-6 py-4 text-center">
                <button onClick={() => openModal(group)} className='text-primary-color underline'>
                  <p className='hover:scale-125 duration-300 font-mono text-lg'>Ver</p>
                </button>
              </th>
              <th scope="row" className="px-6 py-4 text-center">
              <button onClick={() => {
                if (group.id !== undefined) {
                  console.log("ID del grupo seleccionado para eliminar:", group.id);
                  setSelectedCycleId(group.id);
                  setConfirmationModalOpen(true);
                } else {
                  console.error("ID del grupo es undefined:", group);
                }
              }}>
                <RiDeleteBin5Line className="text-2xl text-error hover:scale-125 duration-200 cursor-pointer" />
              </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedGroup && (
        <ModalTable open={showModal} onClose={closeModal}>
          <div className="overflow-x-auto mt-5 mb-5 bg-error/15 rounded-2xl">
          <div className='flex justify-center px-4 gap-96'>
            <div>
              <p className='text-sm font-mono text-primary-color'>Grupo: <span className='text-lg text-error'>{selectedGroup.groupName}</span></p>
            </div>
            <div className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    id={`simpleSwitch-`}
                    className="hidden"
                    checked={selectAllChecked}
                    onChange={() => handleSelectAll()}
                  />
                  <label htmlFor={`simpleSwitch-`} className={`relative w-10 h-6 transition duration-200 ease-in-out ${
                      selectAllChecked ? 'bg-primary-color' : 'bg-gray-500'
                    } rounded-full cursor-pointer`}>
                    <span className={`block absolute left-1 top-1 w-4 h-4 transition duration-200 ease-in-out ${
                        selectAllChecked ? 'transform translate-x-full bg-white' : 'bg-white'
                      } rounded-full shadow-md`}>
                    </span>
                  </label>
                  <span className="ml-3">{selectAllChecked ? 'Habilitado' : 'Desabilitado'}</span>
                </div>
            <div>
            <p className='text-sm font-mono text-primary-color'>Ciclo: <span className='text-lg text-error'>{selectedGroup.cycle.name}</span></p>
            </div>
          </div>
          <table className="min-w-full text-left text-sm whitespace-nowrap text-gray-600">
        <thead className="uppercase tracking-wider border-b-2 border-secondary-color bg-primary-color/35 border-t">
          <tr>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              #
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Nombres y Apellidos
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color">
              Usuario
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color text-center">
              Rol
            </th>
            <th scope="col" className="px-6 py-4 border-x border-secondary-color text-center">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedGroup.students.map((student, index) => (
            <tr key={index} className="border-b border-secondary-color hover:bg-secondary-color/50">
              <th scope="row" className="px-6 py-4">
                {index + 1}
              </th>
              {student.student && (
                <th scope="row" className="px-6 py-4">
                  {student.student.name}
                </th>
              )}
              {student.student && (
              <th scope="row" className="px-6 py-4">
                {student.student.user}
              </th>
              )}
              {student.student && (
              <th scope="row" className="px-6 py-4 text-center">
                {student.student.role}
              </th>
              )}
              <th scope="row" className="px-6 py-4 text-center gap-5">
                <div className="flex justify-center items-center">
                  {student && student.student && (
                    <input
                      type="checkbox"
                      id={`simpleSwitch-${student.student.id}`}
                      className="hidden"
                      checked={student.isChecked}
                      onChange={() => toggleSwitch(student.student.id)}
                    />
                  )}
                  {student.student && (
                  <label htmlFor={`simpleSwitch-${student.student.id}`} className={`relative w-10 h-6 transition duration-200 ease-in-out ${student.isChecked ? 'bg-primary-color' : 'bg-gray-500'} rounded-full cursor-pointer`}>
                    <span className={`block absolute left-1 top-1 w-4 h-4 transition duration-200 ease-in-out ${student.isChecked ? 'transform translate-x-full bg-white' : 'bg-white'} rounded-full shadow-md`}></span>
                  </label>
                  )}
                  <span className="ml-3">{student.isChecked ? 'Habilitado' : 'Desabilitado'}</span>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </ModalTable>
      )}
      {confirmationModalOpen && (
        <Modal open={confirmationModalOpen} onClose={closeModal}>
          <div className='border p-5 rounded-lg'>
            <p className='flex justify-center whitespace-pre-wrap text-center text-gray-100 font-mono'>
              ¿Estás seguro de que deseas eliminar este ciclo?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  console.log("ID del grupo a eliminar en modal de confirmación:", selectedCycleId);
                  handleDelete(selectedCycleId)}}
                className="bg-error text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600  font-mono">
                Sí, eliminar
              </button>
              <button
                onClick={closeModal}
                className="bg-primary-color text-gray-100 px-4 py-2 rounded-md hover:bg-cyan-500 font-mono">
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
};

export default Group;