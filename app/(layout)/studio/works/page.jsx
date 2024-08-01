"use client";
import { useEffect, useState } from "react";
import Studio from "../page";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowRight, faEdit, } from "@fortawesome/free-solid-svg-icons";
import { DeleteConfirmation } from "../../../components/deleteButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Works = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [works, setWorks] = useState([]);
  const [length, setLength] = useState(0);
  const [trigger, setTrigger] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [api, setApi] = useState("");
  const currentPath = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks?offset=${counter}`
        );
        const data = await response.json();
        setWorks(data.data || []);
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

  const updateFeatured = async (id, isFeatured) => {
    try {
      const body = JSON.stringify({
        featured: !isFeatured,
      });

      console.log("body ", body, " id", id);
      const response = await fetch(
        `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
      console.log(response);
      setTrigger("triggered");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Studio>
      {loading === false ? (
        works.length !== 0 ? (
          <div className="w-full h-full flex flex-col justify-between p-4">
            <div className=" grid grid-cols-2 gap-4 h-full mb-4 overflow-auto">
              {works.map((val, index) => (
                <div
                  key={index}
                  className="border bg-cover bg-center flex flex-col justify-between border-dark w-full h-[50vh]"
                  style={{ backgroundImage: `url(${val.coverImg})` }}
                >
                  <div className="w-full  pt-4 pr-4 flex justify-end gap-2">
                    <div
                      className="w-[2.5vw] h-[2.5vw] relative cursor-pointer"
                      onClick={() => {
                        updateFeatured(val.id, val.featured);
                      }}
                    >
                      {val.featured === true ? (
                        <Image
                          layout="fill"
                          src={"/assets/filledStar.png"}
                          alt="image"
                        ></Image>
                      ) : (
                        <Image
                          layout="fill"
                          alt="image"
                          src={"/assets/unfilledStar.png"}
                        ></Image>
                      )}
                    </div>
                    <Link
                      href={`${currentPath}/worksForm/${val.id}`}
                      className="w-[2.5vw] h-[2vw] flex items-center justify-center cursor-pointer "
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="w-full h-full text-gray-500"
                      />
                    </Link>
                    <div
                      className="h-[2.5vw] w-fit cursor-pointer"
                      onClick={() => {
                        setApi(
                          `https://86avf8i3h6.execute-api.ap-south-1.amazonaws.com/dev/studioWorks/${val.id}`
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
                  <div className=" bg-light bg-opacity-[80%] p-4">
                    <h1>{val.title}</h1>
                    <p> Location:- {val.location}</p>
                    <div className="flex justify-between">
                    <p> Industry:- {val.industry}</p>
                    <Link key={index} href={`${currentPath}/${val.id}`}>
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
               <div className="w-[3vw] cursor-pointer h-[3vw] bg-dark text-light text-[24px] rounded-[50%] absolute right-0 mr-4 flex justify-center items-center p-2">
               <Link href={`${currentPath}/worksForm/id`}> + </Link>
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

export default Works;
