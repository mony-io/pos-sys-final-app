import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth } from "../utls/auth";
import { Spin, Space } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  // ========== message ==============
  const [msg, setMsg] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgPwd, setMsgPwd] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const EMAIL_REX = /^\S+$/;
  const PWD_REX = /^\S+$/;

  const emailRef = useRef();
  const pwdRef = useRef();

  const auth = useAuth();

  const delayPage = () => {
    setLoading(true);
  };

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }
  // console.log(email)

  const handleClick = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      setMsgEmail("សូម! បញ្ចូលអ៊ីមែល/ឈ្មោះអ្នកប្រើប្រាស់របស់អ្នក");
      emailRef.current?.focus();
    } else if (password.trim() === "") {
      setMsgPwd("សូម! បញ្ចូលពាក្យសម្ងាត់របស់អ្នក");
      pwdRef.current?.focus();
    } else {
      if (validEmail && validPwd) {
        try {
          const res = await axios.post(
            "http://localhost:3001/login",
            {
              email,
              password,
            },
            { withCredentials: true }
          );
          //console.log(res.data.token)
          if (res.data.success) {
            auth.Loading(true);
            const expirationTime = new Date(
              new Date().getTime() + 60 * 24 * 1000
            );
            auth.login(res.data.token, expirationTime.toISOString());
            navigate("/", { replace: true });
          } else {
            setEmail("");
            setPassword("");
            playAudio(
              "http://localhost:3001/audio/audio-notification-sound.mp3"
            );
            toast.error(`${res.data.message}`, {
              position: "top-center",
              autoClose: 5000,
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
      }
    }
  };

  //console.log(validEmail)

  useEffect(() => {
    setTimeout(() => {
      delayPage();
      emailRef.current?.focus();
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <section className="bg-gradient-to-r from-[#aaa] to-[#ddd] w-full h-screen absolute top-0">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-[#fff] rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="shadow-sm items-center mb-6 flex justify-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4a/PSS-logo.png"
                    className="w-24 h-14"
                    alt="logo"
                  />
                </div>
                <div>{msg}</div>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      អុីមែល​/ឈ្មោះ​អ្នកប្រើប្រាស់
                    </label>
                    <input
                      value={email.trim()}
                      ref={emailRef}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                      placeholder="name@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.code === "Space") {
                          e.preventDefault();
                        }
                      }}
                      onKeyUp={() => {
                        if (email !== "") {
                          if (EMAIL_REX.test(email)) {
                            setMsgEmail("");
                            setValidEmail(true);
                          } else {
                            setMsgEmail(
                              "អ៊ីមែល ឬឈ្មោះអ្នកប្រើប្រាស់មិនត្រឹមត្រូវ"
                            );
                            setValidEmail(false);
                          }
                        } else {
                          setMsgEmail(
                            "សូម! បញ្ចូលអ៊ីមែល/ឈ្មោះអ្នកប្រើប្រាស់របស់អ្នក"
                          );
                          setValidEmail(false);
                        }
                      }}
                    />
                    {/* alert message */}
                    {msgEmail && (
                      <span className="text-red-500 text-xs mt-2">
                        {msgEmail}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      ពាក្យសម្ងាត់
                    </label>
                    <input
                      ref={pwdRef}
                      onKeyDown={(e) => {
                        if (e.code === "Space") {
                          e.preventDefault();
                        }
                      }}
                      onKeyUp={() => {
                        if (password !== "") {
                          if (PWD_REX.test(password)) {
                            setValidPwd(true);
                            setMsgPwd("");
                          } else {
                            setValidPwd(false);
                            setMsgPwd("ពាក្យសម្ងាត់មិនត្រឹមត្រូវ");
                          }
                        } else {
                          setMsgPwd("សូម! បញ្ចូលពាក្យសម្ងាត់របស់អ្នក");
                          setValidPwd(false);
                        }
                      }}
                      value={password.trim()}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                      // required=""
                    />
                    {msgPwd && (
                      <span className="text-red-500 text-xs mt-2">
                        {msgPwd}
                      </span>
                    )}
                  </div>
                  <div class="flex justify-end">
                    <a
                      href="#"
                      class="text-xs text-primary-600 text-blue-500 underline ml-1 -mt-5"
                    >
                      <Link to="/resetpassword">ភ្លេច​លេខសំងាត់​ ?</Link>
                    </a>
                  </div>
                  <button
                    onClick={handleClick}
                    type="submit"
                    class="w-full text-md text-[#fff] bg-gradient-to-r from-[#2b5876] to-[#4e4376] hover:hover:text-[#aaa] p-3 rounded"
                  >
                    <Link to="/">ចូល</Link>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="bg-[#ddd] w-full h-screen absolute top-0">
          <Space className="flex justify-center items-center h-screen bg-slate-50">
            <Spin tip="Loading..." size="large">
              <div className="mr-12" />
            </Spin>
          </Space>
        </div>
      )}
      {/* toast message */}
      <ToastContainer />
    </>
  );
};

export default Login;
