import {create} from 'zustand'
import { axiosInstance } from '../utils/axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { GoogleAuthProvider } from "firebase/auth";

// const navigate = useNavigate()
const provider = new GoogleAuthProvider();

export const authStore = create((set, get) => ({
  user: null,
  users: [],
  isLoading: true,

  // actions

  setIsLoading: (data) => {
    set({isLoading:data})
  },
  setUser: (data) => {
    set({user:data})
  },

  // checkAuth: async () => {
  //   try {
  //   const res = await axiosInstance.get("/api/auth/check-auth");
  //   set({ user: res.data });
  //   set({isLoading:false})
  //   } catch (error) {
  //   }finally{
  //   set({isLoading:false})
  //   }
  // },

  register: async(email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    
    // const res = await axiosInstance.post("/api/auth/register", {email, password, name, profilePic});
    // if(res.data.success === false) {
    //     toast.error(res.data.message)
    // }
    // set({ user: res.data.user });
    // toast.success(res.data.message)
    // navigate("/")
  },
  login: async(email, password) => {
    return signInWithEmailAndPassword(auth, email, password)

    // const res = await axiosInstance.post("/api/auth/login", user)
    // if(res.data.success === false) {
    //     //  toast.error(res.data.message)
    // }
    // set({ user: res.data.user });
    // toast.success(res.data.message)
    // navigate(location?.state?.from?.pathname || "/")
  },

  // logOut: async () => {
  //   const res = await axiosInstance.post("/api/auth/logout")
  //   set({user:null})
  //   toast.success("Logged out")
  //   set({isLoading:false})
  // },

  googleLogin: () => {
    return signInWithPopup(auth, provider)
    
  },

  googleLogOut: async() => {
    return signOut(auth)
  },

  updateUser: (updatedUser) => {
    return updateProfile(auth.currentUser, updatedUser)
  },

  checkAuth: () => {
    
  }

  

}));