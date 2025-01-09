import {create} from 'zustand'
import { axiosInstance } from '../utils/axios'
import toast from 'react-hot-toast'

export const foodStore = create((set, get) => ({
    // states 
    foods:[],
    purchased:[],


    // actions
    addFood: async (food, form, setTags, setList, setUser) => {
        try {
          const res = await axiosInstance.post("/api/add-product", food)
        // set({foods:res.data.product})
        toast.success(res.data.message)
        form.reset()
        setTags([])
        setList([])
        } catch (error) {
          console.log(error);
        }
    },

    allFoods: async () => {
        try {
          const res = await axiosInstance.get("/api/all-products")
        set({foods:res.data})
        } catch (error) {
          console.log(error);
          
        }
    },

    updateFood: async (id, updatedProduct, navigate) => {
      try {
        const res = axiosInstance.put(`/api/update-product/${id}`, updatedProduct)
        console.log(res);
        // toast.success(res.data.message)
        navigate(`/food/${id}`)
      } catch (error) {
        console.log(error);
        
      }  
    },

    addPurchase: async (purchase) => {
        try {
            const res = await axiosInstance.post("/api/add-purchase", purchase)
            console.log(res);
            toast.success(res.data.message)
        } catch (error) {
            console.log(error);
            
        }
    }
}))