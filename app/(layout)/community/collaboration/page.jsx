import { DeleteButton } from "@/app/components/deleteButton";
import { DeleteConfirmation } from "@/app/components/deleteButton";
import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/ClipLoader";
import { FaRegUser } from "react-icons/fa";
import { MdPhoneCallback } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { FcCollaboration } from "react-icons/fc";

const CommunityCollaboration = () => {

  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [api,setApi]=useState('');
  const [deleteConfirmation,setDeleteConfirmation]=useState(false);
  const [trigger,setTrigger]=useState('')

  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://l6qi6kuo7c.execute-api.ap-south-1.amazonaws.com/dev/collaboration_request"
        );
        const data = await response.json();
        setContactUsRequest(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
    setTrigger("");
  }, [trigger]);

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
              No Collaboration Request Available
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {contactUsRequests.map((val, index) => (
                <div
                  key={index}
                  className="border p-4 bg-dark bg-opacity-[10%] rounded-lg"
                >
                  <div className="w-full flex justify-end items-end">
                    <div
                      className=" w-[5%] h-[5%]"
                      onClick={() => {
                        setApi(
                          `https://l6qi6kuo7c.execute-api.ap-south-1.amazonaws.com/dev/collaboration_request/${val.email}`
                        );
                        console.log("deleteee");
                        setDeleteConfirmation(true);
                      }}
                    >
                      <DeleteButton />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegUser />
                    {val.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPhoneCallback />
                    {val.phoneNumber}
                  </div>
                  <div className="flex items-center gap-2">
                    <TfiEmail />
                    {val.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <FcCollaboration />
                    {val.collaborationType}
                  </div>
                </div>
              ))}
            </div>
          )}

          {deleteConfirmation === true &&<DeleteConfirmation api={api} setDeleteConfirmation={setDeleteConfirmation} setTrigger={setTrigger}/>}
        </div>
      )}
    </div>
  );
};

export default CommunityCollaboration;
