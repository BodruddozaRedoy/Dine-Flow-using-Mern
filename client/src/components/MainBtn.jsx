import React from 'react';

const MainBtn = ({text}) => {
    return (
        <button className='w-full btn bg-primary border border-primary text-white hover:bg-transparent hover:text-black hover:backdrop-blur-sm'>{text}</button>
    );
};

export default MainBtn;