import Logo from "@icons/Logo";

export const ChatPlaceholder = () => {
  return (
    <div className="dark:bg-dark-4 h-full w-full border-b-[6px] border-b-green-2 flex flex-col justify-center items-center">
      <Logo />

      <div className="flex flex-col items-center justify-center">
        <h2 className="dark:text-dark-text-1 font-normal my-6">Chatapp Web</h2>
        <p className="dark:text-dark-text-2">
          Send and receive messages with your friends, exchange audio and video
          calls for free
        </p>
      </div>
    </div>
  );
};
