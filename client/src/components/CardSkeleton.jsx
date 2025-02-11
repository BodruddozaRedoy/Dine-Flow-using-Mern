import React from "react";

const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
      {
        [...Array(4)].map((_,i) => (
            <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-60 w-full"></div>
        <div className="skeleton h-6 w-28"></div>
        <div className="skeleton h-6 w-full"></div>
        <div className="skeleton h-6 w-full"></div>
      </div>
        ))
      }
    </div>
  );
};

export default CardSkeleton;
