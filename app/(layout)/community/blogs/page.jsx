'use client'
import { DeleteConfirmation } from "@/app/components/deleteButton";
import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const CommunityBlogs = () => {
  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation,setDeleteConfirmation]=useState('')
  const [api,setApi]=useState('')
  const [trigger,setTrigger]=useState('');

  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          "https://mik4tx7ct3.execute-api.ap-south-1.amazonaws.com/dev/blogs/"
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
        <div className=" h-full w-full p-6 overflow-auto">
        {contactUsRequests.length === 0 ? (
              <div className=" h-full w-full flex justify-center items-center">
                {" "}
                No Blogs Available
              </div>
            ):(
              <div className="grid grid-cols-2 gap-4 ">
              {contactUsRequests.map((val, index) => (
                <div key={index} className="border border-black p-4 bg-opacity-[10%] rounded-lg">
                  <div className="w-full flex justify-end items-center gap-2">

                  <Link href={`/community/blogs/blogForm/${val.id}`}
                        className="w-[5%] h-full flex items-center justify-center cursor-pointer ">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="w-full h-full text-gray-500"
                        />
                      </Link>

                    <div className=" w-[5%] h-[5%]"
                      onClick={() => {
                        setApi(
                          `https://mik4tx7ct3.execute-api.ap-south-1.amazonaws.com/dev/blogs/${val.id}`
                        );
                        setDeleteConfirmation(true);
                      }}
                    >
                    <div className="h-full w-full cursor-pointer">
                    <FontAwesomeIcon
                    icon={faTimes}
                    className="h-full w-full text-gray-500"
                    
                    />
                  </div>
                    </div>
                  </div>
                  <img src={`${val.coverImg}`} alt="something" className='rounded-lg'/>
                  <div className="mt-2 font-bold text-[1.5rem]">{val.heading}</div>
                  <div  className="font-bold">{val.writer}</div>
                  <div className="w-full flex justify-between">
                  <div className="border border-black rounded-lg p-1 w-[22%]">{val.date}</div>
                  <Link key={index} href={`/community/blogs/${val.id}`}>
                    <div className="w-full flex justify-end items-end">
                      <FontAwesomeIcon icon={faArrowRight} className="" />
                    </div>
                  </Link>
                  </div>
                </div>
              ))
              }
              </div>
            )}
        </div>
      )}
     <Link href={`/community/blogs/blogForm/id`}> <div
              className=" rounded-[50%] shadow-md shadow-black w-[5vw] h-[5vw] fixed right-0 bottom-0 m-6 flex justify-center items-center text-light bg-dark text-center text-[3.125rem] cursor-pointer"
              // onClick={() => {
              //   setAddEventsBtnHandler(true);
              // }}
            >
              +
            </div>
            </Link>
            {/* {addEventsBtnHandler === true && <BlogForm setAddEventsBtnHandler={setAddEventsBtnHandler}/>} */}
      {deleteConfirmation === true && <DeleteConfirmation api={api} setDeleteConfirmation={setDeleteConfirmation} setTrigger={setTrigger}/>}
    </div>
  );
}

export default CommunityBlogs