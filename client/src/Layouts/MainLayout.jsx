import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Headroom from "react-headroom";

const MainLayout = () => {
    return (
        <div className=''>
            <nav>
                <Headroom>
                <Navbar/>
                </Headroom>
            </nav>
            <main className=''>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;