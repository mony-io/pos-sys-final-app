import React, { useState } from "react";
import { AiOutlineMenu, AiFillSetting } from "react-icons/ai";
import { RiHome3Fill, RiCustomerServiceFill } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { RxDot } from "react-icons/rx";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../utls/auth";

const Sidebar = () => {
  const auth = useAuth();
  const [open, setOpen] = useState(true);
  return (
    <>
      {auth.isLoggedIn && (
        <>
          <div
            className={`flex-2 ${
              open ? "w-56" : "w-12"
            } bg-[#222] h-[100vh] scrollbar relative duration-200 shadow-lg`}
            id="sidenavExample"
          >
            <div
              className="absolute top-6 right-[13px] cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <AiOutlineMenu size={24} color="white" />
            </div>
            <ul className="relative text-[#fff]">
              <Link to="/">
                <li className="relative mt-20 flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                  <span className="block float-left mr-[6px]">
                    <RiHome3Fill size={18} color="white" />
                  </span>
                  <span
                    className={`flex-1 ${
                      !open && "hidden"
                    } duration-200 mt-[5px]`}
                  >
                    ផ្ទាំងគ្រប់គ្រង
                  </span>
                </li>
              </Link>
              <Link to="/sale">
                <div>
                  <li className="relative flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                    <span className="block float-left mr-[6px]">
                      <FiShoppingCart size={18} color="white" />
                    </span>
                    <span
                      className={`flex-1 ${
                        !open && "hidden"
                      } duration-200 mt-[5px]`}
                    >
                      បញ្ជាការលក់
                    </span>
                  </li>
                </div>
              </Link>
              <Link to="/category">
                <li className="relative flex items-center text-sm py-4 px-[12px] h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer">
                  <span className="block float-left mr-[6px]">
                    <BiCategoryAlt size={18} color="white" />
                  </span>
                  <span
                    className={`flex-1 ${
                      !open && "hidden"
                    } duration-200 mt-[5px]`}
                  >
                    ក្រុមផលិតផល
                  </span>
                </li>
              </Link>
              <li id="sidenavEx1">
                <div
                  className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx1"
                  aria-controls="collapseSidenavEx1"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <MdAddShoppingCart size={18} />
                  </span>
                  <span className={`flex-1 ${!open && "hidden"} duration-200 `}>
                    ផលិតផល
                  </span>
                  {open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx1"
                    aria-labelledby="sidenavEx1"
                    data-bs-parent="#sidenavExample"
                  >
                    <Link to="/productunit">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          ឯកតាផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/addproduct">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បន្ថែមផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/listproduct">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បញ្ជីផលិតផល
                        </span>
                      </li>
                    </Link>
                    <Link to="/product-brands">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          ម៉ាកផលិតផល
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx4">
                <div
                  className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx4"
                  aria-controls="collapseSidenavEx4"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <FaUsers size={18} />
                  </span>
                  <span
                    className={`flex-1 ${
                      !open && "hidden"
                    } duration-200 mt-[2px]`}
                  >
                    អ្នក​ប្រើប្រាស់
                  </span>
                  {open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx4"
                    aria-labelledby="sidenavEx4"
                    data-bs-parent="#sidenavExample"
                  >
                    <Link to="/adduser">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បន្ថែមប្រើប្រាស់
                        </span>
                      </li>
                    </Link>
                    <Link to="/listuser">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បញ្ជីប្រើប្រាស់
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx2">
                <div
                  className="flex items-center text-sm py-4 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx2"
                  aria-controls="collapseSidenavEx2"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <RiCustomerServiceFill size={18} />
                  </span>
                  <span className={`flex-1 ${!open && "hidden"} duration-200 `}>
                    អ្នក​ពាក់ព័ន្ធ
                  </span>
                  {open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx2"
                    aria-labelledby="sidenavEx2"
                    data-bs-parent="#sidenavExample"
                  >
                    <Link to="/addcustomer">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បន្ថែមអតិថិជន
                        </span>
                      </li>
                    </Link>
                    <Link to="/listcustomer">
                      <li className="relative flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                        <span className="pl-6">
                          <RxDot size={20} />
                        </span>
                        <span
                          className="mt-[2px]"
                          // data-mdb-ripple="true"
                          data-mdb-ripple-color="dark"
                        >
                          បញ្ជីអតិថិជន
                        </span>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx3">
                <div
                  className="flex items-center text-sm py-3 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx3"
                  aria-controls="collapseSidenavEx3"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <TbReport size={18} />
                  </span>
                  <span className={`flex-1 ${!open && "hidden"} duration-200 `}>
                    របាយការណ៏
                  </span>
                  {open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx3"
                    aria-labelledby="sidenavEx3"
                    data-bs-parent="#sidenavExample"
                  >
                    <li className="relative flex items-center text-[12px] cursor-pointer py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        របាយការណ៏ប្រចាំថ្ងៃ
                      </span>
                    </li>
                    <li className="relative flex items-center text-[12px] cursor-pointer py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        របាយការណ៏ប្រចាំខែ
                      </span>
                    </li>
                    <li className="relative flex items-center text-[12px] cursor-pointer py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        របាយការណ៏នៃការលក់
                      </span>
                    </li>
                    <li className="relative flex items-center text-[12px] cursor-pointer py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        របាយការណ៏ផលិតផល
                      </span>
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative" id="sidenavEx5">
                <div
                  className="flex items-center text-sm py-3 px-3 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out cursor-pointer"
                  // data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  data-bs-target="#collapseSidenavEx5"
                  aria-controls="collapseSidenavEx5"
                >
                  <span
                    aria-hidden="true"
                    //   focusable="false"
                    data-prefix="fas"
                    className="w-3 h-5 mr-3"
                  >
                    <AiFillSetting size={18} />
                  </span>
                  <span className={`flex-1 ${!open && "hidden"} duration-200 `}>
                    ការកំណត់
                  </span>
                  {open && (
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      className="w-3 h-3 ml-auto"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                      ></path>
                    </svg>
                  )}
                </div>
                {open && (
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseSidenavEx5"
                    aria-labelledby="sidenavEx5"
                    data-bs-parent="#sidenavExample"
                  >
                    <li className="relative cursor-pointer flex items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-6">
                        <RxDot size={20} />
                      </span>
                      <span
                        className="mt-[2px]"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        សកម្មភាព
                      </span>
                    </li>
                    <li className="relative flex cursor-pointer items-center text-[12px] py-[18px] h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:bg-[#111] transition duration-300 ease-in-out">
                      <span className="pl-[29px]">
                        <IoLogOutOutline size={20} />
                      </span>
                      <span
                        className="mt-[2px] ml-1"
                        // data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        ចាកចេញ
                      </span>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
