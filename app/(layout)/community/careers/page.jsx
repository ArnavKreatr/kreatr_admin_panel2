import { DeleteConfirmation } from "@/app/components/deleteButton";
import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { GrLocation } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import CareersForm from "./careersForm";
import Link from "next/link";

const CommunityCareers = () => {
  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [api, setApi] = useState("");
  const [addEventsBtnHandler, setAddEventsBtnHandler] = useState(false);
  const [globalIndex, setGlobalIndex] = useState(-1);
  const [trigger,setTrigger]=useState('')
  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://pcfja54uwi.execute-api.ap-south-1.amazonaws.com/dev/career"
        );
        const data = await response.json();
        setContactUsRequest(data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
    setTrigger('')
  }, [trigger]);

  const handleEditClick = (e, index) => {
    e.stopPropagation();
    setAddEventsBtnHandler(true);
    setGlobalIndex(index);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setApi(
      `https://pcfja54uwi.execute-api.ap-south-1.amazonaws.com/dev/career/${id}`
    );
    setDeleteConfirmation(true);
  };

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
              No Career Available
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {contactUsRequests.map((val, index) => (
                <div key={index} >
                  <div
                    key={index}
                    className="border p-4 bg-dark bg-opacity-[10%] rounded-lg"
                  >
                    <div className="w-full h-[3%] flex justify-end items-end gap-4">
                      <div
                        className="w-[5%] h-full flex items-center cursor-pointer "
                        onClick={(e) => {e.stopPropagation(); handleEditClick(e, index)}}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="w-full h-full text-gray-500"
                        />
                      </div>
                      <div
                        className=" w-[5%] "
                        onClick={(e) => {e.stopPropagation(); handleDeleteClick(e, val.id)}}
                      >
                        <div className="h-full w-full flex items-center cursor-pointer pointer-events-auto">
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="h-full w-full text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-[1.5rem]">{val.title}</div>
                    <div className="flex items-center gap-2">
                      <BiCategory />
                      {val.type}
                    </div>
                    <div className="flex items-center gap-2">
                      <GrLocation />
                      {val.location}
                    </div>
                    <Link key={index} href={`/community/careers/${val.id}`}>
                    <div className="w-full flex justify-end items-end">
                      <FontAwesomeIcon icon={faArrowRight} className="" />
                    </div>
                  </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className=" rounded-[50%] shadow-md shadow-black w-[5vw] h-[5vw] fixed right-0 bottom-0 m-6 flex justify-center items-center text-light bg-dark text-center text-[3.125rem] cursor-pointer"
        onClick={() => {
          setAddEventsBtnHandler(true);
        }}
      >
        +
      </div>
      {addEventsBtnHandler === true && (
        <CareersForm
          oldDescription={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].description
              : ""
          }
          oldLocation={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].location
              : ""
          }
          oldQualifications={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].qualifications
              : ""
          }
          oldResponsibilities={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].responsibilities
              : ""
          }
          oldTitle={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].title
              : ""
          }
          oldType={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].type
              : ""
          }
          oldUrl={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].url
              : ""
          }
          setAddEventsBtnHandler={setAddEventsBtnHandler}
          setGlobalIndex={setGlobalIndex}
          id={
            contactUsRequests[globalIndex] !== undefined
              ? contactUsRequests[globalIndex].id
              : ""
          }
        />
      )}
      {deleteConfirmation === true && (
        <DeleteConfirmation
          api={api}
          setDeleteConfirmation={setDeleteConfirmation}
          setTrigger={setTrigger}
        />
      )}
    </div>
  );
};

export default CommunityCareers;
