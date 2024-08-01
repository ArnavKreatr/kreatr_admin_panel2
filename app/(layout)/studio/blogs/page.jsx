"use client";
import { useEffect, useState } from "react";
import Studio from "../page";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { DeleteConfirmation } from "../../../components/deleteButton";
import Link from "next/link";

const Blogs = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [length, setLength] = useState(0);
  const [trigger, setTrigger] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [api, setApi] = useState("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs?offset=${counter}`
        );
        const data = await response.json();
        setBlogs(data.data || []);
        setLength(Math.ceil(data.length / 9));
        console.log(data);
        setApi("");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    setTrigger("");
  }, [counter, trigger]);



  return (
    <Studio>
      {loading === false ? (
        blogs.length !== 0 ? (
          <div className="w-full h-full flex flex-col justify-between p-4">
            <div className=" grid grid-cols-2 gap-4 h-full mb-4 overflow-auto">
              {blogs.map((val, index) => (
                <div
                style={{backgroundImage:`url('${val.coverImg}')`}}
                  key={index}
                  className="border bg-no-repeat bg-cover bg-center flex flex-col justify-between border-dark w-full h-[50vh]"
                >
                  <div className="w-full h-[2.5vw] mt-4 pr-2 flex justify-end gap-2">
                    
                    <Link
                      href={`${path}/blogForm/${val.id}`}
                      className="w-[2.5vw] h-full flex items-center justify-center cursor-pointer bg-white bg-opacity-[50%] p-2 rounded-[50%] "
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="w-full h-full text-gray-500"
                      />
                    </Link>
                    <div
                      className="w-[2.5vw] h-full flex items-center justify-center cursor-pointer bg-white bg-opacity-[50%] p-2 rounded-[50%] "
                      onClick={() => {
                        setApi(
                          `https://7nfhxqula3.execute-api.ap-south-1.amazonaws.com/dev/studioBlogs/${val.id}`
                        );
                        setIsDeleting(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="h-full w-full text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-[50%] p-4">
                    <h1>{val.title}</h1>
                    <p> Date:- {val.date}</p>
                    <div className="w-full flex justify-end">
                      <Link key={index} href={`${path}/${val.id}`}>
                        <div className="w-full flex justify-end items-end">
                          <FontAwesomeIcon icon={faArrowRight} className="" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full justify-center items-center flex gap-2">
              {Array.from({ length: length }, (_, index) => index + 1).map(
                (val, index) => (
                  <div
                    key={index}
                    className=" rounded-lg p-2 cursor-pointer"
                    style={{
                      backgroundColor: index === counter / 9 ? "#373737" : null,
                      color: index === counter / 9 ? "#f0f0f0" : "#373737",
                    }}
                    onClick={() => {
                      setCounter(index * 9);
                    }}
                  >
                    {val}
                  </div>
                )
              )}
              <div
                className="w-[3vw] h-[3vw] bg-dark text-light text-[24px] rounded-[50%] absolute right-0 mr-4 flex justify-center cursor-pointer items-center p-2"
                onClick={() => {
                  router.push(`${path}/blogForm/id`);
                }}
              >
                +
              </div>
            </div>
          </div>
        ) : (
          <div className=" text-[26px] w-full h-full flex justify-center items-center">
            {" "}
            No Data Available
          </div>
        )
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      )}
      {isDeleting === true && (
        <DeleteConfirmation
          api={api}
          setDeleteConfirmation={setIsDeleting}
          setTrigger={setTrigger}
        />
      )}
    </Studio>
  );
};

export default Blogs;
