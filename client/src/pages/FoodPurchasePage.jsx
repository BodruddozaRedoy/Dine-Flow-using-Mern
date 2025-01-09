import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/axios';
import MainBtn from '../components/MainBtn';
import { useStore } from 'zustand';
import { foodStore } from '../store/foodStore';
import toast from 'react-hot-toast';
import { authStore } from '../store/authStore';
import { Helmet } from 'react-helmet';


const FoodPurchasePage = () => {
    const {id} = useParams()
    const [food, setFood] = useState()
    const [quantity, setQuantity] = useState(1)
    const {addPurchase, updateFood} = useStore(foodStore)
    const {user, setUser} = useStore(authStore)
    const navigate = useNavigate()
    
    useEffect(() => {
                const fetchUserData = async () => {
                    try {
                      await axiosInstance.get("/api/auth/check-auth")
                    } catch (error) {
                      console.log(error);
                      setUser(null)
                      
                    }
                    
                }
                fetchUserData()
            }, [user]) 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/api/product/${id}`)
                setFood(res?.data)
            } catch (error) {
                console.log(error);
                
            }
            
        }
        fetchData()
    }, [])

    

    const total = food?.price * quantity
    // console.log((food?.price) + percentage);

    // handle purchase fnc
    console.log(user.email, food?.userEmail);
    const handlePurchase = () => {
        const availableQuantity = food?.quantity
        
        if(availableQuantity < quantity) return toast.error("Food is not available")
        if(user.email === food.userEmail) return toast.error("You cant order your own food")
        const foodOwner = food?.userName
        const productName = food?.productName
        const image = food?.image
        const price = total
        const buyerName = user?.name
        const buyerEmail = user?.email
        const buyingDate = (new Date().toDateString())
        const updatedQuantity = availableQuantity - quantity
        const availablePurchaseCount = food.purchased
        const updatedPurchaseCount = availablePurchaseCount + 1
        
        const purchase = {foodOwner, productName, price, buyerEmail, buyerName, quantity, buyingDate, image}
        
        const updatedFood = {quantity:updatedQuantity, purchased:updatedPurchaseCount}

        addPurchase(purchase)
        updateFood(food._id, updatedFood, navigate)
    }
    
    
    return (
        <div className='md:m-10 rounded-xl bg-white dark:bg-slate-400 p-10 md:w-[40%] md:mx-auto'>
            <Helmet title='Food Purchase | Dine Flow'/>
            <div className='bg-slate-100 p-7 rounded-3xl mb-5 flex flex-col md:grid grid-cols-2 items-center gap-3'>
                <img className='rounded-3xl' src={food?.image} alt="" />
                <div className='bg-white  rounded-3xl gap-2 p-4 flex-col flex items-center'>
                    <h1 className='font-semibold text-center'>{food?.productName}</h1>
                    <p className='text-gray-400 text-center'>Available: {food?.quantity}</p>
                    <p className='font-bold text-primary'>${food?.price}</p>
                    <div>
                        <p className='text-center font-semibold'>Enter the quantity</p>
                        <input className='py-3 px-4 shadow-md mt-3 bg-slate-100 border-2 border-primary rounded-3xl' defaultValue={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} type="number" name="quantity" placeholder='Enter quantity' id="" />
                    </div>
                </div>
            </div>
            <div className='bg-slate-100 p-7 rounded-3xl'>
            <p className='font-semibold text-gray-400'>Order summary:</p>
            <h1 className='font-bold text-xl'>{food?.productName}</h1>
            <div className='flex items-center justify-between my-3'>
                <p className='font-semibold'>{quantity} items</p>
                <p className='font-semibold'>Quantity</p>
            </div>
            <div className='flex items-center justify-between my-3'>
                <p className='font-semibold text-gray-400'>${food?.price}</p>
                <p className='font-semibold text-gray-400'>Subtotal</p>
            </div>
            <hr />
            <div className='flex items-center justify-between my-3'>
                <p className='font-semibold text-gray-400'>{quantity} items</p>
                <p className='font-semibold text-gray-400'>Quantity</p>
            </div>
            <hr />
            <div className='flex items-center justify-between my-3'>
                <p className='font-semibold text-gray-400'>${total}</p>
                <p className='font-semibold text-gray-400'>Total</p>
            </div>
            <hr />
            </div>
            <div className='my-5'>
                <h1 className='font-bold'>Billing Details:</h1>
                <p>Name: <span className='text-gray-400'>{user?.name}</span></p>
                <p>Email Address: <span className='text-gray-400'>{user?.email}</span></p>
            </div>
            <button className='w-full' onClick={handlePurchase}><MainBtn text={"Purchase"}/></button>
        </div>
    );
};

export default FoodPurchasePage;