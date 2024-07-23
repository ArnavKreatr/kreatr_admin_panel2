"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogDetail = () => {
  const param = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const fatchData = async () => {
      const response = await fetch(
        `https://mik4tx7ct3.execute-api.ap-south-1.amazonaws.com/dev/blogs/${param.id}`
      );
      const data = await response.json();
      setData(data.resData);
      console.log(data.resData);
    };
    fatchData();
  }, []);
  return (
    <div className="bg-light w-full min-h-full flex justify-center items-center">
      <div className=" w-[40%]">
        <div className="firstImage">
          <img src={data.coverImg} alt="coverImg" />
        </div>
        <div className="blogHeading">{data.heading}</div>
        <div className="flex">
          <div>{data.date}</div>
          <div>{data.writer}</div>
        </div>

        <div>
          
          {data .blogDetails!== undefined &&
            data.blogDetails.map((val, index) =>
              val.tagType !== "images" ? (
                <div key={index} className={`${val.class}`}>
                  {val.value}
                </div>
              ) : (
                <img key={index} className={`${val.class}`} src={val.value} alt="imggg" />
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
