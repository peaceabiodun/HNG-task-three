import { useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const signIn = async (e) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/")
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
      });
  };



  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <p className="text-[36px] text-[#39CDCC]">Sign In</p>
        <div className="flex flex-col gap-[24px] w-[85%] sm:w-[60%] lg:w-[40%] mt-[50px]">
          <input
            className="border border-[#545F7D26] h-[50px] text-[#545F7D] rounded-[8px] p-[10px]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <p className="absolute font-thin cursor-pointer right-2 top-[18px] text-[#39CDCC] text-[12px]">
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
            onClick={signIn}
            className="text-xs text-white bg-[#39CDCC] h-[48px] flex justify-center items-center font-bold rounded-[8px]"
          >
            SIGN IN
          </button>

          <div className="flex justify-center w-full text-[12px] text-[#39CDCC]">
          <p onClick={() => navigate("/")} className="cursor-pointer">Already have an account?</p>
        </div>
        </div>
      </div>

    </div>
  );
};

export default Auth;
