import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Pagination from "../../pagination/Pagination";

const ProductBrands = () => {
  // search
  const [search, setSearch] = useState("");

  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState({ brandName: "", desc: "", id: "" });

  // pagination
  const [todosPerPage, setTodosPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfTotalPages = Math.ceil(brands.length / todosPerPage);
  const pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstPage = indexOfLastTodo - todosPerPage;

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numberOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const visibleTodos = brands.slice(indexOfFirstPage, indexOfLastTodo);

  const [msg, setMsg] = useState("");
  const [colorStyle, setColorStle] = useState("");

  const handleChange = (e) => {
    setBrand((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (visibleTodos.length == 0) {
      prevPageHandler();
    }
  }, [numberOfTotalPages]);

  // clear function
  function clearData() {
    setBrand({ brandName: "", desc: "" });
    setMsg("");
  }

  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:3001/brands");
      setBrands(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createBrand = async () => {
    try {
      if (brand.brandName.trim() !== "") {
        const res = await axios.post("http://localhost:3001/brands", brand);
        // console.log(res)
        if (res.data.success) {
          clearData();
          setMsg(res.data.message);
          setColorStle("bg-green-100 text-green-700");
          fetchBrands();
        } else {
          clearData();
          setMsg(res.data.message);
          setColorStle("bg-red-100 text-red-700");
        }
      } else {
        setMsg("Please! Enter brand name.");
        setColorStle("bg-red-100 text-red-700");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // handle update function
  const handleUpdate = async () => {
    try {
      if (brand.brandName.trim() !== "") {
        const res = await axios.put(
          `http://localhost:3001/brands/${brand.id}`,
          brand
        );
        if (res.data.success) {
          clearData();
          setColorStle("bg-green-100 text-green-700");
          setMsg(res.data.message);
          fetchBrands();
        } else {
          clearData();
          setColorStle("bg-red-100 text-red-700");
          setMsg(res.data.message);
        }

        //console.log(res);
      } else {
        setColorStle("bg-red-100 text-red-700");
        setMsg("Please! Enter brand name.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/brands/${id}`);
      if (res.data.success) {
        toast.success(`🦄 ${res.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchBrands();
      } else {
        toast.error("🦄 Delete failed!", {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <div className="h-screen bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">ម៉ាកផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-7 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <button
              className="hidden md:block ml-1 px-6 py-1.5 rounded font-medium tracking-wider bg-teal-400 text-neutral-900 hover:text-white hover:shadow"
              data-bs-toggle="modal"
              data-bs-target="#addBrand"
            >
              បន្ថែម
            </button>
            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              placeholder="ស្វែងរក..."
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              style={{ width: "20rem" }}
            />
            {/* add brand model */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addBrand"
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={(e) => {
                if (e.target.id === "addBrand") {
                  clearData();
                }
              }}
            >
              <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                  <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <h5
                      className="text-xl font-medium leading-normal text-gray-800"
                      id="exampleModalLgLabel"
                    >
                      បន្ថែមម៉ាកផលិតផល
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={clearData}
                    ></button>
                  </div>
                  <div className="modal-body relative p-4 mt-5 mb-5">
                    <label
                      htmlFor="unit"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Brand name
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
                                        focus:text-gray-700 
                                        focus:bg-white focus:border-blue-600 
                                        focus:outline-none"
                      placeholder="brand name"
                      id="brand"
                      type="text"
                      name="brandName"
                      onChange={handleChange}
                      value={brand.brandName}
                    />

                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label inline-block mb-2 text-gray-700 mt-5"
                    >
                      Description
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
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Your message"
                      name="desc"
                      onChange={handleChange}
                      value={brand.desc}
                    ></textarea>
                    {/* ====== alert message ===== */}
                    {msg && (
                      <div
                        className={`rounded py-1 text-center text-base mt-1 ${colorStyle}`}
                        role="alert"
                      >
                        {msg}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      data-bs-dismiss="modal"
                      onClick={clearData}
                    >
                      Close
                    </button>

                    {/* spin button */}

                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={createBrand}
                    >
                      submit
                    </button>

                    {/* end of spin button */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of add model */}
          </div>
          <div className="rounded-lg shadow overflow-auto hidden md:block mt-6 h-[520px]">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    &#8470;
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ម៉ាក់ផលិតផល
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ការពណ៌នា
                  </th>
                  <th>ប្រតិបត្តការ</th>
                </tr>
              </thead>
              <tbody>
                {visibleTodos
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.brandName.toLowerCase().includes(search);
                  })
                  .map((item, index) => {
                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={index + 1}
                      >
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.brandName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.desc}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#updateBrand"
                            onClick={async () => {
                              const res = await axios.get(
                                `http://localhost:3001/brands/${item.id}`
                              );
                              //console.log(res.data)
                              setBrand(...res.data);
                            }}
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          {/* update brand model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="updateBrand"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLgLabel"
                            aria-modal="true"
                            role="dialog"
                            onClick={(e) => {
                              if (e.target.id === "addBrand") {
                                clearData();
                              }
                            }}
                          >
                            <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                  <h5
                                    className="text-xl font-medium leading-normal text-gray-800"
                                    id="updateBrand"
                                  >
                                    កែរប្រែម៉ាក
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={clearData}
                                  ></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5 text-left">
                                  <label
                                    htmlFor="unit"
                                    className="form-label inline-block mb-2 text-gray-700"
                                  >
                                    ឈ្មោះម៉ាក់
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
                                                                    focus:text-gray-700 
                                                                    focus:bg-white focus:border-blue-600 
                                                                    focus:outline-none"
                                    placeholder="brand name"
                                    id="brand"
                                    type="text"
                                    name="brandName"
                                    onChange={handleChange}
                                    value={brand.brandName}
                                  />
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label inline-block mb-2 text-gray-700 mt-5"
                                  >
                                    ការពណ៌នា
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
                                                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    placeholder="Your message"
                                    name="desc"
                                    value={brand.desc}
                                    onChange={handleChange}
                                  ></textarea>
                                  {/* ====== alert message ===== */}
                                  {msg && (
                                    <div
                                      className={`rounded py-1 text-center text-base mt-1 ${colorStyle}`}
                                      role="alert"
                                    >
                                      {msg}
                                    </div>
                                  )}
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-gray-200 rounded-b-md">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                    onClick={clearData}
                                  >
                                    Close
                                  </button>

                                  {/* spin button */}

                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    onClick={handleUpdate}
                                  >
                                    Update
                                  </button>

                                  {/* end of spin button */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of add model */}
                          <button
                            className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                          >
                            <AiTwotoneDelete size={20} />
                          </button>
                          {/* delete model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="deleteModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                  <h5
                                    className="text-xl font-medium leading-normal text-red-500"
                                    id="exampleModalScrollableLabel"
                                  >
                                    Delete Brand
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body relative p-4">
                                  <h2>Are you sure? You want to delete...!</h2>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                  >
                                    No, Keep it
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-light text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    data-bs-dismiss={"modal"}
                                    aria-label="Close"
                                    onClick={() => {
                                      handleDelete(item.id);
                                    }}
                                  >
                                    Yes, Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of delete modal */}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <Pagination
            pages={pages}
            setTodosPerPage={setTodosPerPage}
            nextPageHandler={nextPageHandler}
            prevPageHandler={prevPageHandler}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        {/* toast message */}
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductBrands;
