
"use client";
import { FaRegAddressBook } from "react-icons/fa6";
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteData } from '@/components/hook/hook';
import tokenConfig, { URL } from '@/components/utils/format/tokenConfig';
import { Admin } from '@/components/interface/interface';
import UserRegister from '@/components/routes/user/userRegister';
import UserDelete from '@/components/routes/user/userDelete';

const User = () => {
  const [userData, setUserData] = useState<Admin[]>();
  const [dataLoading, setDataLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const token = useRouteData();

  const validToken = typeof token === "string" ? token : '';

  const onSubmit = useCallback( async () => {
    try {
      const url = `${URL()}/admin`;
      const response = await axios.get(url, tokenConfig(validToken));
      setUserData(response.data);
      setDataLoading(true);
    } catch (error: any) {
      if (error && typeof error === 'object' && 'response' in error) {
      } else if (error instanceof Error) {
        console.error("Error desconocido", error.message);
      } else {
        console.error("Error:", error);
      }
    }
  }, [validToken, setUserData, setDataLoading]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  //CreateUser
  const handleRegisterSuccess = async (createdUserId: number) => {
    try {
      const url = `${URL()}/users`;
      const response = await axios.get(url, tokenConfig(validToken));
      setUserData(response.data);
      setDataLoading(true);
    } catch (error) {
      console.error('Error al obtener la lista de usuarios después de crear uno nuevo:', error);
    }
  }
  const handleCloseCreateForm = () => {
    onSubmit();
    setModalOpen(false);
  };
  const handleOpenCreateForm = () => {
    setModalOpen(true);
  };

  //DeleteUser
  const handleDeleteSuccess = () => {
    onSubmit();
  };

  return (
      <section id="user">
        <div className='flex justify-center mt-5 mb-8'>
        <p className="uppercase border rounded-2xl shadow-2xl text-center text-xl font-bold text-gray-500 p-4">
          Registro de Administradores</p>
        </div>
        <div className='flex'>
          <button
            type="button"
            className="text-primary-color uppercase hover:text-white border-2 border-primary-color hover:bg-primary-color focus:ring-4 focus:outline-none font-semibold rounded-lg text-xs px-3 py-2 text-center me-2 inline-flex items-center"
            onClick={handleOpenCreateForm}>
              <FaRegAddressBook className='mr-1 text-lg' />
              Registrar
          </button>
        </div>
        {modalOpen && (
        <UserRegister onCreateSuccess={handleRegisterSuccess} onCloseModal={handleCloseCreateForm} />
        )}
        {dataLoading && userData && (
          <div className="overflow-x-auto bg-white p-2 mt- shadow-2xl">
            <table className="w-full text-sm text-center rtl:text-right text-gray-400">
              <thead className="text-xs text-gray-500 uppercase bg-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rol
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index} className="bg-white text-gray-400 font-semibold border-b hover:bg-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      {userData.length - index}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                      {user.user}
                    </th>
                    <td className="px-6 py-4">
                      {user.name}
                    </td>
                    <td className="px-6 py-4">
                      {user.role}
                    </td>
                    <td>
                      <div className='px-6 py-4 flex justify-center gap-5'>
                          <div key={user.id}>
                            <UserDelete userId={user.id}
                              onDeleteSuccess={handleDeleteSuccess}
                            />
                          </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
  )
}

export default User;