import React, { useContext, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { Helmet } from 'react-helmet';
import { useStore } from 'zustand';
import { authStore } from '../store/authStore';
import { axiosInstance } from '../utils/axios';

const LoginPage = () => {
    const {login, googleLogin, setUser} = useStore(authStore)
    const [toggleShow, setToggleShow] = useState(false)
    const [inEmail, setEmail] = useState()
    const [inPassword, setPassword] = useState()
    const inputRef = useRef()

    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value


        if(!password) {
          return toast.error("Please type your password", {
            position: "top-center",
            autoClose: 3000
          })
        }

        login(email, password)
        .then((result) => {
          const user = result?.user
          setUser({name:user.displayName, email:user.email, profilePic:user.photoURL});
          toast.success("Logged in successfully", {
            position: "top-center",
            autoClose: 3000
          })
          navigate(location.state? location.state : '/')
      })
      .catch((error) => {
        toast.error("Invalid credential", {
          position: "top-center",
          autoClose: 3000
        })
      })
      const res = await axiosInstance.post("/api/auth/register", {email});
        
        
    }
    const handleGmailLogin = async() => {
          googleLogin()
          .then((result) => {
            const user = result.user
            axiosInstance.post("/api/auth/register", {email:user.email});
            setUser({name:user.displayName, email:user.email, profilePic:user.photoURL, method:"google"});  
          navigate(location?.state?.from?.pathname || "/")
          })
          // const res = await axiosInstance.post("/api/auth/register", {inEmail, inPassword});
        }

    const handelEmail= async() => {
      if(!inputRef.current.value){
        toast.error("Please type your email")
        return
      }
        // const email = inputRef.current.value
        // setEmail(email)
        navigate("/forgat-password")
    }

    return (
        <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login | Dine Flow</title>
            </Helmet>
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-green-400 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-extrabold text-green-400">
                  Login
                </h1>
                <p className="text-[12px] text-gray-500">
                  Hey enter your details to login your account
                </p>
              </div>
              <div className="w-full flex-1 mt-8">
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs flex flex-col gap-4">
                  <input
                    className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name='email'
                    ref={inputRef}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                  <div className='relative'>
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={toggleShow ? "text" : "password"}
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <div className='absolute top-[14px] right-[10px] cursor-pointer select-none' onClick={() => setToggleShow(!toggleShow)}>
                {
                  toggleShow ?  <FaEye className='text-lg'/> : <FaEyeSlash className='text-lg'/>
                }
                </div>
                </div>
                  <Link onClick={handelEmail} className='underline text-xs cursor-pointer hover:text-green-400 text-start'>Forget password?</Link>
                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-gray-100 w-full py-4 rounded-lg hover:bg-green-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    <span className="ml-3">Login</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to={'/register'}>
                      <span className="text-green-400 font-semibold">Register</span>
                    </Link>
                  </p>
                  <hr />
                  <div onClick={handleGmailLogin} className='btn bg-green-400 text-white'><FaGoogle/> Google</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LoginPage;