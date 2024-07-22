"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdPhoneCallback } from "react-icons/md";

const EventDetails = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [formInfo, setFormInfo] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://erfaz8h6s3.execute-api.ap-south-1.amazonaws.com/dev/eventDetails/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data); // Assuming result.data contains the actual data
        setImages(result.data.images || []); // Set images to result.data.images or an empty array if undefined
        setTestimonial(result.data.testimonials || []);
        setFormInfo(result.data.formInfo || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [params.id]);

  return (
    <div className="w-full text-dark bg-light flex-col pl-48 pr-48 pt-20 pb-20">
      <div className="font-bold text-[2.5rem]">{data.heading}</div>
      <div className="flex gap-6 mt-4 mb-4 font-bold text-[1.1rem]">
        <div className="border rounded-xl border-black w-[10%] flex justify-center items-center">
          {data.sessionType}
        </div>
        <div className="border rounded-xl border-black w-[7%] flex justify-center items-center">
          {data.duration}
        </div>
        <div className="border rounded-xl border-black w-[20%] flex justify-center items-center">
          Speaker:{data.speakerName}
        </div>
      </div>
      <div className="w-[100%] flex justify-center rounded-lg">
        <img src={data.coverImg} alt="Cover Image" className="rounded-lg" />
      </div>
      <div className="flex gap-6 justify-center mt-5 font-extrabold text-[1.5rem]">
        <div>{data.location}</div>|<div>{data.date}</div>|
        <div className="border border-black rounded-xl w-[13%] flex justify-center items-center">
          {data.eventType}
        </div>
        {/* <div>Hover Color: {data.hoverColor}</div> */}
      </div>
      <div className="w-full pt-4 whitespace-pre-line">{data.description}</div>
      <div className="font-bold text-[2.5rem] mt-5">Testimonials</div>
      <div className="grid grid-cols-2 gap-4 pb-4">
        {testimonial.length > 0 &&
          data.testimonials.map((val, index) => (
            <div
              key={index}
              className="bg-white w-full h-full rounded-lg flex flex-col justify-center items-center pl-8 pr-8 pt-20 pb-20 mt-4"
            >
              <div className="pb-4">{val.title}</div>
              <div className="w-full">--{val.person}</div>
            </div>
          ))}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-4 pb-4">
        {images.length > 0 &&
          images.map((val, index) => (
            <div className="w-full border-dark border rounded-xl" key={index}>
              <img src={val} alt={`Image ${index}`} className="rounded-xl" />
            </div>
          ))}
      </div>
      <div>
        {formInfo.length > 0 &&
          formInfo.map((val, index) => (
            <div className="" key={index}>
              <div className="flex items-center gap-2">
                <FaRegUser />
                {val.name}
              </div>
              <div className="flex items-center gap-2">
                <TfiEmail />
                {val.email}
              </div>
              <div className="flex items-center gap-2">
                <MdPhoneCallback />
                {val.phoneNo}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventDetails;
