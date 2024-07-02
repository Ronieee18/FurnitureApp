import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";

//install react-icons
//install react-hook-forms

const Window = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm();
  const [isChecked, setIsChecked] = useState(false);

  const onGoogleLogin=()=>{
    // google login logic here
  }
  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit((data) => {
        
        // onsubmit of form logic here
          console.log(data);
        })}
       
      >
        {/* <pre>{JSON.stringify(userInfo, undefined, 2)}</pre> */}
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-gray-100 flex flex-col py-6  px-10 rounded-2xl gap w-[333px]">
            <button className="ml-auto mb-4" onClick={onClose}>
              <RxCross1 />
            </button>
            <p className="text-md mb-5 font-medium  text-center">
              SignUp/Login to continue <br />
              {/* Signup or Login{" "} */}
            </p>
            <input
              {...register("email",{required:true})}
              
              type="email"
              placeholder="Email"
              className="text-sm focus:outline-none py-[7px] px-[18px] mb-4 border-b-1 border-black"
            />
            <input
              {...register("password",{required:true,minLength: 8})}
             
              type="password"
              placeholder="Password"
              className="text-sm focus:outline-none py-[7px] px-[18px] mb-4 border-b-1 border-black"
            />
            <div className="flex mb-4">
              <input
                type="checkbox"
                className="p-3 mr-2 h-6 w-6"
                checked={isChecked}
                onChange={() => {
                  setIsChecked(!isChecked);
                }}
              />
              <p className="text-xs text-wrap">
                I agree to the terms and conditions & privacy policies
              </p>
            </div>
            <button
              className="text-xs w-full rounded-lg text-white bg-red-600 py-[14px]  px-[20px] mb-4"
        
              disabled={!isChecked}
            >
              Continue
            </button>
            <p className="text-sm font-medium text-center mb-4">OR</p>
            <button className="text-xs w-full rounded-lg text-white bg-slate-900 py-[14px]  px-[2px] mb-4" onClick={()=>{onGoogleLogin()}}>
              <div className="flex items-center justify-center">
                <p className="text-lg mr-3">
                  <FcGoogle />
                </p>
                Continue with Google
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const NewLogin = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        className="text-white text-xs bg-red-600 py-2 px-4 rounded-lg"
        onClick={() => setShowModal(true)}
      >
        LOGIN/SIGNUP
      </button>
      {showModal && <Window onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default NewLogin;