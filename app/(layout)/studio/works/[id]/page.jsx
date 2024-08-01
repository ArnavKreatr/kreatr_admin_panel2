"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const WorkDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/${id}`
        );
        const data = await response.json();

        console.log(data.data);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="h-[60%] relative">
        <Image layout="fill" src={data.coverImg} alt="image" />
        <div className="absolute bottom-0 p-4 flex gap-4">
        {
            (data.tags !== 0 && data.tags!== undefined) && (data.tags).map((item,index)=>(
                <div className=" border pl-4 pr-4 pt-2 pb-2 rounded-lg bg-light bg-opacity-[50%]" key={index}>
                    {item}
                </div>
            ))
            }
        </div>
      </div>
        <div className="flex gap-2 p-4 w-full justify-center ">
            <div>Location: {data.location}</div>
            <div>Website: {data.websiteLink}</div>
            <div>Industry: {data.industry}</div>
        </div>
        <div className="w-full flex justify-center text-5xl font-bold p-4">
            {data.title}
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 h-full w-full">
            {
            (data.images !== 0 && data.images!== undefined) && (data.images).map((item,index)=>(
                <div className=" h-full relative" key={index}>
                    <Image layout="fill" src={item} alt="images" />
                </div>
            ))
            }
            </div>
            <div className="w-full flex justify-center">copyRightText{data.copyRightText}</div>
        <div className="grid grid-cols-2 gap-4 p-4 h-full w-full">
            {
            (data.suggestions !== 0 && data.suggestions!== undefined) && (data.suggestions).map((item,index)=>(
                <div className=" h-full relative" key={index}>
                    <Image layout="fill" src={item.coverImg} alt="images" />
                    <div className="bottom-0 p-4 absolute bg-light w-full bg-opacity-[50%]">{item.title}</div>
                </div>
            ))
            }
            </div>
    </div>
  );
};

export default WorkDetails;
