'use client'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiCategory } from 'react-icons/bi';
import { GrLocation } from "react-icons/gr";
import { IoMdLink } from "react-icons/io";



const CareerDetail = () => {

    const params = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`https://pcfja54uwi.execute-api.ap-south-1.amazonaws.com/dev/career/${params.id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result.data);
            setData(result.data); // Assuming result.data contains the actual data
            // setImages(result.data.images || []); // Set images to result.data.images or an empty array if undefined
            // setTestimonial(result.data.testimonials ||[]);
            // setFormInfo(result.data.formInfo ||[]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        
        getData();
      }, [params.id]);

  return (
    <div className='w-full min-h-full bg-light text-dark p-10'>
    <div className='border p-4 bg-dark bg-opacity-[10%] rounded-lg w-[30%] h-[30%] '>
        <div className='text-[2rem] font-bold w-full'>{data.title}</div>
        <div className='whitespace-pre-line rounded-lg p-2 mt-2 font-semibold'>Job Description</div>
        <div className='rounded-lg p-2 mt-1'>{data.description}</div>
        <div className='flex items-center gap-2 mt-2 rounded-lg p-2'><GrLocation className='text-gray-800'/>{data.location}</div>
        <div className='rounded-lg p-2 mt-2 font-semibold'>Qualifications</div>
        <div className='rounded-lg p-2 mt-2'>{data.qualifications}</div>
        <div className='rounded-lg p-2 mt-2 font-semibold'>Responsibilities</div>
        <div className='rounded-lg p-2 mt-2'>{data.responsibilities}</div>
        <div className='rounded-lg p-2 mt-2 flex items-center gap-2'><BiCategory />{data.type}</div>
        <div className='rounded-lg p-2 mt-2 flex items-center gap-2 overflow-hidden'>{data.url}</div>
    </div>
    </div>
  )
}

export default CareerDetail