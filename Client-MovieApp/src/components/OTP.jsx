import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export const OTP = () => {
  const inputRef = useRef();
  const [inputNum, setInputNum] = useState(0);
  const [otp, setOtp] = useState([]);

  let otpLength = "123456";

  useEffect(() => {
    const firstChildInput = inputRef.current.firstChild;
    if (firstChildInput.disabled) {
      firstChildInput.disabled = false;
      firstChildInput.focus();
    }
  }, [inputNum]);

  const handleChange = (e) => {
    e.preventDefault();
    
    let number = e.target.value;
    const parent = inputRef.current;
    if(number.length > 1){
        const inputIndex = otp.length;
        [...parent.children].map((child, index) => {
          child.disabled = true;
          if (inputIndex === index) {
            child.disabled = false;
            child.focus();
          }
        });
        return; 
    }

    setInputNum((prev) => (prev = +number));
    setOtp((prev) => [...prev, +number]);
  };

  console.log(inputNum);
  console.log(otp);

  return (
    <div className="flex flex-col items-center p-5 mt-40 gap-2 bg-white rounded-lg max-h-screen mx-10 md:mx-40 w-full md:w-1/2 xl:w-1/4">
      <h1 className="text-4xl font-medium pb-3">Verify Email</h1>
      <p className="text-slate-500">Enter your the OTP send to email.</p>
      <div className="flex gap-3 justify-center mt-8" ref={inputRef}>
        {Array.from(otpLength).map((num, index) => {
          return (
            <input
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white w-1/6 outline outline-2 outline-gray-400 rounded-sm px-5 py-5 focus:outline-gray-950 disabled:outline-gray-400"
              type="number"
              name={`otp-${index}`}
              id={`otp-${index}`}
              key={index}
              autoFocus={index === 0}
              disabled={true}
              step={1}
              maxLength={1}
              autoComplete={"no"}
              pattern={"d*"}
              onKeyUp={handleChange}
            />
          );
        })}
      </div>
      <button
        className="w-full bg-violet-800 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        verify OTP
      </button>
    </div>
  );
};
