import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import Card from '@/components/share/card'
import { getUserId, getToken } from '@/components/hook/hook'
import tokenConfig, { URL } from '@/components/utils/format/tokenConfig';
import { Group, StudentData } from '../interface/interface';

const Course = () => {

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
        console.log("Data:", response.data);

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

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
    {dataLoading ? (
      <p>Cargando datos...</p>
    ) : (
      studentData && studentData.groups && studentData.groups.length > 0 ? (
        studentData.groups.map((group: Group, groupIndex: number) => {
          console.log("Group", group);
          const groupName = group.group && group.group.groupName ? group.group.groupName : '';
          console.log("groupName", groupName);
          const link = group.group && group.group.link ? group.group.link : '';
          console.log("link", link);
          const cycleName = group.group && group.group.cycle ? group.group.cycle.name : '';
          console.log("cycle", cycleName);

          const courseLink = {
            text: 'Ver curso',
            url: link
          };

          return (
            <Card
                key={groupIndex}
                imageUrl='/image/sociales.png'
                title={groupName}
                link={courseLink}
                date='2017-05-02'
                duration='15 días'
                groupName={groupName}
                cycleName={cycleName}
                creatorName='Jules Newton'
              />
          );
        })
      ) : (
        <p>No se encontraron grupos para mostrar.</p>
      )
    )}
  </div>
  )
}
export default Course;