'use client'
import { useEffect, useState } from 'react';
import ChoosePlatform from "./(layout)/choosePlatform/page";
import Login from "./(layout)/login/page";

export default function Home() {
  const [permission, setPermission] = useState(null);


  useEffect(() => {
    // This code runs only on the client side
    const jsonString = localStorage.getItem('permission');
    const storedPermission = jsonString ? JSON.parse(jsonString) : null;
    console.log(storedPermission);
    setPermission(storedPermission);
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-light">
      {permission ? <ChoosePlatform /> : <Login />}
    </div>
  );
}
