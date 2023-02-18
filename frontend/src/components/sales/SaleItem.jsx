import React from "react";

const SaleItems = (props) => {
  const { product, onAdd } = props;
  //console.log(product)
  return (
    <div
      className="row-span-1 border border-slate-500 cursor-pointer overflow-hidden rounded-sm shadow-md"
      onClick={() => onAdd(product)}
    >
      <img
        //src={`http://localhost:3001/${product.product_image}`}
        src={product.product_image}
        alt="img"
        className="bg-[#555] rounded-sm object-cover h-[110px] w-[200px] hover:scale-105 duration-300"
      />
      <div className="bg-cyan-600 p-[2px] mt-[2px] rounded-sm flex justify-center overflow-hidden z-20">
        <span className="pt-[3px] text-sm text-[#fff]">
          {product.product_name}
        </span>
      </div>
    </div>
  );
};

export default SaleItems;
