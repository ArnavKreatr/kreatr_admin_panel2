'use client'
import { useEffect, useState } from "react";
import Studio from "../page";

const ContactUs = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://76h7esmkcf.execute-api.ap-south-1.amazonaws.com/dev/contactUs`
        );
        const data = await response.json();
        setContacts(data || []);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Studio>
      {loading === false? contacts.length !== 0? <div className="w-full h-full flex flex-col justify-between p-4 ">
        <div className=" grid grid-cols-2 gap-4 h-full mb-4 overflow-auto">
          {contacts.map((val, index) => (
            <div key={index} className="border border-dark w-full p-2 h-full">
              <h1>
              {val.name}
              </h1>
              <h2>
              {val.senderEmail}
              </h2>
              <p>
              {val.phoneNumber}
              </p>
            </div>
          ))}
        </div>
        
        
      </div>:<div className=" text-[26px] w-full h-full flex justify-center items-center"> No Data Available</div>: <div className="w-full h-full flex justify-center items-center">
        Loading...</div>}
    </Studio>
  );
};

export default ContactUs;
