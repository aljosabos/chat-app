import { PhoneHandsetIcon } from "@icons/index";
import { useEffect, useState } from "react";

interface RingingProps {
  call: {
    receivingCall: boolean;
    callEnded: boolean;
  };
  setCall: React.Dispatch<
    React.SetStateAction<{ receivingCall: boolean; callEnded: boolean }>
  >;
}

export const Ringing = ({ call, setCall }: RingingProps) => {
  const [timer, setTimer] = useState(0);

  const { receivingCall, callEnded } = call;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer >= 5) {
      setCall({ ...call, receivingCall: false });
    }
  }, [timer, call, setCall]);

  if (!receivingCall || callEnded) return null;

  return (
    <div className="dark:bg-dark-1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      <div className="p-4 flex items-center justify-between gap-x-8">
        <div className="flex items-center gap-x-2">
          <img
            src="https://images.pexels.com/photos/10314310/pexels-photo-10314310.jpeg"
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h3 className="dark:text-dark-text-1">
              <b>John Doe</b>
            </h3>
            <span className="dark:text-dark-text-1">Calling...</span>
          </div>
          {/* Call actions */}
          <ul className="flex items-center gap-x-2">
            <li>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500">
                <PhoneHandsetIcon className="fill-white w-4" />
              </button>
            </li>

            <li>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                <PhoneHandsetIcon className="fill-white w-4" />
              </button>
            </li>
          </ul>
          <audio
            src="/audio/ringing.mp3"
            autoPlay
            loop
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </div>
  );
};
