import React from "react";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
        <p className="text-[36px] text-[#4d4af0] font-semibold">Log In</p>
      <div className="flex flex-col gap-[24px] w-[85%] sm:w-[60%] lg:w-[40%] mt-[60px]">
        <input
          className="border border-[#545F7D26] h-[50px] text-[#4d4af0] rounded-[8px] p-[10px]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <p className="absolute font-thin cursor-pointer right-2 top-[18px] text-[#4d4af0] text-[12px]">
            SHOW
          </p>
          <input
            className="border border-[#545F7D26] h-[50px] text-[#545F7D] w-full rounded-[8px] p-[10px]"
            placeholder="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="cursor-pointer w-32 text-[12px] text-[#39CDCC]">
          FORGOT PASSWORD?
        </p>

        <button
          onClick={onLogin}
          className="text-xs text-white bg-[#4d4af0] h-[48px] flex justify-center items-center font-bold rounded-[8px]"
        >
          LOG IN
        </button>

        <div className="flex justify-center w-full text-[12px] text-[#39CDCC]">
          <p onClick={() => navigate("/Signup")} className="cursor-pointer">Don't have an account?</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
