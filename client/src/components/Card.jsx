import React from "react";

function Card({ id, data, handleClick }) {
  return (
    <div className="h-64 w-64 flex flex-col" >
      <div
        className="h-[80%] w-full overflow-hidden rounded-lg relative hover:bg-opacity-0"
        onClick={()=>handleClick(data.photo)}
        style={{
          backgroundImage: `url(${data.photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <p className="flex justify-center items-center text-white font-semibold text-sm text-center opacity-100 transition-all duration-300  w-full h-full text-opacity-0 bg-gray-600 bg-opacity-0 hover:bg-opacity-60 hover:text-opacity-95">
          {data.prompt}{" "}
        </p>
      </div>
      <h2 className="h-[20%] w-full mt-2 text-center">{data.name}</h2>
    </div>
  );
}

export default Card;
