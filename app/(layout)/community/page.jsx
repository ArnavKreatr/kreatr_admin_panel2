"use client";
import React, { useState } from "react";
import CommunityDrawer from "./communityDrawer";
import {DeleteConfirmation} from '../../components/deleteButton'
import NewAdmin from "../settings/newAdmin";
const Community = () => {
  
  const [children, setChildren] = useState(
    <div className="h-full w-full flex justify-center items-center text-dark">
      <div className=" text-[36px]">
      Welcome To Kreatr Admin Panel
      </div>
      
    </div>
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [isNewAdmin,setIsNewAdmin] = useState(false);
  const [platform, setPlatform] = useState('');
  const [api, setApi] = useState('');
  const [trigger,setTrigger] = useState('')
  return (
    <div className="h-[100vh] w-[100vw] flex relative">
      <div className="w-[20%]">
        <CommunityDrawer setChildren={setChildren} trigger={trigger} setTrigger={setTrigger}  setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} setPlatform={setPlatform} />
      </div>
      <div className="h-full w-[80%] ">
        {children}
      </div>
      {deleteConfirmation === true && <DeleteConfirmation setDeleteConfirmation={setDeleteConfirmation} api={api} platform={platform} setTrigger={setTrigger}/>}
      {isNewAdmin === true && <NewAdmin/>}
    </div>
  );
};

export default Community;
