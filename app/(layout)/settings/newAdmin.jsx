import React, { useState } from "react";

const NewAdmin = ({
  setIsAddAdmin,
  editPhoneNo,
  editPassword,
  editPermission,
  id,
  createdAt,
  setTrigger
}) => {
  const [phoneNo, setPhoneNo] = useState(editPhoneNo);
  const [password, setPassword] = useState(editPassword);
  const [permission, setPermission] = useState(editPermission);

  const addAdminBtnHandler = async () => {
    console.log(id,createdAt);
    try {
      const body = {
        phoneNo,
        password,
        permission
      };
     
      const url = editPassword !== ''
        ? `https://u6ul0pgf3i.execute-api.ap-south-1.amazonaws.com/dev/admin_permission/${id}/${createdAt}`
        : 'https://u6ul0pgf3i.execute-api.ap-south-1.amazonaws.com/dev/admin_permission/';
  
      const method = editPassword !== '' ? 'PATCH' : 'POST';
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
     
  
      const data = await response.json();
      console.log(data);
      setTrigger('qwedfgvb')
      setIsAddAdmin(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="h-full w-full bg-dark bg-opacity-[90%] absolute z-[1] top-0 left-0 flex justify-center items-center">
      <div className=" bg-light w-[50%] p-4 flex flex-col rounded-lg">
        <div className=" h-[40%] w-full flex flex-col justify-start items-start">
          <input
            type="text"
            placeholder="Username"
            value={phoneNo}
            className="placeholder:text-dark placeholder:text-opacity-[50%] rounded-md p-4 w-[40%] bg-white"
            onChange={(e) => {
              setPhoneNo(e.target.value);
            }}
          />
          <div className=" h-5" />
          <input
            type="text"
            placeholder="Password"
            value={password}
            className=" placeholder:text-dark placeholder:text-opacity-[50%] rounded-md p-4 w-[40%] bg-white"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className=" h-5" />
        </div>

        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["blogs"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                blogs: !prev.blogs,
              }));
            }}
            className="mr-2"
          />
          Blogs
        </label>
        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["careers"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                careers: !prev.careers,
              }));
            }}
            className="mr-2"
          />
          Careers
        </label>
        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["events"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                events: !prev.events,
              }));
            }}
            className="mr-2"
          />
          Events
        </label>
        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["collaboration_request"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                collaboration_request: !prev.collaboration_request,
              }));
            }}
            className="mr-2"
          />
          Collaboration Request
        </label>
        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["contactUs"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                contactUs: !prev.contactUs,
              }));
            }}
            className="mr-2"
          />
          Contact Us
        </label>
        <label className="block mb-2 w-fit cursor-pointer">
          <input
            type="checkbox"
            value="Option 1"
            checked={permission["ReportABug"]}
            onChange={() => {
              setPermission((prev) => ({
                ...prev, // Spread operator to preserve existing properties
                ReportABug: !prev.ReportABug,
              }));
            }}
            className="mr-2"
          />
          Report A Bug
        </label>
        <div className=" w-full flex justify-end gap-4">
          <button
            className="pl-4 pr-4 pt-2 pb-2 border border-dark rounded-lg"
            onClick={() => {
              setIsAddAdmin(false);
              window.location.reload();
            }}
          >
            Cancel
          </button>
          <button
            className="pl-4 pr-4 pt-2 pb-2 border bg-dark cursor-pointer text-light border-dark rounded-lg"
            onClick={() => {
              addAdminBtnHandler();
            }}
          >
            {editPhoneNo !== "" ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAdmin;
