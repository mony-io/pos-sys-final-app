import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Pagination from "../pagination/Pagination";

const Category = () => {
  // search
  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    id: "",
    categoryName: "",
    desc: "",
  });

  // pagination
  const [todosPerPage, setTodosPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfTotalPages = Math.ceil(categories.length / todosPerPage);
  const pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstPage = indexOfLastTodo - todosPerPage;

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numberOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const visibleTodos = categories.slice(indexOfFirstPage, indexOfLastTodo);

  const [msg, setMsg] = useState("");
  const [colorStyle, setColorStle] = useState("");
  console.log(visibleTodos);

  // clear function
  function clearData() {
    setCategory({ categoryName: "", desc: "", id: "" });
    setMsg("");

    if (visibleTodos.length === 0) {
      // prevPageHandler()
    }
  }

  // clear function
  function clearData() {
    setCategory({ categoryName: "", desc: "", id: "" });
    setMsg("");
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //console.log(category)

  const createCategory = async () => {
    try {
      if (category.categoryName.trim() !== "") {
        const res = await axios.post(
          "http://localhost:3001/categories",
          category
        );
        // console.log(res)
        if (res.data.success) {
          clearData();
          setMsg(res.data.message);
          setColorStle("bg-green-100 text-green-700");
          fetchCategories();
        } else {
          clearData();
          setMsg(res.data.message);
          setColorStle("bg-red-100 text-red-700");
        }
      } else {
        setMsg("?????????! ?????????????????????????????????????????????????????????????????????");
        setColorStle("bg-red-100 text-red-700");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //console.log(category)
  // handle update function
  const handleUpdate = async () => {
    try {
      if (category.categoryName.trim() !== "") {
        const res = await axios.put(
          `http://localhost:3001/categories/${category.id}`,
          category
        );
        if (res.data.success) {
          clearData();
          setColorStle("bg-green-100 text-green-700");
          setMsg(res.data.message);
          fetchCategories();
        } else {
          clearData();
          setColorStle("bg-red-100 text-red-700");
          setMsg(res.data.message);
        }

        //console.log(res);
      } else {
        setColorStle("bg-red-100 text-red-700");
        setMsg("?????????! ?????????????????????????????????????????????????????????????????????");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/categories/${id}`);
      if (res.data.success) {
        toast.success(`???? ${res.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchCategories();
        clearData();
        if (currentPage !== numberOfTotalPages) prevPageHandler();
      } else {
        toast.error("???? Delete failed!", {
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
    fetchCategories();
  }, []);

  useEffect(() => {
    if (visibleTodos.length == 0) {
      prevPageHandler();
    }
  }, [numberOfTotalPages]);

  // React Pagination

  return (
    <>
      <div className="h-screen bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">????????????????????????????????????</h1>
          <div className="w-full h-1 bg-blue-400 mb-7 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <button
              className="hidden md:block ml-1 px-6 py-1.5 rounded font-medium tracking-wider bg-teal-400 text-neutral-900 hover:text-white hover:shadow"
              data-bs-toggle="modal"
              data-bs-target="#addCategory"
            >
              ??????????????????
            </button>
            <input
              className="hidden md:block bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded outline-none shadow-sm text-center p-2.5 hover:shadow mr-2"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="?????????????????????..."
              type="text"
              style={{ width: "20rem" }}
            />
            {/* add category model */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addCategory"
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={(e) => {
                if (e.target.id === "addCategory") {
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
                      ??????????????????????????????????????????????????????
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
                      ????????????????????????????????????
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
                      placeholder="?????????????????????????????????"
                      type="text"
                      name="categoryName"
                      onChange={handleChange}
                      value={category.categoryName}
                    />

                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label inline-block mb-2 text-gray-700 mt-5"
                    >
                      ????????????????????????
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
                      placeholder="?????????????????????????????????"
                      name="desc"
                      onChange={handleChange}
                      value={category.desc}
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
                      ??????????????????
                    </button>

                    {/* spin button */}

                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      onClick={createCategory}
                    >
                      ?????????????????????
                    </button>

                    {/* end of spin button */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of add model */}
          </div>
          <div className="rounded-lg shadow h-[630px] overflow-auto mt-6">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-md font-semibold tracking-wide text-center">
                    &#8470;
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ?????????????????????????????????
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ????????????????????????
                  </th>
                  <th>????????????????????????</th>
                </tr>
              </thead>
              <tbody>
                {visibleTodos
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.categoryName.toLowerCase().includes(search);
                  })
                  .map((item, index) => {
                    // console.log(item.id)

                    return (
                      <tr
                        className="text-center bg-white border-b-2 border-gray-100"
                        key={index + 1}
                      >
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.categoryName}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.desc}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <button
                            className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#updateCategory"
                            onClick={async () => {
                              try {
                                const res = await axios.get(
                                  `http://localhost:3001/categories/${item.id}`
                                );
                                setCategory(...res.data);
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            <BsPencilSquare size={20} />
                          </button>

                          {/* update brand model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="updateCategory"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLgLabel"
                            aria-modal="true"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-lg relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                  <h5
                                    className="text-xl font-medium leading-normal text-gray-800"
                                    id="updateBrand"
                                  >
                                    ?????????????????????????????????????????????????????????????????????
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5 text-left">
                                  <label
                                    htmlFor="unit"
                                    className="form-label inline-block mb-2 text-gray-700"
                                  >
                                    ????????????????????????????????????
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
                                    placeholder="Category Name"
                                    type="text"
                                    name="categoryName"
                                    value={category.categoryName}
                                    onChange={handleChange}
                                  />
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label inline-block mb-2 text-gray-700 mt-5"
                                  >
                                    ????????????????????????
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
                                    value={category.desc}
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
                                  >
                                    ?????????
                                  </button>

                                  {/* spin button */}

                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    onClick={handleUpdate}
                                  >
                                    ?????????????????????
                                  </button>

                                  {/* end of spin button */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of update model */}

                          <button
                            className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={async () => {
                              try {
                                const res = await axios.get(
                                  `http://localhost:3001/categories/${item.id}`
                                );
                                setCategory(...res.data);
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            <AiTwotoneDelete size={20} />
                          </button>

                          {/* delete model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="deleteModal"
                            //tabIndex="-1"
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
                                    Close
                                  </button>

                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-light text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    data-bs-dismiss={"modal"}
                                    aria-label="Close"
                                    onClick={(e) => {
                                      handleDelete(category.id);
                                      clearData();
                                    }}
                                  >
                                    Delete
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
        <ToastContainer />
      </div>
    </>
  );
};

export default Category;
