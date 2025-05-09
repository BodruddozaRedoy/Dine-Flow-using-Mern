import React from 'react';
import Banner from '../components/Banner';
import CategorySection from '../components/CategorySection/CategorySection';
import TopFoodsSection from '../components/TopFoodsSection';
import Service from '../components/Service';
import {motion} from 'framer-motion'
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import BlogSection from '../components/BlogSection';


const HomePage = () => {
    return (
        <div className='space-y-20 '>
            <Banner/>
            <CategorySection/>
            <TopFoodsSection/>
            <Service/>
            <Newsletter/>
            <BlogSection/>
            <Testimonials/>
        </div>
    );
};

export default HomePage;