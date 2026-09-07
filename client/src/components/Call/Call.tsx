import type { CallData } from "@pages/Home/Home.types";
import { Ringing, CallHeader, CallArea, CallActions, CallVideo } from "./index";
import { useState } from "react";

interface CallProps {
  call: CallData;
  setCall: React.Dispatch<React.SetStateAction<CallData>>;
  callAccepted: boolean;
}

export const Call = ({ call, setCall, callAccepted }: CallProps) => {
  const [shouldShowActions, setShouldShowActions] = useState(false);
  const { receivingCall, callEnded } = call;
  console.log(callAccepted);
  return (
    <div
      className="bg-call-bg bg-cover bg-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 border-amber-300 w-[350px] h-[550px] rounded-2xl overflow-hidden flex flex-col"
      onMouseOver={() => setShouldShowActions(true)}
      onMouseLeave={() => setShouldShowActions(false)}
    >
      {receivingCall && !callEnded && <Ringing call={call} setCall={setCall} />}
      <CallHeader />
      <CallArea name="John Doe" />
      <CallVideo shouldShowActions={shouldShowActions} />
      {shouldShowActions && <CallActions />}
    </div>
  );
};
