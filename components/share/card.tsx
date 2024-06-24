import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineDateRange, MdOutlineDatasetLinked } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import Modal from './Modal';
import ModalTable from './ModalTable';
import Image from 'next/image';

interface LinkObject {
  text: string;
  url: string;
}

interface CardProps {
  imageUrl: string;
  title: string | string[];
  link: { text: string; url: string } | { text: string; url: string }[];
  date: string  | string[];
  cycleName?: string | string[];
  creatorName: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  link,
  date,
  cycleName,
  creatorName,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkObject | null>(null);

  const openModal = (link: LinkObject) => {
    setSelectedLink(link)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedLink(null);
    setIsModalOpen(false);
  };

  const renderArray = (array: string | string[] | undefined) => {
    if (Array.isArray(array)) {
      return array.map((item, index) => (
        <p key={index}>{item}</p>
      ));
    } else {
      return <p className='text-gray-700 font-mono'>{array}</p>;
    }
  };

  const renderDates = (dates: string | string[] | undefined) => {
    if (Array.isArray(dates)) {
      return dates.map((date, index) => (
        <p key={index} className='text-gray-700 font-mono'>{date}</p>
      ));
    } else {
      return <p className='text-gray-700 font-mono'>{dates}</p>;
    }
  };

  const openExternalContent = (url: string) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes');
    if (newWindow) {
      newWindow.document.body.innerHTML = `
        <html>
          <head>
            <title>External Content</title>
          </head>
          <body style="margin: 0; padding: 0; overflow: hidden;">
            <iframe src="${url}" sandbox="allow-same-origin allow-scripts" style="border: none; width: 100%; height: 100vh;"></iframe>
          </body>
        </html>
      `;
    }
  };

  const renderLinks = (linkObject: LinkObject | LinkObject[]) => {
    if (Array.isArray(linkObject)) {
      return linkObject.map((link, index) => (
        <a key={index} href='#' className='underline'>
          <button onClick={() => openExternalContent(link.url)}>{link.text}</button>
        </a>
      ));
    } else {
      return (
        <a href='#' className='text-[#374BF6] font-mono cursor-pointer'>
          <button onClick={() => openExternalContent(linkObject.url)} className='underline underline-offset-2 hover:scale-110 duration-300'>
            {linkObject.text}
          </button>
        </a>
      );
    }
  };
  console.log("linkkkkkkkkkkkkkkkkkkkkkkkkkk:", selectedLink);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[400px] w-[300px] mb-10 bg-gray-100 shadow-xl shadow-gray-500 mx-auto rounded-xl overflow-hidden"
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        src={imageUrl}
        alt="Course Image"
        className="w-[278px] h-[230px] ml-[11.5px] absolute mt-[11.5px] rounded-xl"
      />
      <div className='grid grid-cols-2'>
        <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='text-error font-bold ml-5 text-[20px] pt-[250px] font-mono'
        >
          {Array.isArray(title) ? title.join(', ') : title}
        </motion.p>
        </div>
        <div className=''>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='pt-[250px] text-[15px] underline ml-10'
        >
          {renderLinks(link)}
        </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="grid grid-cols-2"
      >
        <div className='items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex'
          >
            <MdOutlineDateRange className='ml-4 mt-4 text-2xl text-yellow-500' />
            <p className='font-semibold text-sm text-gray-700 mt-[18px] ml-1 font-mono'>
            {renderDates(date)}
            </p>
          </motion.div>
        </div>
        <div className='items-center'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center text-yellow-500 ml-5'
          >
            <MdOutlineDatasetLinked className='text-2xl mt-4' />
            <p className='text-sm ml-1 mt-[18px]'>
              {renderArray(cycleName)}
            </p>
          </motion.div>
        </div>
      </motion.div>
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className='w-[90%] mx-auto text-red-600'
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className='flex justify-center mt-3'
      >
          <Image src="/Image/logo_cokito.png" alt="Cokito" width={800} height={800} className="h-12 w-40"/>
      </motion.div>
      {/* Modal para mostrar el iframe */}
      <ModalTable open={isModalOpen} onClose={closeModal}>
        {selectedLink && (
          <iframe
          title="Curso"
          src={selectedLink.url}
          width="100%"
          height="700px"
          frameBorder="0"
          allowFullScreen
          />
        )}
      </ModalTable>
    </motion.div>
  );
};

export default Card;
