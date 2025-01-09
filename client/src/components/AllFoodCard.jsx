import React from 'react';
import ReactStars from "react-rating-stars-component";
import MainBtn from './MainBtn';
import { Link } from 'react-router-dom';

const AllFoodCard = ({food, highlightText, searchTerm}) => {
  const highlightedName = highlightText(food?.productName, searchTerm);
    const {_id, userName, userEmail, productName, price, quantity, image, category, productOrigin, details, tags, ingredients, rating, purchased} = food
    return (
      <div key={_id} className="bg-white dark:bg-gray-300 rounded-3xl shadow-lg p-5 group">
        <div className='h-[250px] rounded-3xl overflow-hidden object-center mb-5 '>
        <img className="w-full h-full object-cover" src={image} alt="" />
        </div>
        <p className="font-semibold" dangerouslySetInnerHTML={{ __html: highlightedName }}></p>
        <ReactStars
          count={5}
        //   onChange={ratingChanged}
          size={24}
          value={4}
          activeColor="#ea6a12"
        />
        <p className='font-semibold text-gray-400'>Available: {quantity}</p>
        <div className='flex items-center justify-between'>
        <p className="font-semibold text-lg text-primary pt-5 ">${price}</p>
        <Link to={`/food/${_id}`}><MainBtn text={"Details"}/></Link>
        </div>
      </div>
    );
};

export default AllFoodCard;