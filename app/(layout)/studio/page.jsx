
'use client'
import { useEffect, useState } from 'react';
import StudioDrawer from '@/app/components/studioDrawer';
import { usePathname } from 'next/navigation';

const Studio = ({ children }) => {
  const drawerItems = [
    { title: "Blogs", path: "/studio/blogs" },
    { title: "Careers", path: "/studio/careers" },
    { title: "Contact Us", path: "/studio/contactUs" },
    { title: "Works", path: "/studio/works" },
  ];
  const pathname = usePathname()
  const [selectedIndex,setSelectedIndex]= useState(-1);
  useEffect(() => {
    const index = drawerItems.findIndex(item => item.path === pathname);
    setSelectedIndex(index);
  }, [pathname]);

  return (
    <div className='relative' style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%'}}>
        <StudioDrawer drawerItems={drawerItems} selectedIndex={selectedIndex}/>
      </div>
      <div style={{ width: '80%',}}>
        {children}
      </div>
    </div>
  );
};

export default Studio;
