import React from "react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [spin, setSpin] = useState(false);
  const [color, setColor] = useState(false);

  const [validEmail, setValidEmail] = useState(false);

  const EMAIL_REX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const emailRef = useRef();

  const antIcon = <LoadingOutlined style={{ fontSize: 25 }} spin />;

  //play sound
  function playAudio(url) {
    const audio = new Audio(url);
    audio.play();
  }

  const handleClicked = async (e) => {
    try {
      setMsg("");
      e.preventDefault();
      if (email !== "") {
        if (validEmail) {
          setSpin(true);
          const res = await axios.post(
            "http://localhost:3001/reset_password_mail",
            {
              email: email,
            }
          );

          console.log(res);
          setMsg(res.data.message);
          if (res.data.success) {
            playAudio("http://localhost:3001/audio/message-send.mp3");
            setColor("text-green-600");
            setEmail("");
            setSpin(false);
          } else {
            setColor("text-red-500");
            setEmail("");
            setSpin(false);
          }
        } else {
          setEmail("");
          setMsg("អ៊ីមែលមិនត្រឹមត្រូវទេ សូម! សាកល្បងម្តងទៀត");
          setColor("text-red-500");
        }
      } else {
        setColor("text-red-500");
        setMsg("សូម! បញ្ចូលអ៊ីមែលរបស់អ្នក");
        emailRef.current?.focus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  return (
    <section className="bg-gradient-to-r from-[#aaa] to-[#ddd] w-full absolute top-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-[#fff] rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight text-center tracking-tight text-gray-900">
              ផ្លាស់ប្តូរពាក្យសម្ងាត់
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  អុីមែល
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded p-3 w-full outline-none"
                  placeholder="name@company.com"
                  onChange={(e) => {
                    setEmail(e.target.value.trim());
                  }}
                  onKeyDown={(e) => {
                    if (e.code === "Space") {
                      e.preventDefault();
                    }
                  }}
                  required
                  onKeyUp={() => {
                    if (email !== "") {
                      if (!EMAIL_REX.test(email.trim())) {
                        setValidEmail(false);
                        setMsg("អ៊ីមែល​មិន​ត្រឹមត្រូវ");
                        setColor("text-red-500");
                      } else {
                        setMsg("");
                        setValidEmail(true);
                      }
                    }
                  }}
                  value={email.trim()}
                />
                {msg && (
                  <span className={`flex ${color} text-xs mt-1`}>{msg}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-md text-[#fff] bg-gradient-to-r from-[#2b5876] to-[#4e4376] hover:text-[#aaa] p-3 rounded"
                onClick={handleClicked}
              >
                {spin ? (
                  <span>
                    <Spin indicator={antIcon} className="text-blue-100" />{" "}
                    Loading...
                  </span>
                ) : (
                  "បញ្ចូន"
                )}
              </button>
            </form>
          </div>
        </div>
        <div style={{ marginLeft: "-21vw", marginTop: "5px" }}>
          <span className="text-xs text-blue-400 underline cursor-pointer">
            <Link to="/login">ត្រឡប់​ក្រោយ!</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
