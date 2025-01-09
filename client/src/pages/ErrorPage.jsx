import React from 'react';
import MainBtn from '../components/MainBtn';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-60 gap-3 mx-auto'>
            <h1 className='text-[200px] text-primary font-bold'>404</h1>
            <p className='text-3xl font-semibold'>Page not found</p>
            <Link to={'/'}><MainBtn text={"Back to home"}/></Link>
        </div>
    );
};

export default ErrorPage;