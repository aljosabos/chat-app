export const ChatComposerInput = () => {
  return (
    <form className="flex-1">
      <input
        type="text"
        placeholder="Type message..."
        className="w-full dark:text-dark-text-1 outline-none p-2 rounded-md dark:bg-dark-hover-1"
      />
    </form>
  );
};
