import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineDateRange, MdOutlineDatasetLinked } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";

interface LinkObject {
  text: string;
  url: string;
}


interface CardProps {
  imageUrl: string;
  title: string | string[];
  link: { text: string; url: string } | { text: string; url: string }[];
  date: string;
  duration: string;
  groupName: string | string[];
  cycleName?: string | string[];
  creatorName: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  link,
  date,
  duration,
  groupName,
  cycleName,
  creatorName,
}) => {

  const renderArray = (array: string | string[] | undefined) => {
    if (Array.isArray(array)) {
      return array.map((item, index) => (
        <p key={index} className='text-gray-400' >{item}</p>
      ));
    } else {
      return <p className='text-gray-400'>{array}</p>;
    }
  };

  const handleClick = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const renderLinks = (linkObject: LinkObject | LinkObject[]) => {
    if (Array.isArray(linkObject)) {
      return linkObject.map((link, index) => (
        <a key={index} href={link.url} className='text-blue-500 hover:underline cursor-pointer' target='_blank' rel='noopener noreferrer'>
          {link.text}
        </a>
      ));
    } else {
      return (
        <a href={linkObject.url} className='text-blue-500 hover:underline cursor-pointer' onClick={() =>handleClick(linkObject.url)} target='_blank' rel='noopener noreferrer'>
          {linkObject.text}
        </a>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[500px] w-[300px] bg-[#065787] mx-auto rounded-xl overflow-hidden"
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        src={imageUrl}
        alt="Course Image"
        className="w-[278px] h-[230px] ml-[11.5px] absolute mt-[11.5px] rounded-xl"
      />
      <div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='text-white font-bold ml-5 text-[15px] pt-[250px]'
        >
          {Array.isArray(title) ? title.join(', ') : title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className='text-gray-400 px-5'
        >
          {renderLinks(link)}
        </motion.p>
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
            <MdOutlineDateRange className='ml-5 mt-4 text-2xl' />
            <p className='font-semibold text-sm text-[#10E9E7] mt-[18px] ml-1'>{date}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center'
          >
            <MdOutlineDatasetLinked className='ml-5 text-2xl' />
            <p className='ml-1 text-sm text-gray-400'>{duration}</p>
          </motion.div>
        </div>
        <div className='items-center'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex'
          >
            <MdOutlineDateRange className='mt-4 text-2xl' />
            <p className='font-semibold text-sm text-[#10E9E7] mt-[18px] ml-1'>
              {renderArray(groupName)}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center'
          >
            <MdOutlineDatasetLinked className='text-2xl' />
            <p className='text-sm text-gray-400 ml-1'>
              {renderArray(cycleName)}
            </p>
          </motion.div>
        </div>
      </motion.div>
      <motion.hr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className='w-[90%] mx-auto bg-zinc-300'
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className='flex'
      >
        <CgProfile className='w-[40px] h-[40px] border-solid rounded-full mt-[10px] ml-5 text-gray-200' />
        <p className='mt-[13px] ml-2 text-gray-400'>Creation Of <span className='text-white'>{creatorName}</span></p>
      </motion.div>
    </motion.div>
  );
};

export default Card;
