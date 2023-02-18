import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useQuery } from "react-query";
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";

// =========== fetch user role function ============
const fetchRoles = async () => {
  const { data } = await axios.get("http://localhost:3001/api/roles");
  return data;
};

const Adduser = () => {
  // =============== useRef ==============
  const usernameRef = useRef();
  const pwdRef = useRef();

  // message
  const [userMsg, setUserMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [roleMsg, setRoleMsg] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: "",
    role_id: "",
  });

  // clear data function
  const clear_data = () => {
    setUser({
      username: "",
      password: "",
      email: "",
      phone_number: "",
      role_id: "",
    });

    setUserMsg("");
    setPwdMsg("");
    setRoleMsg("");

    usernameRef.current?.focus();
  };

  // function work when something chnage in input field
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // fetch user role data
  const { data } = useQuery("roles", fetchRoles);
  console.log(data);

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  // ====
  const handleSubmit = async () => {
    try {
      if (user.username === "") {
        setUserMsg("សូម! បញ្ចូលឈ្មេាះគណនី");
        usernameRef.current?.focus();
      } else if (user.password === "") {
        setPwdMsg("សូម! បញ្ជូលពាក្យសម្ងាត់");
        pwdRef.current?.focus();
      } else if (user.role_id === "") {
        setRoleMsg("សូម! ជ្រើសរើសតួនាទីអ្នកប្រើប្រាស់");
      } else {
        const res = await axios.post("http://localhost:3001/api/user", user);
        if (res.data.success) {
          clear_data();
          playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
          toast.success(`${res.data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          playAudio("http://localhost:3001/audio/audio-notification-sound.mp3");
          toast.error(`${res.data.message}`, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          clear_data();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex-1">
      <Navbar />
      <div className="p-5 mt-5">
        <h1 className="text-xl mb-4 text-left">បន្ថែមអ្នកប្រើប្រាស់</h1>
        <div className="w-full h-1 bg-blue-400 mb-3 shadow-sm"></div>
        <h2 className="ml-3 text-lg">សូមបញ្ជូលពត៍មានខាងក្រោម</h2>
        <div className="grid grid-cols-4 gap-4 mt-7">
          <div className="col-span-2 px-9">
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ឈ្មោះ​គណនី
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                value={user.username}
                ref={usernameRef}
                type="text"
                id="username"
                name="username"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
                placeholder=""
              />
              {userMsg && (
                <span className="text-red-500 text-sm">{userMsg}</span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ពាក្យសម្ងាត់
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code === "Space") {
                    e.preventDefault();
                  }
                }}
                onChange={handleChange}
                ref={pwdRef}
                value={user.password}
                type="password"
                id="password"
                name="password"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
                placeholder=""
              />
              {pwdMsg && <span className="text-red-500 text-sm">{pwdMsg}</span>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="roles"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ប្រភេទអ្នកប្រើប្រាស់
              </label>
              <select
                onChange={handleChange}
                id="rolse"
                name="role_id"
                value={user.role_id}
                className="form-select appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2.5
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
              >
                <option className="text-sm">ជ្រើសរើសតួនាទី</option>
                {data &&
                  data.map((item, index) => {
                    return (
                      <option value={item.role_id} key={index + 1}>
                        {item.role_name}
                      </option>
                    );
                  })}
              </select>
              {roleMsg && (
                <span className="text-red-500 text-sm">{roleMsg}</span>
              )}
            </div>
          </div>
          <div className="col-span-2 px-9">
            <div className="mb-6">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                លេខទូរស័ព្ទ
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="phone_number"
                name="phone_number"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                អុីមែល
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="
                  form-control
                  block
                  w-full
                  px-3
                  py-2.5
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
              />
            </div>
            <div className="mt-[54px]">
              <button
                onClick={clear_data}
                type="submit"
                className="text-white bg-red-700 mr-4 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-red-800"
              >
                សម្អាត
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
              >
                បញ្ជូន
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Adduser;
