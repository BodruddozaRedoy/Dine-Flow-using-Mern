import React from 'react';
import MainBtn from './MainBtn';
import { authStore } from '../store/authStore';
import { useStore } from 'zustand';
import { Link } from 'react-router-dom';

const Banner = () => {
    const {user} = useStore(authStore)
    return (
        <div className='md:m-10'>
            <div className='overflow-hidden rounded-2xl space-y-5' style={{background: `url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
               <div className='backdrop-blur-sm px-20 py-40 rounded-2xl space-y-3'>
               <p className='text-primary font-semibold text-sm text-center md:text-start'>Deal of the weekend</p>
                <h1 className='text-4xl font-bold font-protest text-center md:text-start'>Hello, {user?.name}</h1>
                <p className='text-center md:text-start'>Get your favorite food from us on every month</p>
                <Link to={'/all-foods'}><div className='mt-5 md:w-[20%]'><MainBtn text={"Check Menu"}/></div></Link>
               </div>
            </div>
        </div>
    );
};

export default Banner;