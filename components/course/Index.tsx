import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/share/card'
import { getUserId, getToken } from '@/components/hook/hook'
import tokenConfig, { URL } from '@/components/utils/format/tokenConfig';
import { Group, StudentData } from '../interface/interface';

const Course = () => {

  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [encryptedLinks, setEncryptedLinks] = useState<string[]>([]);

  const token = getToken();
  const validToken = typeof token === "string" ? token : '';
  const userId = getUserId(token)

  useEffect (() => {
  const onSubmit = async () => {
    if (!validToken || !userId) return;
    try {
      const id = userId;
        const url = `${URL()}/student/${id}`;
        const response = await axios.get(url, tokenConfig(validToken));
        setStudentData(response.data);
    } catch (error: any) {
      if (error && typeof error === 'object' && 'response' in error) {
        console.error(error.response.data);
      } else if (error instanceof Error) {
        console.error("Error desconocido", error.message);
      } else {
        console.error("Error:", error);
      }
    } finally {
      setDataLoading(false)
    }
  }
  if (validToken) {
  onSubmit();
  }
}, [validToken, userId]);

useEffect(() => {
  if (studentData && studentData.groups && studentData.groups.length > 0) {
    const encryptedLinksArray = studentData.groups.map((group: Group) => {
      const originalLink = group.group && group.group.link ? group.group.link : '';
      const encryptedLink = btoa(originalLink); // Codificar en base64
      return encryptedLink;
    });

    setEncryptedLinks(encryptedLinksArray);
  }
}, [studentData]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
    {dataLoading ? (
      <p>Cargando datos...</p>
    ) : (
      studentData && studentData.groups && studentData.groups.length > 0 ? (
        studentData.groups.map((group: Group, groupIndex: number) => {
          const groupName = group.group && group.group.groupName ? group.group.groupName : '';
          const date = group.group && group.group.date ? group.group.date : '';
          const link = group.group && group.group.link ? group.group.link : '';
          const cycleName = group.group && group.group.cycle ? group.group.cycle.name : '';
          const encryptedLink = encryptedLinks[groupIndex] || '';
          const courseLink = {
            text: 'Ver curso...',
            url: link
          };

          return (
            <Card
                key={groupIndex}
                imageUrl='/image/ciencias.jpg'
                title={groupName}
                link={courseLink}
                date={date}
                cycleName={cycleName}
                creatorName=''
              />
          );
        })
      ) : (
        <p>No se encontraron cursos para mostrar.</p>
      )
    )}
  </div>
  )
}
export default Course;