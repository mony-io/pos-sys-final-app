import React, { useState, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { HiMinus } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Modal, Button } from "antd";
import { useReactToPrint } from "react-to-print";
import PrintPayment from "../PrintPayment";

const Cart = (props) => {
  // PAYMENT
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "pay-data",
    // onAfterPrint: () => alert("Your Payment Printed Successfully!"),
  });

  const { cartItems, onAdd, onRemove, onChangeHandler, deleteHandler } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  //console.log(cartItems)
  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 200 ? 0 : 50;
  const totalPrice = itemsPrice; //+ taxPrice + shippingPrice

  // number of item
  const [itemNumber, setItemNumber] = useState(0);
  const [paid, setPaid] = useState(0);
  const [remain, setRemain] = useState(0);

  const calcPayment = () => {
    if (paid === 0 || paid === "") {
      setRemain(-totalPrice);
    } else {
      setRemain(Number(paid - totalPrice));
    }
  };

  // total item
  const totalItem = cartItems.reduce((pre, cur) => pre + cur.qty, 0);

  const [open, setOpen] = useState(false);
  // open modal function
  const showModal = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setPaid(0);
    setRemain(0);
  };

  useEffect(() => {
    if (cartItems.length >= 0) {
      setItemNumber(cartItems.length);
    }
  }, [cartItems.length]);

  return (
    <>
      <div className="col-span-4 overflow-auto scrollbar h-[60vh]">
        <div>
          {cartItems.length === 0 && (
            <div className="text-center pt-4 text-slate-500 font-semibold">
              គ្មានការលក់
            </div>
          )}
        </div>
        {cartItems.map((item) => (
          <div
            key={item.product_id}
            className="flex justify-between items-center p-2 text-slate-600"
          >
            <div className="text-sm w-[70px] ml-6">{item.product_name}</div>
            <div className="flex items-center">
              <GoPlus
                className="text-blue-500 mr-1 cursor-pointer"
                onClick={() => onAdd(item)}
              />
              <input
                value={item.qty !== "" ? parseInt(item.qty) : ""}
                className="w-9 border outline-none border-gray-300 text-center text-sm"
                type={"text"}
                onChange={(e) => onChangeHandler(item, e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                  }
                }}
              />
              <HiMinus
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => onRemove(item)}
              />
            </div>
            <span className="text-sm w-6">${item.price * item.qty}</span>
            <div className="text-center">
              <RxCross2
                className="text-red-500 mr-8 cursor-pointer text-xl"
                onClick={() => {
                  deleteHandler(item);
                }}
              />
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
                <button onClick={onClose}>
                  <span className="bg-red-500 w-full p-2 px-6 hover:bg-red-600 duration-200 text-[#fff] rounded-sm shadow-sm text-lg text-center cursor-pointer">
                    បោះបង់
                  </span>
                </button>
                <button onClick={showModal}>
                  <span className="bg-green-500 w-full p-2 px-6 ml-1 hover:bg-green-600 duration-200 text-[#fff] rounded-sm shadow-sm text-lg text-center cursor-pointer">
                    ការទូទាត់
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* payment */}
      <Modal
        title={<h1 className="text-blue-500 text-xl">ការទូទាត់ប្រាក់</h1>}
        width={800}
        className="modal-font"
        open={open}
        onCancel={onClose}
        footer={[
          <Button
            id="modal-font"
            key="cancel"
            type="button"
            className="bg-red-500 text-white leading-tight rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out ml-1 text-md"
            onClick={onClose}
          >
            បេាះបង់
          </Button>,
          <Button
            id="modal-font"
            onClick={handlePrint}
            key="submit"
            type="button"
            className="bg-blue-600 text-white text-md leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
          >
            យល់ព្រម
          </Button>,
        ]}
      >
        {/* ======== content ======== */}
        <div className="grid grid-cols-2 bg-blue-500 pb-4 rounded-lg justify-items-center mt-5">
          <div className="mt-4 flex justify-around w-1/2">
            <h3 className="text-lg text-white">ចំនួនសរុប</h3>
            <span className="text-lg text-white">
              {itemNumber} ( {totalItem} )
            </span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-3 text-white">ចំណាយសរុប</h3>
            <span className="text-lg text-white">{totalPrice}$</span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-3 text-white">ទឹកប្រាក់សរុប</h3>
            <span className="text-lg text-white">{paid}$</span>
          </div>
          <div className="mt-4 flex justify-around w-1/2 whitespace-nowrap">
            <h3 className="text-lg mr-2 text-white">នៅសល់</h3>
            <span className="text-lg text-white">{remain}$</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5 mb-8">
          <div>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              ទឹកប្រាក់ (KH)
            </label>
            <input
              className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder=""
              id="exampleFormControlInput1"
              name="newPassword"
              type={"number"}
              value={paid}
              onChange={(e) => {
                setPaid(e.target.value);
              }}
              onKeyUp={(e) => {
                calcPayment();
              }}
            />
          </div>
          <div>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              បង់ដោយ
            </label>
            <select
              className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              defaultValue={""}
            >
              <option>ការបង់ប្រាក់</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block text-gray-700 mb-2 text-lg"
            >
              ចំណាំ
            </label>
            <input
              className="form-control
                                block
                                w-full
                                px-4
                                py-2
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder=""
              id="exampleFormControlInput1"
              name="newPassword"
              type={"text"}
            />
          </div>
        </div>
        {/* ========= end of content ==== */}
        <div className="hidden mr-16">
          <PrintPayment componentRef={componentRef} />
        </div>
      </Modal>
      {/* end of payemnt */}

      {/* Payment print */}
    </>
  );
};

export default Cart;
