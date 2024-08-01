'use client'
import React, { useEffect, useState } from 'react'

const SuggestionsPage = ({api,selectedSuggestions,setIsSuggestions,setSelectedSuggestions}) => {
  const [offset,setOffset] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [len,setLen] = useState(0);
  const [selectedSugSuggestions,setSelectedSubSuggestions]=useState(selectedSuggestions);

  const handleSuggestionClick = (id) => {
    setSelectedSuggestions((prevSelected) => {
      if (!Array.isArray(prevSelected)) {
        console.error('selectedSuggestions is not an array');
        return [];
      }
  
      if (prevSelected.includes(id)) {
        // Remove the ID
        return prevSelected.filter((suggestionId) => suggestionId !== id);
      } else {
        // Add the ID
        return [...prevSelected, id];
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${api}${offset}`
        );
        const resData = await response.json();
        console.log(resData.length);
        setLen(Math.ceil(resData.length / 9));
        setSuggestions(resData.data);

      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [offset]);

  return (
    <div className='w-full h-full absolute top-0 left-0 bg-dark bg-opacity-[90%] flex flex-col justify-between'>

      <div className='w-full grid grid-cols-2 gap-4 h-full p-4 overflow-auto'>
        {
          suggestions.map((val,index)=>(
            <div key={index} className='h-[500px] relative w-full bg-light'>
              <div className=' w-full h-full bg-cover bg-center bg-no-repeat flex items-end text-dark'style={{backgroundImage:`url('${val.coverImg}')`}}>
                <div className=' bg-light w-full bg-opacity-[60%] p-4'>
                {val.title}</div>
                </div>
              <div className=' absolute top-0 w-full h-full z[1] cursor-pointer' onClick={()=>{handleSuggestionClick(val.id)}} style={{backgroundColor: selectedSuggestions.includes(val.id)? 'rgba(74, 222, 128, 0.5)':null,}}/>

            </div>
          ))
        }
      </div>

      {/* footer */}

      <div className='w-full flex justify-between p-4'> 
      <div className=''/>
      <div className='flex justify-center items-center'>
      {Array.from({ length: len }, (_, index) => index + 1).map(
                (val, index) => (
                  <div
                    key={index}
                    className=" rounded-lg pt-1 pb-1 pr-2 pl-2 cursor-pointer"
                    style={{
                      backgroundColor: index === offset / 9 ? "#f0f0f0" : null,
                      color: index === offset / 9 ? "#373737" : "#f0f0f0",
                    }}
                    onClick={() => {
                      setOffset(index * 9);
                    }}
                  >
                    {val}
                  </div>
                )
              )}
      </div>
      <div className='flex gap-2'>
        <div className='border rounded-lg pl-3 pr-3 pt-1 pb-1 cursor-pointer flex justify-center items-center bg-light text-dark' onClick={()=>{setIsSuggestions(false)}}>Cancel</div>
        <div className='border rounded-lg pl-3 pr-3 pt-1 pb-1 cursor-pointer flex justify-center items-center text-light hover:bg-light hover:text-dark' onClick={()=>{setIsSuggestions(false)}}>Submit</div>
      </div>
      </div>
    </div>
  )
}

export default SuggestionsPage