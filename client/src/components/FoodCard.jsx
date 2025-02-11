import React from 'react';
import ReactStars from "react-rating-stars-component";
import MainBtn from './MainBtn';
import { Link } from 'react-router-dom';

const FoodCard = ({food}) => {
    const {_id, userName, userEmail, productName, price, quantity, image, category, productOrigin, details, tags, ingredients, rating, purchased} = food
    return (
      <div key={_id} className="bg-white rounded-3xl shadow-lg p-5 group dark:bg-slate-400 ">
        <div className='h-[250px] rounded-3xl overflow-hidden object-center mb-5 relative'>
        <img className="w-full h-full object-cover " src={image} alt="" />
        <p className='text-xs bg-primary py-1 px-2 rounded-full text-white absolute top-3 left-[200px] md:left-[270px]'>Purchased: {purchased}</p>
        </div>
        <p className="font-semibold">{productName}</p>
        <ReactStars
          count={5}
        //   onChange={ratingChanged}
          size={24}
          value={4}
          activeColor="#ea6a12"
        />
        <div className='flex items-center justify-between'>
        <p className="font-semibold text-lg text-primary pt-5 ">${price}</p>
        
        <Link to={`/food/${_id}`}><MainBtn text={"Details"}/></Link>
        </div>
      </div>
    );
};

export default FoodCard;