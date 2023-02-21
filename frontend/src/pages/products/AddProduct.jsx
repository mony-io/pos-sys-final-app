import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [units, setUnits] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [status, setStatus] = useState([]);

  const [product, setProduct] = useState({
    category_id: "",
    brand_id: "",
    sub_id: "",
    unit_id: "",
    product_code: "",
    product_name: "",
    qty: "",
    unit_price: "",
    price: "",
    exp_date: "",
    product_image: "",
    desc: "",
    status: "",
    reorder_number: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:3001/brands");
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch units of product function
  async function fetchUnits() {
    try {
      const res = await axios.get("http://localhost:3001/product-units");
      setUnits(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchSupplies = async () => {
    try {
      const res = await axios.get("http://localhost:3001/supplier");
      setSupplies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await axios.get("http://localhost:3001/status");
      setStatus(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let formData = new FormData();
      formData.append("category_id", product.category_id);
      formData.append("brand_id", product.brand_id);
      formData.append("sub_id", product.sub_id);
      formData.append("unit_id", product.unit_id);
      formData.append("product_code", product.product_code);
      formData.append("product_name", product.product_name);
      formData.append("qty", product.qty);
      formData.append("unit_price", product.unit_price);
      formData.append("price", product.price);
      formData.append("exp_date", product.exp_date);
      formData.append("product_image", product.product_image);
      formData.append("desc", product.desc);
      formData.append("status", product.status);
      formData.append("reorder_number", product.reorder_number);

      const result = await axios.post(
        "http://localhost:3001/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (result.data.success) {
        playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
        toast.success(`${result.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
        toast.error(`${result.data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchUnits();
    fetchSupplies();
    fetchStatus();
  }, []);
  console.log(product);
  // console.log(supplies)
  return (
    <>
      <div className="flex-1 h-screen bg-slate-50">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">បន្ថែមផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-1 shadow-sm"></div>
          <div className="shadow bg-white rounded-sm">
            <h2 className="text-left ml-1 p-1">សូម! បំពេញពត៍មានខាងក្រោម</h2>
            <div className="flex justify-around mt-5">
              {/* column 1 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="category"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ប្រភេទផលិតផល
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                    name="category_id"
                    onChange={handleChange}
                  >
                    <option>ជ្រើសរើសប្រភេទ</option>
                    {categories.map((item, inext) => {
                      return (
                        <option value={item.id} key={inext + 1}>
                          {item.categoryName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductName"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ឈ្មោះផលិតផល
                  </label>
                  <input
                    type="text"
                    className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                    id="ProductName"
                    placeholder="ឈ្មោះ​ផលិតផល"
                    name="product_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductCode"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    កូដផលិតផល
                  </label>
                  <input
                    type="text"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    id="ProductCode"
                    placeholder="លេខកូដផលិតផល"
                    name="product_code"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductBrand"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ម៉ាកផលិតផល
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                    name="brand_id"
                    onChange={handleChange}
                  >
                    <option>ជ្រើសរើសម៉ាក</option>
                    {brands.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.brandName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="ProductUnit"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ឯកតាផលិតផល
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                    name="unit_id"
                    onChange={handleChange}
                  >
                    <option selected>ជ្រើសរើសឯកតាផលិតផល</option>
                    {units.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.unit}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              {/* end of column 1 */}

              {/* start column 2 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label htmlFor="UnitPrice inline-block mb-2 text-gray-700">
                    តម្លៃដើម
                  </label>
                  <input
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    name="unit_price"
                    id="UnitPrice"
                    placeholder="តម្លៃ​ដើម"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="outPrice"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    តម្លៃលក់ចេញ
                  </label>
                  <input
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    id="outPrice"
                    placeholder=" តម្លៃលក់ចេញ"
                    name="price"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="date"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ថ្ងៃខែផុតកំណត់
                  </label>
                  <input
                    type="date"
                    className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
                    name="exp_date"
                    id="date"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="status"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ស្ថានភាព
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                    id="status"
                    name="status"
                    onChange={handleChange}
                  >
                    <option selected>ស្ថានភាពផលិតផល</option>
                    {status.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.status}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="qtyAlert"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ការជូនដំណឹងអំពីបរិមាណ
                  </label>
                  <input
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    name="reorder_number"
                    id="qtyAlert"
                    placeholder="ការជូនដំណឹងអំពីបរិមាណ"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* end of column 2 */}

              {/* start column 3 */}
              <div className="flex-col mt-5">
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="qty"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ចំនួន
                  </label>
                  <input
                    type="number"
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    id="qty"
                    name="qty"
                    placeholder="ចំនួន"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="sup"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    អ្នកផ្គត់ផ្គង់
                  </label>
                  <select
                    className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-1.5
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
                    id="sup"
                    name="sub_id"
                    onChange={handleChange}
                  >
                    <option>ជ្រើសរើសអ្នកផ្គត់ផ្គង់</option>
                    {supplies.map((item, index) => {
                      return (
                        <option value={item.id} key={index + 1}>
                          {item.supName}{" "}
                          {item.companyName && `(${item.companyName})`}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="desc"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    ការបរិយាយ
                  </label>
                  <textarea
                    className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                  "
                    id="desc"
                    rows="3"
                    placeholder="សារ​របស់​អ្នក"
                    name="desc"
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-7 xl:w-96">
                  <label
                    htmlFor="photo"
                    className="form-label inline-block mb-2 text-gray-700"
                  >
                    រូបភាព
                  </label>
                  <input
                    className="form-control
                              block
                              w-full
                              px-3
                              py-1.5
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
                    type="file"
                    id="photo"
                    name="product_image"
                    onChange={(e) => {
                      setProduct((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.files[0],
                      }));
                    }}
                  />
                </div>
              </div>
              {/* end of column 3 */}
            </div>
            <div className="flex space-x-2 p-5 ml-[4rem]">
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={handleSubmit}
              >
                បញ្ជូន
              </button>
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                សម្អាត
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* toast message */}
      <ToastContainer />
    </>
  );
};

export default AddProduct;
