import mongoose from "mongoose";


const productSchema = mongoose.Schema({
    userName: {
        type:String,
        // required: true
    },
    userEmail: {
        type:String,
        // required: true
    },
    productName:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        // required:true
    },
    quantity:{
        type:Number,
        // required:false
    },
    image: {
        type:String,
        // required:true
    },
    category:{
        type:String,
        // required:true
    },
    productOrigin:{
        type:String,
        // required:true
    },
    details:{
        type:String,
        // required:true
    },
    tags:{
        type:Array,
        // required:true
    },
    ingredients:{
        type:Array,
        // required:true
    },
    rating:{
        type:Number,
        // required:true
    },
    purchased: {
        type:Number,
        // required:false
    },
    
},{timestamps: true})

export const Product = mongoose.model("Product", productSchema)


const purchasedProductSchema = mongoose.Schema({
    productName: String,
    price:Number,
    quantity: Number,
    image:String,
    buyerName:String,
    buyerEmail:String,
    foodOwner:String,
    buyingDate:Date,
})

export const Purchased = mongoose.model("Purchase", purchasedProductSchema)