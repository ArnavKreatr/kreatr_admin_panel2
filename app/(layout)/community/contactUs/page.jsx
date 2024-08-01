'use client'
import { DeleteButton } from "@/app/components/deleteButton";
import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/ClipLoader";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneCallback } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { FcCollaboration } from "react-icons/fc";

const CommunityContactUs = ({ setDeleteConfirmation, setApi }) => {
  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://7kmtq0boqc.execute-api.ap-south-1.amazonaws.com/dev/contactUs"
        );
        const data = await response.json();
        setContactUsRequest(data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
  }, []);

  return (
    <div className=" w-full h-full">
      {isLoading === true ? (
        <div className="h-full w-full flex justify-center items-center">
          <PacmanLoader
            color={"#373737"}
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className=" h-full w-full p-6">
        {contactUsRequests.length === 0 ? (
              <div className=" h-full w-full flex justify-center items-center">
                {" "}
                No Contact Us Request Available
              </div>
            ) :(
              <div className="grid grid-cols-2 gap-4">
              {  contactUsRequests.map((val, index) => (
                <div key={index}className="border  p-4 bg-dark bg-opacity-[10%]">
                  <div className="w-full flex justify-end items-end">
                    <div
                      className=" w-[5%] h-[5%]"
                      onClick={() => {
                        setApi(
                          `https://7kmtq0boqc.execute-api.ap-south-1.amazonaws.com/dev/contactUs/${val.id}`
                        );
                        setDeleteConfirmation(true);
                      }}
                    >
                      <DeleteButton
                        setApi={setApi}
                        setDeleteConfirmation={setDeleteConfirmation}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2"><FaRegUser />{val.name}</div>
                  <div className="flex items-center gap-2"><MdPhoneCallback/>{val.phoneNumber}</div>
                  <div className="flex items-center gap-2"><TfiEmail/>{val.senderemail}</div>
                  <div className="flex items-center gap-2"><FcCollaboration/>{val.message}</div>
                </div>
              ))
}
             </div>
            )}
        </div>
      )}
    </div>
  );
};

export default CommunityContactUs;
