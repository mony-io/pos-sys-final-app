import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar";
import Pagination from "../../pagination/Pagination";

const ProductUnit = () => {
  // search
  const [search, setSearch] = useState("");

  const [units, setUnits] = useState([]);
  const [unit, setUnit] = useState({
    unit: "",
    id: "",
  });

  // pagination
  const [todosPerPage, setTodosPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfTotalPages = Math.ceil(units.length / todosPerPage);
  const pages = [...Array(numberOfTotalPages + 1).keys()].slice(1);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstPage = indexOfLastTodo - todosPerPage;

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numberOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const visibleTodos = units.slice(indexOfFirstPage, indexOfLastTodo);

  useEffect(() => {
    if (visibleTodos.length == 0) {
      prevPageHandler();
    }
  }, [numberOfTotalPages]);

  const [msg, setMsg] = useState("");
  const [colorStyle, setColorStle] = useState("");
  const [spin, setSpin] = useState(false);
  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
  // fetch units of product function
  async function fetchUnits() {
    try {
      const res = await axios.get("http://localhost:3001/product-units");
      setUnits(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // handle change function
  const handleChange = (e) => {
    setUnit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // add unit function
  async function addUnit() {
    try {
      if (unit.unit === "") {
        setColorStle("bg-red-100 text-red-700");
        setMsg("Please! Enter unit name.");
      } else {
        setSpin(true);
        const res = await axios.post(
          "http://localhost:3001/product-units",
          unit
        );
        if (res.data.success) {
          setUnit({ unit: "" });
          setColorStle("bg-green-100 text-green-700");
          setMsg(res.data.message);
          fetchUnits();
        } else {
          setUnit({ unit: "" });
          setColorStle("bg-red-100 text-red-700");
          setMsg(res.data.message);
        }
        //console.log(res);
        setSpin(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // handle update function
  const handleUpdate = async () => {
    try {
      if (unit.unit.trim() !== "") {
        const res = await axios.put(
          `http://localhost:3001/product-units/${unit.id}`,
          unit
        );
        if (res.data.success) {
          setUnit({ unit: "" });
          setColorStle("bg-green-100 text-green-700");
          setMsg(res.data.message);
          fetchUnits();
        } else {
          setUnit({ unit: "", id: unit.id });
          setColorStle("bg-red-100 text-red-700");
          setMsg(res.data.message);
        }

        //console.log(res);
      } else {
        setColorStle("bg-red-100 text-red-700");
        setMsg("Please! Enter unit name.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/product-units/${id}`
      );
      if (res.data.success) {
        playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
        toast.success("🦄 Unit has been deleted successfully.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        fetchUnits();
      } else {
        playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
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
    fetchUnits();
  }, []);

  return (
    <>
      <div className="bg-gray-100 flex-1">
        <Navbar />
        <div className="p-5">
          <h1 className="text-xl mb-4 text-left">ឯកតាផលិតផល</h1>
          <div className="w-full h-1 bg-blue-400 mb-7 shadow-sm"></div>
          <div className="flex justify-between mb-3">
            <button
              className="hidden md:block ml-1 px-6 py-1.5 rounded font-medium tracking-wider bg-teal-400 text-neutral-900 hover:text-white hover:shadow"
              data-bs-toggle="modal"
              data-bs-target="#addUnit"
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
            {/* add unit model */}
            <div
              className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
              id="addUnit"
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={(e) => {
                if (e.target.id === "addUnit") {
                  setMsg("");
                  setUnit({ unit: "" });
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
                      Add Unit
                    </h5>
                    <button
                      type="button"
                      className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        setMsg("");
                        setUnit({ unit: "" });
                      }}
                    ></button>
                  </div>
                  <div className="modal-body relative p-4 mt-5 mb-5">
                    <label
                      htmlFor="unit"
                      className="form-label inline-block mb-2 text-gray-700"
                    >
                      Product Unit
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
                      placeholder="Unit Name"
                      id="unit"
                      type="text"
                      onChange={handleChange}
                      value={unit.unit}
                      name="unit"
                    />
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
                      onClick={() => {
                        setUnit({ unit: "" });
                        setMsg("");
                      }}
                    >
                      Close
                    </button>

                    {/* spin button */}
                    {spin ? (
                      <button
                        type="button"
                        className="inline-block px-8 py-1.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                      >
                        <div
                          className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-blue-100"
                          role="status"
                        ></div>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        onClick={addUnit}
                      >
                        submit
                      </button>
                    )}
                    {/* end of spin button */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of add model */}
          </div>
          <div className="rounded shadow mt-6 h-[500px]">
            <table className="w-full table-auto">
              <thead className="bg-gray-50 border-gray-200">
                <tr className="border-b bg-blue-100 border-blue-200">
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ID
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-center">
                    ឯកតាផលិតផល
                  </th>
                  <th>ប្រតិបត្តការ</th>
                </tr>
              </thead>
              <tbody>
                {visibleTodos
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : item.unit.toLowerCase().includes(search);
                  })
                  .map((item, index) => {
                    return (
                      <tr
                        className="text-center bg-white border-b hover:bg-gray-100"
                        key={index + 1}
                      >
                        <td className="p-3 text-sm text-blue-500 font-bold whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.unit}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            className="mx-2 px-3 py-1.5 rounded font-medium tracking-wider text-blue-700 bg-blue-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUnit"
                            onClick={async () => {
                              const res = await axios.get(
                                `http://localhost:3001/product-units/${item.id}`
                              );
                              //console.log(res.data)
                              setUnit(...res.data);
                              //console.log(unit)
                            }}
                          >
                            <BsPencilSquare size={20} />
                          </button>
                          {/* edit model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="updateUnit"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLgLabel"
                            aria-modal="true"
                            role="dialog"
                            onClick={(e) => {
                              if (e.target.id === "updateUnit") {
                                setUnit({ unit: "" });
                                setMsg("");
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
                                    Update Unit
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => {
                                      setUnit({ unit: "" });
                                      setMsg("");
                                    }}
                                  ></button>
                                </div>
                                <div className="modal-body relative p-4 mt-5 mb-5 text-left">
                                  <label
                                    htmlFor="exampleFormControlInput1"
                                    className="form-label inline-block mb-2 text-gray-700"
                                  >
                                    Product Unit
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
                                    placeholder="Unit"
                                    id="exampleFormControlInput1"
                                    value={unit.unit}
                                    onChange={handleChange}
                                    name="unit"
                                  />
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
                                    onClick={() => {
                                      setUnit({ unit: "" });
                                      setMsg("");
                                    }}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    onClick={handleUpdate}
                                  >
                                    update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* end of edite model */}
                          <button
                            className="px-3 py-1.5 rounded font-medium tracking-wider text-red-600 bg-red-200 hover:shadow"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalCenter"
                          >
                            <AiTwotoneDelete size={20} />
                          </button>
                          {/* delete model */}
                          <div
                            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                            id="exampleModalCenter"
                            tabIndex="-1"
                            aria-labelledby="exampleModalCenterTitle"
                            aria-modal="true"
                            role="dialog"
                          >
                            <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
                              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                                  <h5
                                    className="text-lg uppercase font-medium leading-normal text-red-500"
                                    id="exampleModalScrollableLabel"
                                  >
                                    Delete Unit
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body relative p-4">
                                  <h2 className="my-3">
                                    Are you sure? You want to delete...!
                                  </h2>
                                </div>
                                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-block px-6 py-2.5 bg-red-500 text-white font-light text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                                    data-bs-dismiss={"modal"}
                                    aria-label="Close"
                                    onClick={() => {
                                      handleDelete(item.id);
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
    </>
  );
};

export default ProductUnit;
