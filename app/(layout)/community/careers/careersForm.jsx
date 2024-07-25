import React, { useState } from 'react';

const CareersForm = ({setAddEventsBtnHandler, oldTitle,oldType,oldLocation,oldDescription,oldResponsibilities,oldQualifications,oldUrl,setGlobalIndex,id}) => {
  const [formData, setFormData] = useState({
    title: oldTitle,
    type: oldType,
    location: oldLocation,
    description: oldDescription,
    responsibilities: oldResponsibilities,
    qualifications: oldQualifications,
    url: oldUrl,
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userConfirmed = oldTitle !== "" ? window.confirm('Are you sure you want to make changes?'):true;
    if (userConfirmed) {
    try {
      const api = oldDescription===''? 'https://pcfja54uwi.execute-api.ap-south-1.amazonaws.com/dev/career':`https://pcfja54uwi.execute-api.ap-south-1.amazonaws.com/dev/career/${id}`;
        const response = await fetch(api,{
            method:oldDescription===''?"POST":'PATCH',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data.message)
        alert(data.message);
        setAddEventsBtnHandler(false)
    } catch (error) {
        console.log(error)
        alert(error);
    }
    
    console.log(formData);}
  };

  return (
    <form className=' h-full w-full absolute top-0 left-0 bg-dark bg-opacity-[90%] flex flex-col justify-center items-center' onSubmit={handleSubmit}>
      <div className='bg-light p-4 rounded-lg flex flex-col gap-4'>
      <div className='flex gap-2 items-center'>
        <label>Title:</label>
        <input className='p-2' type="text" name="title" value={formData.title} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>Type:</label>
        <input className='p-2' type="text" name="type" value={formData.type} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>Location:</label>
        <input className='p-2' type="text" name="location" value={formData.location} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>Description:</label>
        <textarea className='p-2' name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>Responsibilities:</label>
        <textarea className='p-2' name="responsibilities" value={formData.responsibilities} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>Qualifications:</label>
        <textarea className='p-2' name="qualifications" value={formData.qualifications} onChange={handleChange} />
      </div>
      <div className='flex gap-2 items-center'>
        <label>URL:</label>
        <input className='p-2' type="text" name="url" value={formData.url} onChange={handleChange} />
      </div>
      <div className='flex justify-end gap-2'>
      <button className='border border-dark pl-4 pr-4 pt-2 pb-2 rounded-md text-dark bg-light' onClick={()=>{setAddEventsBtnHandler(false); setGlobalIndex(-1);}} >Cancel</button>
      <button className='border border-dark pl-4 pr-4 pt-2 pb-2 rounded-md text-light bg-dark' type="submit">{oldDescription!==''?'Edit':'Submit'}</button>
      </div>
      </div>
    </form>
  );
};

export default CareersForm;
