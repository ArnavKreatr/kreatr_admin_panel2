import Image from "next/image";
import Link from "next/link";

const StudioDrawer = ({ drawerItems,selectedIndex }) => {


  return (
    <div className=" h-full w-full flex flex-col items-center justify-between bg-dark">
      <div className=" w-[60%] h-[10%] relative">
        <Image layout="fill" src={"/assets/kreatrLogo.svg"}  alt="image"/>
      </div>
      <div className="w-full text-light">
        {drawerItems.map((val, index) => (
          <Link key={index} href={val.path}> 
          <div
            
            className=" w-full pt-4 pb-4 flex justify-center items-center cursor-pointer hover:bg-light hover:text-dark"
            style={{
              backgroundColor: index === selectedIndex ? "#F0F0F0" : null,
              color: index === selectedIndex && "#373737",
            }}
          >
            <div className="w-[60%]">{val.title}</div>
          </div>
          </Link>
        ))}
      </div>
      <div className=" border-t border-light w-full text-center p-4 cursor-pointer text-light">LogOut</div>
    </div>
  );
};

export default StudioDrawer;