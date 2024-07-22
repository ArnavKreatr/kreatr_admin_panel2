"use client";
import React, { useEffect, useState } from "react";
import NewAdmin from "./newAdmin";
import PacmanLoader from "react-spinners/ClipLoader";
import { DeleteConfirmation } from "../../components/deleteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const CommunitySettings = () => {
  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [id, setId] = useState("");
  const [createdAt, setCreatedAt] = useState(0);
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [trigger,setTrigger] = useState('')
  const [permission, setPermission] = useState({
    blogs: false,
    careers: false,
    events: false,
    collaboration_request: false,
    contactUs: false,
    ReportABug: false,
  });

  useEffect(() => {
    console.log('trigger',trigger);
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://u6ul0pgf3i.execute-api.ap-south-1.amazonaws.com/dev/admin_permission/"
        );
        const data = await response.json();
        setContactUsRequest(data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
    setTrigger('');
  }, [trigger]);

  const [isAddAdmin, setIsAddAdmin] = useState(false);
  return (
    <div className="w-[100vw] h-[100vh] relative">
      <div>Admins</div>
      {isLoading === true ? (
        <div className="h-full w-full justify-center items-center">
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
          <div className="grid grid-cols-2 gap-4">
            {contactUsRequests.length === 0 ? (
              <div className=" h-full w-full flex justify-center items-center">
                {" "}
                No Admin Available
              </div>
            ) : (
              contactUsRequests.map((val, index) => (
                <div
                  key={index}
                  className="border p-4 bg-dark bg-opacity-[10%]"
                >
                  <div className="w-full flex justify-end items-center gap-4">
                    <div
                      className=" w-[5%] h-[5%]"
                      onClick={() => {
                        setPassword(val.password);
                        setPhoneNo(val.phoneNo);
                        setPermission(val.permission);
                        setId(val.id);
                        setCreatedAt(val.createdAt);
                        setIsAddAdmin(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="w-full h-full cursor-pointer"
                      />
                    </div>
                    <div
                      className=" w-[5%] h-[5%]"
                      onClick={() => {
                        setId(val.id);
                        setCreatedAt(val.createdAt);
                        setDeleteConfirmation(true);
                        
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="h-full w-full cursor-pointer"
                      />
                    </div>
                  </div>
                  <div>Phone Number:- {val.phoneNo}</div>
                  <div>Password:- {val.password}</div>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["blogs"]}
                      className="mr-2"
                    />
                    Blogs
                  </label>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["careers"]}
                      className="mr-2"
                    />
                    Careers
                  </label>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["events"]}
                      className="mr-2"
                    />
                    Events
                  </label>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["collaboration_request"]}
                      className="mr-2"
                    />
                    Collaboration Request
                  </label>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["contactUs"]}
                      className="mr-2"
                    />
                    Contact Us
                  </label>
                  <label className="block mb-2 w-fit ">
                    <input
                      type="checkbox"
                      value="Option 1"
                      checked={val.permission["ReportABug"]}
                      className="mr-2"
                    />
                    Report A Bug
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <div
        className=" rounded-[50%] shadow-md shadow-black w-[5vw] h-[5vw] fixed right-0 bottom-0 m-6 flex justify-center items-center text-light bg-dark text-center text-[3.125rem] cursor-pointer"
        onClick={() => {
          setIsAddAdmin(true);
        }}
      >
        +
      </div>
      {isAddAdmin === true && <NewAdmin setIsAddAdmin={setIsAddAdmin} editPassword={password} editPermission={permission} editPhoneNo={phoneNo} id={id} createdAt={createdAt} setTrigger={setTrigger}/>}
      {deleteConfirmation === true && (
        <DeleteConfirmation
          setDeleteConfirmation={setDeleteConfirmation}
          setTrigger={setTrigger}
          api={`https://u6ul0pgf3i.execute-api.ap-south-1.amazonaws.com/dev/admin_permission/${id}/${createdAt}`}
        />
      )}
    </div>
  );
};

export default CommunitySettings;
