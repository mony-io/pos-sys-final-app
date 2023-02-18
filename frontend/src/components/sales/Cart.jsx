import React from "react";

const Cart = (props) => {
  const { cartItems, onAdd, onRemove, onChangeHandler } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 200 ? 0 : 50;
  const totalPrice = itemsPrice; //+ taxPrice + shippingPrice

  return (
    <>
      <div className="col-span-4 overflow-auto scrollbar h-[470px]">
        <div>
          {cartItems.length === 0 && (
            <div className="text-center mt-4 text-slate-500 font-semibold">
              គ្មានការលក់
            </div>
          )}
        </div>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex justify-between items-center m-2 text-slate-600"
          >
            <div className="text-sm w-[70px] ml-6">{item.product_name}</div>
            <input
              value={item.qty}
              className="w-9 border outline-none border-gray-300 text-center text-sm"
              type={"text"}
              onChange={(e) => onChangeHandler(item, e.target.value)}
            />
            <span className="text-sm w-6">${item.price * item.qty}</span>
            <div className="mr-1">
              <button
                className="mr-1 text-xl bg-blue-400 p-[5.5px] pt-0 pb-0 rounded"
                onClick={() => onAdd(item)}
              >
                +
              </button>
              <button
                className="mr-1 text-xl bg-red-400 p-2 pt-0 pb-0 rounded"
                onClick={() => onRemove(item)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-4 row-span-2 h-24">
        <div className="grid grid-cols-4 gap-4">
          <div className="border col-span-4 text-sm flex justify-between px-1 pt-1 pb-1 ">
            <span className="font-semibold">តម្លៃ</span>
            <span>${itemsPrice.toFixed(2)}</span>
            {/* <span className="font-semibold">Tax</span>${taxPrice.toFixed(2)} */}
          </div>
          <div className="border col-span-4 text-sm flex justify-between px-1 pt-1 pb-1">
            {/* <span className="font-semibold ml-4">Shipping</span>$ */}
            {/* {shippingPrice.toFixed(2)} */}
            <span className="font-semibold">សរុប</span>${totalPrice.toFixed(2)}
          </div>
          <div className="col-span-4">
            <div className="grid grid-cols-3 gap-x-1 h-auto">
              {/* <div className="col-span-1 flex flex-col">
                <span className="bg-yellow-500 h-9 text-center pt-2">
                  Suspend
                </span>
                <span className="bg-red-400 h-9 text-center pt-2">Cancel</span>
              </div>
              <div className="col-span-1 flex flex-col">
                <span className="bg-blue-300 h-9 text-center pt-2">Order</span>
                <span className="bg-blue-500 h-9 text-center pt-2">Bill</span>
              </div> */}
              <div className="col-span-4 flex pr-1 justify-end items-center">
                <button>
                  <span className="bg-red-500 w-full p-2 px-6 hover:bg-red-600 duration-200 text-[#fff] rounded-sm shadow-sm text-lg text-center cursor-pointer">
                    បោះបង់
                  </span>
                </button>
                <button>
                  <span className="bg-green-500 w-full p-2 px-6 ml-1 hover:bg-green-600 duration-200 text-[#fff] rounded-sm shadow-sm text-lg text-center cursor-pointer">
                    ការទូទាត់
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
