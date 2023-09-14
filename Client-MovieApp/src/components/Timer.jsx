import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Timer = ({ setIsTimerON }) => {
  const [countDown, setCountDown] = useState(0);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  useEffect(() => {
    setCountDown(60 * 2);
    const timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (countDown < 0) {
    setIsTimerON((prev) => (prev = false));
    toast.error("Timer Expired. Resend OTP");
  }

  return (
    <strong>
      <span className="text-lg text-red-600">
        {minutes}:{seconds}
      </span>
    </strong>
  );
};
export default Timer;
