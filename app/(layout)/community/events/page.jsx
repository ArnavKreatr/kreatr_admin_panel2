"use client";
import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/ClipLoader";
import { DeleteConfirmation } from "@/app/components/deleteButton";
import EventForm from "./eventForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faEdit,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CommunityEvents = () => {
  const [contactUsRequests, setContactUsRequest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addEventsBtnHandler, setAddEventsBtnHandler] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [id, setId] = useState("");
  const [eventType, setEventType] = useState("upcoming");
  const [globalIndex, setGlobalIndex] = useState(-1);
  const [trigger,setTrigger] = useState('')
  useEffect(() => {
    const getContactusDetail = async () => {
      try {
        const response = await fetch(
          `https://erfaz8h6s3.execute-api.ap-south-1.amazonaws.com/dev/eventInfo`
        );
        const data = await response.json();
        console.log(data);
        const pastEvents = [];
        const upcomingEvents = [];

        data.forEach((event) => {
          if (event.eventType === "past") {
            pastEvents.push(event);
          } else if (event.eventType === "upcoming") {
            upcomingEvents.push(event);
          }
        });
        eventType === "upcoming"
          ? setContactUsRequest(upcomingEvents)
          : setContactUsRequest(pastEvents);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    getContactusDetail();
    setTrigger('')
  }, [eventType,trigger]);

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
        <>
          <div className=" h-full w-full p-6 overflow-scroll ">
            <div className="w-full flex justify-center items-center pt-4 pb-4 gap-4">
              <div
                className=" border border-dark pl-[12px] pr-[12px] pt-2 pb-2 rounded-md cursor-pointer"
                style={{
                  backgroundColor: eventType === "upcoming" ? "#373737" : "",
                  color: eventType === "upcoming" ? "#F0F0F0" : "#373737",
                }}
                onClick={() => {
                  setEventType("upcoming");
                }}
              >
                Upcoming
              </div>
              <div
                className=" border border-dark pl-[12px] pr-[12px] pt-2 pb-2 rounded-md cursor-pointer"
                style={{
                  backgroundColor: eventType === "past" ? "#373737" : "",
                  color: eventType === "past" ? "#F0F0F0" : "#373737",
                }}
                onClick={() => {
                  setEventType("past");
                }}
              >
                Past
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pb-12">
              {contactUsRequests.length === 0 ? (
                <div className=" h-full w-full flex justify-center items-center">
                  {" "}
                  No Events Found
                </div>
              ) : (
                contactUsRequests.map((val, index) => (
                  <div key={index}>
                    <div className="border border-black p-4 bg-opacity-[10%] rounded-lg">
                      <div className="w-full flex justify-end items-end gap-4">
                        <div
                          className="w-[5%] h-[5%] cursor-pointer"
                          onClick={() => {
                            setAddEventsBtnHandler(true);
                            setGlobalIndex(index);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className="w-full h-full text-gray-500"
                          />
                        </div>
                        <div
                          className=" w-[5%] h-[5%] cursor-pointer"
                          onClick={() => {
                            setId(val.id);
                            setIsDeleting(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="h-full w-full text-gray-500"
                          />
                        </div>
                      </div>
                      <div className="rounded-md">
                        <img
                          src={val.coverImg}
                          alt="image"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="mt-2 font-bold text-[1.5rem]">
                        {val.heading}
                      </div>
                      <div className="text-[1rem] mb-1">{val.sessionType}</div>
                      <div className="w-full flex justify-between">
                        <div className="border flex justify-center items-center border-black rounded-lg p-1 ">
                          {val.date}
                        </div>
                        <Link key={index} href={`/community/events/${val.id}`}>
                          <div className="">
                            <FontAwesomeIcon icon={faArrowRight} className="" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div
              className=" rounded-[50%]  shadow-md shadow-black w-[5vw] h-[5vw] fixed right-0 bottom-0 m-6 flex justify-center items-center text-light bg-dark text-center text-[3.125rem] cursor-pointer"
              onClick={() => {
                setAddEventsBtnHandler(true);
              }}
            >
              +
            </div>
            {addEventsBtnHandler === true && (
              <div className="h-full w-full bg-dark bg-opacity-[90%] top-0 left-0 absolute">
                <EventForm
                  setAddEventsBtnHandler={setAddEventsBtnHandler}
                  oldCoverImg={
                    contactUsRequests[globalIndex] !== undefined
                      ? contactUsRequests[globalIndex].coverImg
                      : ""
                  }
                  oldImages={contactUsRequests[globalIndex] !== undefined
                    ? contactUsRequests[globalIndex].images
                    : []}
                    oldHeading={contactUsRequests[globalIndex] !== undefined
                      ? contactUsRequests[globalIndex].heading
                      : ""}
                      oldDescription={contactUsRequests[globalIndex] !== undefined
                        ? contactUsRequests[globalIndex].description
                        : ""}
                        oldDate={contactUsRequests[globalIndex] !== undefined
                          ? contactUsRequests[globalIndex].date
                          : ""}
                          oldEventType={contactUsRequests[globalIndex] !== undefined
                            ? contactUsRequests[globalIndex].eventType
                            : ""}
                            oldTestimonials={contactUsRequests[globalIndex] !== undefined
                              ? contactUsRequests[globalIndex].testimonials
                              : []}
                              oldPrice={contactUsRequests[globalIndex] !== undefined
                                ? contactUsRequests[globalIndex].price
                                : ""}
                                oldSessionType={contactUsRequests[globalIndex] !== undefined
                                  ? contactUsRequests[globalIndex].sessionType
                                  : ""}
                                  OldDuration={contactUsRequests[globalIndex] !== undefined
                                    ? contactUsRequests[globalIndex].duration
                                    : ""}
                                    oldSpeakerName={contactUsRequests[globalIndex] !== undefined
                                      ? contactUsRequests[globalIndex].speakerName
                                      : ""}
                                      oldHoverColor={contactUsRequests[globalIndex] !== undefined
                                        ? contactUsRequests[globalIndex].hoverColor
                                        : ""}
                                        oldLocation={contactUsRequests[globalIndex] !== undefined
                                          ? contactUsRequests[globalIndex].location
                                          : ""}
                                          setGlobalIndex={setGlobalIndex}
                                          id={contactUsRequests[globalIndex] !== undefined
                                            ? contactUsRequests[globalIndex].id
                                            : ""}
                                            setTrigger={setTrigger}
                />
              </div>
            )}
            {isDeleting === true && (
              <DeleteConfirmation
                api={`https://erfaz8h6s3.execute-api.ap-south-1.amazonaws.com/dev/eventInfo/${id}`}
                setDeleteConfirmation={setIsDeleting}
                setTrigger={setTrigger}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityEvents;
