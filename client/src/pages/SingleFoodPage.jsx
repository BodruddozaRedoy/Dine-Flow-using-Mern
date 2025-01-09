import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../utils/axios';
import { Link, useParams } from 'react-router-dom';
import PageTitle from '../Layouts/PageTitle';
import ReactStars from "react-rating-stars-component";
import MainBtn from '../components/MainBtn';
import { Helmet } from 'react-helmet';



const SingleFoodPage = () => {
    const {id} = useParams()
    const [food, setFood] = useState()
    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(id);
                const res = await axiosInstance.get(`/api/product/${id}`)
                console.log(res.data);
                setFood(res?.data)
            } catch (error) {
                // console.log(error);
                
            }
            
        }
        fetchData()
    }, [])
    // const {_id, userName, userEmail, productName, price, quantity, image, category, productOrigin, details, tags, ingredients, rating, purchased} = food
    return (
        <div>
            <Helmet title='Food Details | Dine Flow'/>
            <PageTitle pageTitle={food?.productName}/>
            <div className='bg-white dark:bg-slate-400 p-10 md:m-10 rounded-xl'>
                <h1 className='text-4xl font-serif mb-5'>Food Details</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <img className='rounded-xl' src={food?.image} alt="" />
                    <div className='space-y-4'>
                        <h1 className='font-serif text-2xl font-thin'>{food?.productName}</h1>
                        <p className='text-gray-400 dark:text-white'>{food?.details}</p>
                        <h1 className='font-serif text-2xl font-thin'>Ingredients</h1>
                        <ul className='pl-10'>
                            {
                                food?.ingredients.map((i, index) => (
                                    <li className='list-disc dark:text-white text-gray-400' key={index}>{i}</li>
                                ))
                            }
                        </ul>
                        <div className='bg-slate-100 gap-3 p-5 rounded-xl flex flex-col md:grid grid-cols-2'>
                            <p className='font-semibold'>Price: {food?.price}</p>
                            <p className='font-semibold'>Category: {food?.category}
                            </p>
                            <p className='font-semibold'>Food Origin: {food?.productOrigin}
                            </p>
                            <p className='font-semibold flex gap-1'>Tags: {food?.tags.map((tag, i) => (<p key={i} className='text-gray-400'>{tag}</p>))}
                            </p>
                            <p className='font-semibold'>Quantity: <span>{food?.quantity ? food?.quantity : "Not available"}</span> items</p>
                            <div className='flex gap-3 items-center'>
                            <p>Rating: </p>
                                <ReactStars
                                count={5}
                              //onChange={ratingChanged}
                                size={24}
                                value={food?.rating}
                                activeColor="#ea6a12"
                                />
                                <span>({food?.rating})</span>
                            </div>
                            <p className='font-semibold col-span-2'>Purchased: <span className='text-gray-400'>{food?.purchased}</span></p>
                        </div>
                            
                            <button className='mt-5 w-full' disabled={food?.quantity === 0}><Link style={{ pointerEvents: food?.quantity === 0 ? 'none' : 'auto'}} to={`/purchase/${food?._id}`}><MainBtn text={food?.quantity === 0 ? "Items not available" : "Purchase"}/></Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleFoodPage;