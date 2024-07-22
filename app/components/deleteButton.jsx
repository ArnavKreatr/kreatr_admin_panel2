import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteConfirmation = ({ api, setDeleteConfirmation,setTrigger }) => {
  const confirmBtnHandler = async() => {
    try {
      const response = await fetch(api,{method:'DELETE'});
      const data = await response.json();
    setDeleteConfirmation(false);
    setTrigger('1234erf');
    alert(data.message);
    } catch (error) {
      alert(error)
    }
    
  };
  return (
    <div className="h-full w-full absolute bg-dark opacity-[90%] z-[1] flex justify-center items-center flex-col top-0 left-0">
      <div className="z-1 p-8 rounded-xl bg-light flex justify-between flex-col items-center">
        <p>Do you really want to delete?</p>
        <div className=" w-full flex justify-end items-end gap-2 mt-2">
          <div
            className="border border-light cursor-pointer bg-dark rounded-xl text-light pl-4 pr-4 pt-2 pb-2"
            onClick={() => {
              setDeleteConfirmation(false);
              console.log("clickkkeddd");
            }}
          >
            Cancel
          </div>
          <button
            className="border border-light bg-dark rounded-xl text-light pl-4 pr-4 pt-2 pb-2"
            onClick={() => {
              confirmBtnHandler();
              console.log("click22222");
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteButton = () => {
  
  return (

        <div
          className="h-full w-full cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="h-full w-full text-gray-500"
          />
        </div>

  );
};

module.exports = { DeleteButton, DeleteConfirmation };
