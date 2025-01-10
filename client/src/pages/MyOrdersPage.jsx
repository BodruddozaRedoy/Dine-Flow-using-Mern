import React, { useEffect, useState } from 'react';
import PageTitle from '../Layouts/PageTitle';
import { useStore } from 'zustand';
import { foodStore } from '../store/foodStore';
import { axiosInstance } from '../utils/axios';
import { authStore } from '../store/authStore';
import moment from "moment";
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Spinner from '../components/Spinner';


const MyOrdersPage = () => {
    const {user, setUser} = useStore(authStore)
    const [orders, setOrders] = useState([])
    
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
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.post(`/api/purchased-food/`, {email:user.email})
            setOrders(res.data);
            } catch (error) {
                console.log(error);
                
            }
            
        }
        fetchOrders()
    }, [])

    const handleDeleteOrder = async (id) => {
        try {
            const res = await axiosInstance.delete(`/api/delete-purchase/${id}`)
            console.log(res);
            const filter = orders.filter(prev => prev._id !== id)
            setOrders(filter)
            toast.success("Order deleted")
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <div>
            <Helmet title='My Order | Dine Flow'/>
            <PageTitle pageTitle={"My Orders"}/>
            <div className='md:m-10 m-2 rounded-3xl bg-white dark:bg-slate-400 p-10'>
                <h1>Orders</h1>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>Owner Name</th>
                            <th>Food Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <div className='flex items-center justify-center'>{orders.length === 0 && <Spinner/>}</div>
                        <tbody className=''>
                        {/* row 1 */}
                        {
                            orders.map((food, i) => (
                                
                                <tr>
                            <th>
                            <p>{i+1}</p>
                            </th>
                            <td>{food?.foodOwner}</td>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img
                                    className='w-full'
                                    src={food?.image}
                                    alt="" />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{food.productName}</div>
                                <div className="text-sm opacity-50">{moment(food.buyingDate).format("DD-MM-YYYY")}</div>
                                </div>
                            </div>
                            </td>
                            <td>${food.price}</td>
                            <td>{food.quantity} items</td>
                            <th>
                            <button onClick={() => handleDeleteOrder(food?._id)} className="btn bg-red-500 text-white hover:bg-red-400 btn-xs">Delete</button>
                            </th>
                        </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyOrdersPage;