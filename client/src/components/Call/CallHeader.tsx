import { ReturnIcon, LockIcon, AddContactIcon } from "@icons/index";
export const CallHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-call-header-bg">
      <ReturnIcon className="fill-white w-[20px]" />
      <span className="flex items-center gap-x-2">
        <p className="text-white text-xs">End-to-end encrypted</p>
        <LockIcon className="fill-white w-[10px]" />
      </span>
      <AddContactIcon className="fill-white w-[20px]" />
    </div>
  );
};
