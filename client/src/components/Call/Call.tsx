import type { CallData } from "@pages/Home/Home.types";
import { Ringing } from "./Ringing";
import { CallHeader } from "./CallHeader";
import { CallArea } from "./CallArea";

interface CallProps {
  call: CallData;
  setCall: React.Dispatch<React.SetStateAction<CallData>>;
  callAccepted: boolean;
}

export const Call = ({ call, setCall, callAccepted }: CallProps) => {
  const { receivingCall, callEnded } = call;
  console.log(callAccepted);
  return (
    <div className="bg-call-bg bg-cover bg-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 border-amber-300 w-[350px] h-[550px] rounded-2xl overflow-hidden">
      {receivingCall && !callEnded && <Ringing call={call} setCall={setCall} />}
      <CallHeader />
      <CallArea name="John Doe" />
    </div>
  );
};
