import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouteData } from "../hook/hook";
import tokenConfig, { URL } from "../utils/format/tokenConfig";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";
import { CycleData } from "../interface/interface";
import Modal from "../share/Modal";
import Student from "../student/Index";

const Cycle: React.FC = () => {
  const [cycleData, setCycleData] = useState<CycleData[]>();
  const [dataLoading, setDataLoading] = useState(false);
  const { register, handleSubmit } = useForm<CycleData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredModal, setRegisteredModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCycleId, setSelectedCycleId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showStudent, setShowStudent] = useState(false);

  const token = useRouteData();
  const validToken = typeof token === "string" ? token : "";

  const createCycle: SubmitHandler<CycleData> = async (data) => {
    try {
      setIsLoading(true);
      const url = `${URL()}/cycle`;
      const response = await axios.post(url, data, tokenConfig(validToken));
      const createdUserId = response.data.id;
      setRegisteredModal(true);
    } catch (error) {
      console.error("Error al agregar un nuevo usuario:", error);
      setError(
        "Hubo un error al registrar un ciclo. Por favor, intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getCycles = useCallback(async () => {
    try {
      const url = `${URL()}/cycles`;
      const response = await axios.get(url, tokenConfig(validToken));
      setCycleData(response.data);
    } catch (error: any) {
      if (error && typeof error === "object" && "response" in error) {
      } else if (error instanceof Error) {
        console.log("Error desconocido", error.message);
      } else {
        console.log("Error:", error);
      }
    }
  }, [validToken, setCycleData, setDataLoading]);

  const handleDelete = async (id: number) => {
    try {
      if (id !== null) {
        await axios.delete(`${URL()}/cycle/${id}`, tokenConfig(validToken));
        setConfirmationModalOpen(true); // Llamamos a la función de éxito de eliminación
        getCycles();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    } finally {
        setConfirmationModalOpen(false);
    }
  };

  const openModal = () => {
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setRegisteredModal(false);
    setConfirmationModalOpen(false);
    setShowStudent(false);
  };

  const openTableModal = () => {
    setShowTableModal(true);
    getCycles();
  };

  const closeTableModal = () => {
    setShowTableModal(false);
  };

  const handleInsertExcelClick = () => {
    setShowStudent(true);
  };

  return (
    <section>
      <div className="flex justify-between">
        <button
          onClick={openModal}
          className="w-auto uppercase text-sm font-bold sm:w-auto bg-secondary-color text-white rounded-lg px-4 py-2 hover:bg-primary-color">
          Registar un ciclo
        </button>
        <button
          onClick={openTableModal}
          className="w-auto uppercase text-sm font-bold sm:w-auto bg-secondary-color text-white rounded-lg px-4 py-2 hover:bg-primary-color">
          Lista de ciclos
        </button>
      <button
        className="w-auto uppercase text-sm font-bold sm:w-auto bg-secondary-color text-white rounded-lg px-4 py-2 hover:bg-primary-color"
        onClick={handleInsertExcelClick}
      >
        Insertar Excel
      </button>

      {showStudent && <Student show={showStudent} onClose={closeModal} />}
      </div>
      <Modal open={showForm} onClose={closeModal}>
        <div className="mt-3 mb-3 px-4">
          <form
            onSubmit={handleSubmit(createCycle)}
            className="grid grid-cols-2 uppercase text-gray-500 font-bold md:grid-cols-2 gap-2">
            <div className="mb-4 text-sm col-span-full  w-full">
              <label className="text-gray-100">Nombre del ciclo:</label>
              <input
                {...register("name", { required: true })}
                className="border rounded-lg p-2 w-full"/>
            </div>
            <div className="col-span-full flex justify-center">
              <button
                type="submit"
                className="w-auto uppercase text-sm font-bold sm:w-auto bg-primary-color text-white rounded-lg px-4 py-2 hover:scale-125 duration-300">
                Registrar
              </button>
            </div>
          </form>
          {registeredModal && (
            <Modal open={registeredModal} onClose={closeModal}>
              <div className="font-bold border-2 text-md text-center p-4 rounded-xl text-gray-100">
                Ciclo registrado correctamente.
              </div>
            </Modal>
          )}
          {error && (
            <Modal open={true} onClose={() => setError(null)}>
              <div className="font-bold border text-center text-sm p-4 rounded-xl text-secondary-error">
                {error}
              </div>
            </Modal>
          )}
        </div>
      </Modal>
      <Modal open={showTableModal} onClose={closeTableModal}>
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
                <th
                  scope="col"
                  className="px-6 py-4 border-x border-secondary-color">
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-x border-secondary-color">
                  Nombre del ciclo
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-x border-secondary-color">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody>
              {cycleData?.map((cycle, index) => (
                <tr key={cycle.id} className="border-b hover:bg-primary-color/35">
                  <th scope="row" className="px-6 py-4">
                    {index + 1}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    {cycle.name}
                  </th>
                  <th scope="row" className="px-6 py-4">
                    <button onClick={() => {setSelectedCycleId(cycle.id); setConfirmationModalOpen(true)}}>
                      <RiDeleteBin5Line className="text-2xl text-error hover:scale-125 duration-200 cursor-pointer" />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
      {confirmationModalOpen && (
        <Modal open={confirmationModalOpen} onClose={closeModal}>
          <div className='border p-5 rounded-lg'>
            <p className='flex justify-center whitespace-pre-wrap text-center text-gray-100 font-mono'>
              ¿Estás seguro de que deseas eliminar este ciclo?
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleDelete(selectedCycleId!)}
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
    </section>
  );
};

export default Cycle;
