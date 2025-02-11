import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import pizza from "../../assets/pizza-category.png";
import fruits from "../../assets/vegetables-category.png";
import burger from "../../assets/burger-category.png";
import vegetables from "../../assets/fruits-category.png";
import snacks from "../../assets/snack-category.png";
import drinks from "../../assets/drink-category.png";
import soup from "../../assets/soup-category.png";
import steak from "../../assets/steak-category.png";
import rice from "../../assets/rice-category.png";

import "./style.css";
import FoodCard from "../FoodCard";
import { useStore } from "zustand";
import { foodStore } from "../../store/foodStore";
import { axiosInstance } from "../../utils/axios";
import CardSkeleton from "../CardSkeleton";

export const category = [
  {
    name: "Pizza",
    img: pizza,
  },
  {
    name: "Fruits",
    img: fruits,
  },
  {
    name: "Burger",
    img: burger,
  },
  {
    name: "Veggie",
    img: vegetables,
  },
  {
    name: "Snacks",
    img: snacks,
  },
  {
    name: "Drinks",
    img: drinks,
  },
  {
    name: "Soup",
    img: soup,
  },
  {
    name: "Rice",
    img: rice,
  },
  {
    name: "Steak",
    img: steak,
  },
];

const CategorySection = () => {
  const { foods } = useStore(foodStore);
  const [categoryFood, setCategoryFood] = useState();
  const [categoryActive, setCategoryActive] = useState("Pizza");
  const handleCategoryProduct = async (cat) => {
    const res = await axiosInstance.get(
      `/api/category-product?category=${cat}`
    );
    setCategoryFood(res.data);
    setCategoryActive(cat);
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axiosInstance.get(
        `/api/category-product?category=${"Pizza"}`
      );
      setCategoryFood(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="md:mx-10">
      <h1 className="font-serif text-4xl ml-3 md:ml-0 dark:text-white">
        Menu Category
      </h1>
      <div className="flex items-center justify-start py-5 gap-5 md:gap-10 overflow-x-auto whitespace-nowrap  w-[100%] scroll-smooth">
        {category?.map((item, i) => (
          <div
            onClick={() => handleCategoryProduct(item.name || "Pizza")}
            key={i}
            className={`${
              categoryActive === item.name ? " border-primary" : "border-white"
            } shadow-lg category-main cursor-pointer group hover:bg-primary transition-all duration-300 ease-in-out border-4 bg-white  flex flex-col items-center justify-center rounded-xl p-4 md:p-7 gap-2 md:gap-4 dark:bg-slate-400`}
          >
            <img className="w-[60px] md:w-[100px]" src={item.img} alt="" />
            <p className="font-semibold group-hover:text-white">{item.name}</p>
            <hr className="w-[100px] group-hover:hover:w-[50px] bg-primary h-[2px]" />
            <div className="bg-primary md:w-10 md:h-10 rounded-full flex items-center justify-center p-1 group-hover:bg-white group-hover:animate-bounce ">
              <IoIosArrowForward className="text-white font-bold text-xl group-hover:text-primary" />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xl text-red-400 text-center">
        {categoryFood?.length === 0 && "No food at this category"}
      </p>
      {!categoryFood ? (
        <CardSkeleton />
      ) : (
        <div className="grid lg:grid-cols-4 gap-10 items-start mt-10 mx-3">
          {categoryFood?.map((food, i) => (
            <FoodCard key={i} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
