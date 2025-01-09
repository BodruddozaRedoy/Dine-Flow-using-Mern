import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import HomePage from './pages/HomePage'
import AllFoodsPage from './pages/AllFoodsPage'
import GalleryPage from './pages/GalleryPage'
import MyFoodsPage from './pages/MyFoodsPage'
import AddFoodPage from './pages/AddFoodPage'
import MyOrdersPage from './pages/MyOrdersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { useStore } from 'zustand'
import { authStore } from './store/authStore'
import toast, { Toaster } from 'react-hot-toast'
import Spinner from './components/Spinner'
import PrivateRoute from './Layouts/privateRoute'
import SingleFoodPage from './pages/SingleFoodPage'
import FoodPurchasePage from './pages/FoodPurchasePage'
import { foodStore } from './store/foodStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.init'
import ErrorPage from './pages/ErrorPage'
import { axiosInstance } from './utils/axios'


function App() {
  const {isLoading, setIsLoading, user, getGmailUser, setUser} = useStore(authStore)
  const {foods, allFoods} = useStore(foodStore)
  // console.log(user);
  
  
      useEffect(() => {
          allFoods()
      }, [])

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const fetchToken = async() => {
              try {
                setUser({name:user.displayName, email:user.email, profilePic:user.photoURL, method:"google"}); 
                await axiosInstance.post("/api/auth/register", {email:user.email});
                setIsLoading(false);  
              } catch (error) {
                console.log(error.response);
                setUser(null)
                toast.error(error.response.data.message)
              }
            }
            fetchToken()
          } else {
            // setUser(null); 
            
          }
          setIsLoading(false);  
        });
    
        return () => {
          unsubscribe();
        };
      },[]);
    
      
  return (
    <div className='font-poppins dark:bg-gray-700'>
      {
        isLoading 
        ?<Spinner/>
        :<Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/all-foods' element={<AllFoodsPage/>}/>
          <Route path='/gallery' element={<GalleryPage/>}/>
          <Route path='/my-foods' element={<PrivateRoute><MyFoodsPage/></PrivateRoute>}/>
          <Route path='/add-food' element={<PrivateRoute><AddFoodPage/></PrivateRoute>}/>
          <Route path='/my-orders' element={<PrivateRoute><MyOrdersPage/></PrivateRoute>}/>
          <Route path='/food/:id' element={<SingleFoodPage/>}/>
          <Route path='/purchase/:id' element={<PrivateRoute><FoodPurchasePage/></PrivateRoute>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      }
      <Toaster/>
    </div>
  )
}

export default App
