import React from 'react';
import pageTitleImg from '../assets/page-title.jpeg'

const PageTitle = ({pageTitle, pageDesc}) => {
    return (
        <div className=' bg-cover bg-center ' style={{backgroundImage: `url(${pageTitleImg})`, backgroundRepeat: 'no-repeat'}}>
            <div className='backdrop-blur-sm w-full flex flex-col  items-center justify-center'>
            <h1 className='text-4xl text-white font-bold my-20'>{pageTitle}</h1>
            </div>
        </div>
    );
};

export default PageTitle;