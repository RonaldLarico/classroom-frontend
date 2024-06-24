// components/CreateStudentForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import tokenConfig, { URL } from '@/components/utils/format/tokenConfig';
import Modal from '../share/Modal';
import { useRouteData } from '@/components/hook/hook';


type StudentProps = {
  show: boolean;
  onClose: () => void;
};

type StudentFormData = {
  excelFile: FileList;
};

const Student: React.FC<StudentProps> = ({ show, onClose }) => {
  const { register, handleSubmit } = useForm<StudentFormData>();
  const [modalOpen, setModalOpen] = useState(false);
  const [insertionSuccess, setInsertionSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const token = useRouteData() as string;
  const validToken: string = token || '';

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('excelFile', data.excelFile[0]);
      const response = await axios.post(`${URL()}/student/register`, formData, tokenConfig(validToken));
      if (response.status === 201) {
        setInsertionSuccess(true);
        setModalOpen(true);
        setErrorMessage(''); // Limpiar cualquier mensaje de error previo
      } else {
        setInsertionSuccess(false);
        setErrorMessage('Error al procesar solicitud');
      }
    } catch (error) {
      console.error('Error al crear estudiantes:', error);
      setErrorMessage('Error al procesar el archivo')
    }
  };
  const closeModal = () => {
    setInsertionSuccess(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal open={show} onClose={closeModal}>
      <div className="max-w-screen-lg mx-auto border p-4 rounded-xl">
        <h1 className='text-sm text-center font-bold bg-[#006eb0] text-gray-200 border p-2 rounded-lg mb-4 uppercase'>
          Agregar estudiantes desde Excel
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="grid grid-cols-2 uppercase text-gray-600 md:grid-cols-2 gap-2">
          <div className="mb-4 text-xs col-span-full md:col-span-2">
            <label className="block font-bold">Archivo Excel: </label>
            <input {...register('excelFile')} type="file" accept=".xls, .xlsx, .xlsm" className="border rounded-lg p-3 w-full" />
          </div>
          <div className="col-span-full flex justify-center">
            <button
              type="submit"
              className="w-auto uppercase text-sm font-bold sm:w-auto bg-[#006eb0] text-white rounded-lg px-4 py-2 hover:bg-blue-700">
              Agregar
            </button>
          </div>
        </form>
        {insertionSuccess && (
          <Modal open={true} onClose={closeModal}>
            <div className='font-bold border-2 border-error p-3 rounded-xl text-[#006eb0]'>
              <p className='flex justify-center'>Inserción exitosa.</p>
            </div>
          </Modal>
        )}
        {errorMessage && (
          <Modal open={true} onClose={() => setErrorMessage('')}>
            <div className='font-bold border p-3 rounded-xl text-error'>
              <p className='flex justify-center'>{errorMessage}</p>
            </div>
          </Modal>
        )}
      </div>
    </Modal>
  );
};

export default Student;