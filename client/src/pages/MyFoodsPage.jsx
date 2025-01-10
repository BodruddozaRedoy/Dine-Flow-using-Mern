import React, { useEffect, useState } from 'react';
import PageTitle from '../Layouts/PageTitle';
import { useStore } from 'zustand';
import { authStore } from '../store/authStore';
import { axiosInstance } from '../utils/axios';
import moment from 'moment';
import { category } from '../components/CategorySection/CategorySection';
import { foodStore } from '../store/foodStore';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import Spinner from '../components/Spinner';


const MyFoodsPage = () => {
    const {user, setUser} = useStore(authStore)
    const {updateFood} = useStore(foodStore)
    const [foods, setFoods] = useState([])
    const [update, setUpdate] = useState()
    const [id, setId] = useState()

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

    const handleDelete = async (id) => {
        setId(id)
        const fetch = async () => {
          try {
            const res = await axiosInstance.delete(`/api/product/${id}`)
            console.log(res.data);
            toast.success(res.data.message)
            const filter = foods.filter(prev => prev._id !== id)
            setFoods(filter)
        } catch (error) {
            console.log(error);
            
        }
        }
        fetch()
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const res = await axiosInstance.post("/api/user-product", {email:user?.email})
              setFoods(res?.data);
            } catch (error) {
              console.log(error);
              
            }
            
        }
        fetchUserData()
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        // const userName = form.userName.value
        // const userEmail = form.userEmail.value
        const productName = form.title.value
        const price = parseInt(form.price.value)
        const quantity = parseInt(form.quantity.value)
        const image = form.image.value
        const category = form.category.value
        // const tags = hashtag
        const productOrigin = form.origin.value
        const details = form.details.value
        // const purchased = 0
        // const buyingDate = Date.now()
        const rating = parseInt(form.rating.value)
        const food = {productName, price, image, category, quantity, productOrigin, details, rating}
        // console.log(food);
        
        // update food api 
        try {
            const res = await axiosInstance.put(`/api/update-product/${id}`, food)
            toast.success(res.data.message)
            document.getElementById("my_modal_3").close()
        } catch (error) {
            
        }

        
    }

    const handleUpdate = async (id) => {
        document.getElementById("my_modal_3").showModal()
        const res = await axiosInstance.get(`/api/product/${id}`)
        setUpdate(res.data);
        setId(id)
        
        
    }

    
    return (
      <div>
            <Helmet title='My Foods | Dine Flow'/>
        <PageTitle pageTitle={"My Foods"} />
        <div className="md:m-10 p-10 rounded-3xl bg-white dark:bg-slate-400">
          <h1 className='text-xl md:text-3xl'>My Foods</h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Food Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
                <div className='felx justify-center items-center'>{foods.length === 0 && <Spinner/>}</div>
              <tbody className=''>
                {/* row 1 */}
                {foods.map((food, i) => (
                  <tr>
                    <th>
                      <p>{i + 1}</p>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img className="w-full" src={food?.image} alt="" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{food.productName}</div>
                          <div className="text-sm opacity-50">
                            {moment(food.buyingDate).format("DD-MM-YYYY")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>${food.price}</td>
                    <td>{food.quantity} items</td>
                    <th>
                      <button onClick={() => handleUpdate(food._id)} className="btn bg-blue-500 text-white hover:bg-blue-400 btn-xs">
                        Update
                      </button>
                    </th>
                    <th>
                      <button onClick={() => handleDelete(food._id)} className="btn bg-red-500 text-white hover:bg-red-400 btn-xs">
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* modal  */}
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-center">Update the product</h3>
            <p className="py-4">
            <form onSubmit={handleSubmit} className='flex flex-col gap-5' action="">
                            <div className=''>
                                <h2 className='font-semibold mb-2'>User Name</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' value={user.name} readOnly type="text" placeholder='Food title' name="userName" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>User Email</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' value={user.email} readOnly type="text" placeholder='Food title' name="userEmail" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Title</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.productName} required type="text" placeholder='Food title' name="title" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Price</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.price} required type="number" placeholder='Food price' name="price" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Image Url</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.image} required type="text" placeholder='Food image url' name="image" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Category</h2>
                                    <select className='bg-slate-100 py-3 px-5 rounded-3xl w-full placeholder-gray-200' defaultValue={update?.category} required placeholder='Select category' name="category" id="">
                                        {
                                            category.map(({name,img}) => (
                                                <option key={name} value={name}>{name}</option>
                                            ))
                                        }
                                    </select>
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Quantity</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.quantity} required type="number" placeholder='Food quantity' name="quantity" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Rating</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.rating} type="number" placeholder='Food rating' name="rating" id="" />
                            </div>
                            <div className=''>
                                <h2 className='font-semibold mb-2'>Food Origin</h2>
                                <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.productOrigin} type="text" placeholder='Country name' name="origin" id="" />
                            </div>
                            
                            <div className='col-span-2'>
                                <h2 className='font-semibold mb-2'>Food Details</h2>
                                <textarea className='bg-slate-100 py-3 px-5 rounded-3xl w-full' defaultValue={update?.details} required placeholder='Type here' name="details" id="" cols="30" rows="10"></textarea>
                            </div>
                            
                            <button className='col-span-2 w-full bg-primary py-4 px-5 font-semibold text-white rounded-3xl'>Update Food</button>
                        </form>
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                {/* <button className="btn w-full">Close</button> */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    );
};

export default MyFoodsPage;