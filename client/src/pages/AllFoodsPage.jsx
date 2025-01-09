import React, { useEffect, useState } from 'react';
import PageTitle from '../Layouts/PageTitle';
import MainBtn from '../components/MainBtn';
import { useStore } from 'zustand';
import { foodStore } from '../store/foodStore';
import FoodCard from '../components/AllFoodCard';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';
import AllFoodCard from '../components/AllFoodCard';
import { authStore } from '../store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { Helmet } from 'react-helmet';

const AllFoodsPage = () => {
    const { foods, allFoods } = useStore(foodStore);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Debounced search effect
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (search.trim() === '') {
                setSearchResults([]); 
                return;
            }

            const fetchSearch = async () => {
                setLoading(true);  
                try {
                    const res = await axiosInstance.get(`/api/search-products?query=${search}`);
                    setSearchResults(res.data);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    toast.error("No product found")
                    setSearchResults(null);
                } finally {
                    setLoading(false);  
                }
            };

            fetchSearch();
        }, 1000);

        return () => clearTimeout(debounceTimeout);
    }, [search]);
    
     // Function to highlight search term in product name
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm})`, 'ig'); // 'ig' for case-insensitive and global match
        return text.replace(regex, (match) => `<span class="bg-primary">${match}</span>`); 
    };

    // Fetch all foods
    useEffect(() => {
        allFoods();
    }, []);
      
    
    
    

    return (
        <div>
            <Helmet title='All Foods | Dine Flow'/>
            <PageTitle pageTitle={"All Foods"} />
            <div className='md:m-10 bg-white dark:bg-slate-400 rounded-xl p-10'>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='font-serif text-xl md:text-3xl'>All Foods</h1>
                    <div className='flex items-center gap-3'>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className='bg-slate-100 py-3 px-5 rounded-lg w-full'
                            type="text"
                            placeholder='Search your food'
                            name="search"
                        />
                        {/* You could also use this button if you prefer a manual search trigger */}
                        {/* <div onClick={handleSearch}><MainBtn text={"Search"} /></div> */}
                    </div>
                </div>
                <hr />
                <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 gap-5'>
                    {loading && <p>Loading...</p>}
                    {/* Display either search results or all foods */}
                    {(searchResults.length > 0 ? searchResults : foods)?.map((food) => (
                        <AllFoodCard key={food._id} food={food} highlightText={highlightText} searchTerm={search}/> // Ensure each food has a unique key
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllFoodsPage;
