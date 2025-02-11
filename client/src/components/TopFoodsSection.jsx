import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { useStore } from "zustand";
import { foodStore } from "../store/foodStore";
import { axiosInstance } from "../utils/axios";
import { Link } from "react-router-dom";
import MainBtn from "./MainBtn";
import CardSkeleton from "./CardSkeleton";

const TopFoodsSection = () => {
  // const {foods} = useStore(foodStore)
  const [foods, setFoods] = useState();
  const sortBy = "purchased";
  const order = "dsc";
  useEffect(() => {
    const fetchSort = async () => {
      const res = await axiosInstance.post(
        `/api/sorted-data?sortBy=${sortBy}&order=${order}&limit=${6}`
      );
      setFoods(res.data);
    };
    fetchSort();
  }, []);
  return (
    <div className="md:mx-10 mx-3">
      <h1 className="font-serif text-4xl dark:text-white">Top Foods</h1>
      {!foods ? (
        <CardSkeleton />
      ) : (
        <div className="grid lg:grid-cols-4 gap-10 items-start mt-10">
          {foods?.map((food, i) => (
            <FoodCard key={i} food={food} />
          ))}
        </div>
      )}
      <Link to={"/all-foods"}>
        <div className="w-40 mt-10 mx-auto">
          <MainBtn text={"See All"} />
        </div>
      </Link>
    </div>
  );
};

export default TopFoodsSection;
