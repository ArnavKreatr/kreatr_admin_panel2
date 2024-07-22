'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ChoosePlatform = () => {
    const [options, setOptions] = useState([
        { platform: 'App', route: '/kreatr_app', bool: false },
        { platform: 'Community', route: '/community', bool: false },
        { platform: 'Studio', route: '/studio', bool: false },
        { platform: 'Settings', route: '/settings', bool: false }
    ]);
    const [isSettings, setIsSettings] = useState(false);

    useEffect(() => {
        const jsonString = localStorage.getItem('permission');
        const storedPermission = jsonString ? JSON.parse(jsonString) : null;
        
        if (storedPermission) {
            // Update the bool values in the options array
            const updatedOptions = options.map(option => {
                if (option.platform === 'App' && storedPermission.app) return { ...option, bool: true };
                if (option.platform === 'Community' && storedPermission.community) return { ...option, bool: true };
                if (option.platform === 'Studio' && storedPermission.studio) return { ...option, bool: true };
                if (option.platform === 'Settings' && storedPermission.settings) return { ...option, bool: true };
                return option;
            });
            setOptions(updatedOptions);

            // Check if all permissions are true
            const allPermissionsTrue = Object.values(storedPermission).every(permission => permission === true);
            setIsSettings(allPermissionsTrue);
        }
    }, []);

    return (
        <div className='h-[100vh] w-full flex justify-center items-center gap-3'>
            {options.map((val, index) => (
                <Link key={index} href={val.route}>
                    {val.platform === 'Settings'?(
                        isSettings === true ?<div className='border border-dark pl-4 pr-4 pt-2 pb-2 rounded-md'>
                            {val.platform}
                        </div>:<></>
                    ) : (
                        <div className='border border-dark pl-4 pr-4 pt-2 pb-2 rounded-md'>
                            {val.platform}
                        </div>
                    )}
                </Link>
            ))}
        </div>
    )
}

export default ChoosePlatform;
