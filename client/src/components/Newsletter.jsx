import React from 'react';
import MainBtn from './MainBtn';

const Newsletter = () => {
    return (
        <div>
            <div className='lg:w-[50%] mx-auto space-y-4 bg-white rounded-xl p-10 flex flex-col items-center justify-center'>
                <h1 className='text-center text-5xl font-semibold tracking-widest'>NEWSLETTER</h1>
                <p className='text-gray-400 text-center'>Wanna keep up with us? Subscribe to our newsletter.Thank you</p>
                <div className='flex flex-col md:flex-row gap-4'>
                    <input type="text" name="" id="" placeholder='Enter your email' className='border rounded-xl py-3 px-5 w-80'/>
                    <button className='btn bg-primary text-white'>Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;