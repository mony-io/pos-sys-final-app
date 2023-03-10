import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import Cart from "../components/sales/Cart";
import Main from "../components/sales/Main";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Space, Spin } from "antd";
import { useQuery } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:3001/product_card");
  return data;
};

const Sale = () => {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const { data, isLoading } = useQuery("products_card", fetchProducts);
  //console.log(cartItems)

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && x.qty < x.old_qty
            ? { ...exist, qty: parseInt(exist.qty + 1) }
            : x
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: 1, old_qty: product.qty },
      ]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist.qty === 1 || exist.qty === "") {
      setCartItems(
        cartItems.filter((x) => x.product_id !== product.product_id)
      );
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id
            ? { ...exist, qty: exist.qty - 1 }
            : x
        )
      );
    }
  };

  const onChangeHandler = (product, qty) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.product_id === product.product_id && qty <= x.old_qty
            ? { ...exist, qty: qty }
            : x
        )
      );

      if (qty > exist.old_qty) {
        playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
        toast.error("???? ??????????????????????????????!?????????????????????????????????????????????????????????????????????????????????????????????????????????", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      setCartItems([
        ...cartItems,
        { ...product, qty: qty, old_qty: product.qty },
      ]);
    }
  };

  const deleteHandler = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.product_id);
    if (exist) {
      setCartItems(
        cartItems.filter((x) => x.product_id !== product.product_id)
      );
    }
  };

  return (
    <>
      <div className="flex-1">
        <Navbar />
        <div className="grid grid-cols-6 gap-x-4 pl-4 pr-4 pt-4 h-[88vh]">
          <div className="col-span-2 mr-6 bg-blue-50">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4 h-[38px] pt-[4px] px-1">
                <div className="flex">
                  <select
                    name=""
                    id=""
                    className="w-full h-[42px] outline-none border border-gray-300 shadow-sm overflow-hidden p-1 bg-gray-50 rounded-sm"
                  >
                    <option value="all">??????????????????</option>
                    <option value="all">??????????????????</option>
                  </select>
                </div>
              </div>
              <div className="col-span-4">
                <div className="grid grid-cols-4 gap-4 px-1">
                  <div className="col-span-4 flex justify-between rounded-sm pt-3 shadow-sm bg-[#333] p-2 items-center text-[#fff]">
                    <span className="ml-6">??????????????????</span>
                    <span>???????????????</span>
                    <span>???????????????</span>
                    <span className="text-[#fff] mr-8">
                      <AiFillDelete size={22} />
                    </span>
                  </div>
                  <Cart
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onChangeHandler={onChangeHandler}
                    deleteHandler={deleteHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 -ml-6 overflow-auto scrollbar h-[88vh] bg-blue-50">
            <div className="h-12 px-1 flex justify-between items-center">
              <div className="flex items-center rounded-sm overflow-hidden">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="search"
                  placeholder="?????????????????????"
                  className="p-[10px] outline-none w-64 text-sm text-center bg-gray-50 border rounded-sm border-gray-300 shadow-sm"
                />
              </div>
              <div className="flex">
                <select
                  id="default"
                  class="shadow-sm rounded-sm bg-gray-50 border outline-none w-64 border-gray-300 text-gray-900 text-sm px-2 py-[6px] block"
                >
                  <option selected>???????????????</option>
                  <option value="US">????????????</option>
                  <option value="CA">?????????</option>
                  <option value="FR">?????????????????????</option>
                  <option value="DE">???????????????????????????</option>
                </select>
              </div>
            </div>
            {!isLoading ? (
              <Main products={data} onAdd={onAdd} search={search} />
            ) : (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space className="grid items-center mt-[300px]">
                  <Spin tip="Loading" size="large" className="text-black">
                    <div className="content" />
                  </Spin>
                </Space>
              </Space>
            )}
          </div>
        </div>
        {/* toast message */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Sale;
