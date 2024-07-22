import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommunityBlogs from "./blogs/page";
import CommunityCareers from "./careers/page";
import ComunityCollaboration from "./collaboration/page";
import CommunityContactUs from "./contactUs/page";
import CommunityEvents from "./events/page";
import CommunityReportABug from "./reportABug/page";
import { useRouter } from 'next/navigation'

const CommunityDrawer = ({ setChildren, setDeleteConfirmation, setApi, setPlatform,setTrigger,trigger}) => {
  const router = useRouter();
  const [storedPermission,setStoredPermission] = useState({});
  useEffect(() => {
    const jsonString = localStorage.getItem('permission');
    setStoredPermission( jsonString ? JSON.parse(jsonString) : null);
}, []);

  const drawerItems = [
    { item: "Blogs", element: <CommunityBlogs setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} />, apiName:"blogs" },
    { item: "Careers", element: <CommunityCareers setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} />,apiName:"careers" },
    { item: "Collaboration", element: <ComunityCollaboration setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} trigger={trigger} setTrigger={setTrigger}/>,apiName:"collaboration_request" },
    { item: "Contact Us", element: <CommunityContactUs setDeleteConfirmation={setDeleteConfirmation} setApi={setApi}/>,apiName:"contactUs" },
    { item: "Events", element: <CommunityEvents setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} />,apiName:"events" },
    { item: "Report A Bug", element: <CommunityReportABug setDeleteConfirmation={setDeleteConfirmation} setApi={setApi} />,apiName:"ReportABug" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className=" h-full flex flex-col items-center justify-between bg-dark ">
      <div className=" w-[60%] h-[10%] relative">
        <Image layout="fill" src={"/assets/kreatrLogo.svg"} />
      </div>

      <div className="w-full text-light">
        {drawerItems.map((val, index) => (
         storedPermission[val.apiName] === true && <div
            key={index}
            className=" w-full pt-4 pb-4 flex justify-center items-center cursor-pointer hover:bg-light hover:text-dark"
            style={{backgroundColor: index === selectedIndex ? '#F0F0F0':null,
          color: index === selectedIndex && '#373737'
        }}
            onClick={() => {
              setPlatform(val.item);
              setSelectedIndex(index);
              setChildren(val.element);
            }}
          >
            <div className="w-[60%]">{val.item}</div>
          </div>
        ))}
      </div>

      <div className=" text-light border-t border-t-light w-full flex justify-center text-center pt-4 pb-4 cursor-pointer hover:bg-light hover:text-dark">
        <div className="w-[60%]" onClick={()=>{localStorage.removeItem('permission');router.push('/login');}}>LogOut</div>
      </div>
    </div>
  );
};

export default CommunityDrawer;
