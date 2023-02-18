import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Spin, Space } from 'antd';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingOutlined } from '@ant-design/icons';


const NewPassword = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;
    const [spin, setSpin] = useState(false);
    const [loading, setLoading] = useState(false);

    const pwdRef = useRef(null);
    const cpwdRef = useRef(null);

    const [password, setPassword] = useState("");
    const [comfirmPassword, setComfirmPassword] = useState("");

    const [msg, setMsg] = useState("");
    const [disable, setDisable] = useState(false);

    const [validPwd, setValidPwd] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location.pathname.split("/"));
    const userid = location.pathname.split("/")[2];
    const token = location.pathname.split("/")[3];

    const PWD_REX = /^(?=.*).{4,}$/

    const pageNotfound = () => {
        setTimeout(() => {
            navigate("*");
        }, 7500);
    };

    //play sound 
    function playAudio(url) {
        const audio = new Audio(url);
        audio.play();
    }
    // validate user
    const userValidate = async () => {
        const res = await axios.get(
            `http://localhost:3001/forgotpassword/${userid}/${token}`
        );
        setLoading(true);
        pwdRef.current?.focus()
        //console.log(res);
        if (res.data.success === false) {
            navigate("*");
        }
    };

    const handleClicked = async () => {
        try {
            if (password === "") {
                setMsg("Please! Enter password.");
                pwdRef.current?.focus()
            } else if (comfirmPassword === "") {
                setMsg("Please! Enter comfirm password.")
                cpwdRef.current?.focus();
            } else {
                if (validPwd) {
                    setSpin(true)
                    const res = await axios.put(
                        `http://localhost:3001/forgotpassword/${userid}/${token}`,
                        { password: password }
                    );
                    //console.log(res.data)
                    if (res.data.success) {
                        setPassword("")
                        setComfirmPassword("")
                        setDisable(true)
                        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
                        toast.success(`🦄 ${res.data.message}.`, {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        pageNotfound();
                    } else {
                        playAudio('http://localhost:3001/audio/audio-notification-sound.mp3');
                        toast.error(`🦄 ${res.data.message}`, {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    setSpin(false)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        setTimeout(() => {
            userValidate();
        }, 3000);

    }, []);



    //console.log(msg)
    return (
        <>
            {loading ?
                (<section className="bg-[#ddd] w-full h-screen absolute top-0">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-[#fff] rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-3xl font-bold leading-tight text-center tracking-tight text-gray-900">
                                    PSS POS
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            disabled={disable}
                                            ref={pwdRef}
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                                            placeholder="••••••••"

                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}

                                            value={password.trim()}
                                            onKeyUp={
                                                () => {
                                                    if (PWD_REX.test(password)) {
                                                        setMsg("")
                                                        if (password !== "" && comfirmPassword !== "") {
                                                            if (password.trim() !== comfirmPassword.trim()) {
                                                                setMsg("Password not match!")
                                                            } else {
                                                                setMsg("")
                                                                setValidPwd(true)
                                                            }
                                                        } else if (password === "" && comfirmPassword === "") {
                                                            setMsg("")
                                                            setValidPwd(false)
                                                        }
                                                    } else {
                                                        setMsg("Password length must be equal or greater than 4 character.")
                                                    }

                                                }
                                            }
                                        // required=""
                                        />

                                    </div>
                                    <div>
                                        <label
                                            htmlFor="comfirmPassword"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Comfirm Password
                                        </label>
                                        <input
                                            disabled={disable}
                                            ref={cpwdRef}
                                            type="password"
                                            name="comfirmPassword"
                                            id="comfirmPassword"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"

                                            onChange={(e) => {
                                                setComfirmPassword(e.target.value)
                                            }}
                                            onKeyUp={
                                                () => {
                                                    if (PWD_REX.test(comfirmPassword)) {
                                                        setMsg("")
                                                        if (password !== "" && comfirmPassword !== "") {
                                                            if (password.trim() !== comfirmPassword.trim()) {
                                                                setMsg("Password not match!")
                                                            } else {
                                                                setValidPwd(true)
                                                                setMsg("")
                                                            }
                                                        } else if (password === "" && comfirmPassword === "") {
                                                            setMsg("")
                                                            setValidPwd(false)
                                                        }
                                                    } else {
                                                        setValidPwd(false)
                                                        setMsg("Password length must be equal or greater than 4 character.")
                                                    }

                                                }
                                            }
                                            value={comfirmPassword.trim()}
                                        // required=""
                                        />
                                        <span className='text-red-500 text-sm'>{msg}</span>
                                    </div>
                                    <button
                                        onClick={handleClicked}
                                        type="button"
                                        className="w-full text-md text-gray-900 bg-blue-500 hover:bg-blue-400 p-3 rounded"
                                    >
                                        {spin ? <span><Spin indicator={antIcon} className="text-blue-100" /> Loading...</span> : "submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* toast message */}
                    <ToastContainer />
                </section>
                ) : <div className='bg-[#ddd] w-full h-screen absolute top-0'>
                    <Space className='flex justify-center items-center h-screen bg-slate-50'>
                        <Spin tip="Loading..." size="large">
                            <div className='mr-12' />
                        </Spin>
                    </Space>
                </div>}
        </>
    )
}

export default NewPassword
