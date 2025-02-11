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
import CardSkeleton from '../components/CardSkeleton';

const AllFoodsPage = () => {
    const { foods, allFoods } = useStore(foodStore);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState(foods)
    const [order, setOrder] = useState("")

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

    const sorted = (e) => {
        const selected = e.target.value
        setOrder(selected)
        axiosInstance.post(`/api/sorted-data?sortBy=price&order=${selected}`)
        .then(res => setAllData(res.data)
        )
    }
      
    
    
    

    return (
        <div>
            <Helmet title='All Foods | Dine Flow'/>
            <PageTitle pageTitle={"All Foods"} />
            <div className='md:m-10 bg-white dark:bg-slate-400 rounded-xl p-5 md:p-10'>
                <div className='flex flex-col md:flex-row items-center justify-between mb-5'>
                    <h1 className='font-serif font-bold text-2xl mb-4 md:mb-0 md:text-3xl'>All Foods</h1>
                    <div className='flex  items-center gap-3'>
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
                    <select name="sort" id="" onChange={sorted} className='bg-primary border-none py-3 w-1/3 px-3 md:px-5 text-white rounded-lg'>
                        <option className='bg-white text-primary' value="" disabled selected>Sort by</option>
                        <option className='bg-white text-primary' value="dsc">Sort by Descending</option>
                        <option className='bg-white text-primary' value="asc">Sort by Ascending</option>
                    </select>
                    </div>
                </div>
                <hr />
                
                    {allData?.length === 0  ? <CardSkeleton/> : <div className=' grid lg:grid-cols-4 grid-cols-1 mt-5 gap-5'> {(searchResults.length > 0 ? searchResults : allData)?.map((food) => (
                        <AllFoodCard key={food._id} food={food} highlightText={highlightText} searchTerm={search}/> // Ensure each food has a unique key
                    )) }</div>}
                    {/* Display either search results or all foods */}
                    {/* {} */}
                
            </div>
        </div>
    );
};

export default AllFoodsPage;
