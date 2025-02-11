import React, { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';
import { foodStore } from '../store/foodStore';
import { authStore } from '../store/authStore';
import { category } from '../components/CategorySection/CategorySection';
import { Helmet } from 'react-helmet';
import { axiosInstance } from '../utils/axios';




const AddFoodPage = () => {
    const {addFood, foods} = useStore(foodStore)
    const {user, setUser} = useStore(authStore)
    const [tags, setTags] = useState([])
    const [list, setList] = useState([])
    const tagRef = useRef()
    const listRef = useRef()
    const hashtag = tags.map(tag => `#${tag}`)
    
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
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const userName = form.userName.value
        const userEmail = form.userEmail.value
        const productName = form.title.value
        const price = parseInt(form.price.value)
        const quantity = parseInt(form.quantity.value)
        const image = form.image.value
        const category = form.category.value
        const tags = hashtag
        const productOrigin = form.origin.value
        const details = form.details.value
        const purchased = 0
        // const buyingDate = Date.now()
        const rating = parseInt(form.rating.value)
        const food = {userEmail, userName, productName, price, image, category, tags, quantity, productOrigin, details, ingredients:list, rating, purchased}
        // add food api 
        addFood(food, form, setTags, setList, setUser)
        

    }

    return (
        <div className='md:m-10 m-5 bg-white dark:bg-slate-400 p-5 md:p-10 rounded-3xl'>
            <Helmet title='Add Foods | Dine Flow'/>
            <form onSubmit={handleSubmit} className='flex flex-col md:grid md:grid-cols-2 gap-5' action="">
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
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' required type="text" placeholder='Food title' name="title" id="" />
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Price</h2>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' required type="number" placeholder='Food price' name="price" id="" />
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Image Url</h2>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' required type="text" placeholder='Food image url' name="image" id="" />
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Category</h2>
                        <select className='bg-slate-100 py-3 px-5 rounded-3xl w-full placeholder-gray-200' required placeholder='Select category' name="category" id="">
                            {/* <option value="Smartphone">Smartphone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Headphone">Headphone</option> */}
                            {
                                category.map(({name,img}) => (
                                    <option key={name} value={name}>{name}</option>
                                ))
                            }
                        </select>
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Quantity</h2>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' required type="number" placeholder='Food quantity' name="quantity" id="" />
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Rating</h2>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full'  type="number" placeholder='Food rating' name="rating" id="" />
                </div>
                <div className=''>
                    <h2 className='font-semibold mb-2'>Food Origin</h2>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full'  type="text" placeholder='Country name' name="origin" id="" />
                </div>
                <div className=''>
                    <div className='flex items-center gap-3'>
                    <h2 className='font-semibold mb-2'>Food Tags</h2>
                    <div className=' flex items-center gap-2 mb-2'>{hashtag.map((tag, index) => <div className='border rounded-3xl flex items-start justify-start py-1 px-2 text-xs font-semibold' key={index}><p>{tag}</p></div>)}</div>
                    </div>
                    <div className='flex'>
                    <input className='bg-slate-100 py-3 px-5 rounded-3xl w-full' ref={tagRef} type="text" placeholder='Food tags' name="tags" id="" />
                    <div onClick={() => {setTags([...tags, tagRef.current.value]); tagRef.current.value=""}} className=' px-5 bg-primary rounded-xl ml-3 font-semibold text-white flex justify-center items-center'>Add</div>
                    </div>
                    
                </div>
                <div className='col-span-2'>
                    <h2 className='font-semibold mb-2'>Food Details</h2>
                    <textarea className='bg-slate-100 py-3 px-5 rounded-3xl w-full' required placeholder='Type here' name="details" id="" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <h2 className='font-semibold mb-2'>Ingredients</h2>
                    <div className='flex'>
                    <input type="text" className='bg-slate-100 py-3 px-5 rounded-3xl w-full' name="list-details" ref={listRef} id="" />
                    <div onClick={() => {setList([...list, listRef.current.value]); listRef.current.value=""}} className=' px-5 bg-primary rounded-xl ml-3 font-semibold text-white flex justify-center items-center'>Add</div>
                    </div>
                    <div className='bg-slate-100 py-3 px-5 rounded-3xl w-full mt-3 h-[200px] overflow-auto'>
                        {
                            list.map((list, index) => (
                                <li key={index} className='text-gray-400'>{list}</li>
                            ))
                        }
                    </div>
                </div>
                <button className='col-span-2 w-full bg-primary py-4 px-5 font-semibold text-white rounded-3xl'>Add Food</button>
            </form>
        </div>
    );
};

export default AddFoodPage;