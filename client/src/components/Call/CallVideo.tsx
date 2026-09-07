interface CallVideoProps {
  shouldShowActions: boolean;
}

export const CallVideo = ({ shouldShowActions }: CallVideoProps) => {
  return (
    <div>
      <video className=" absolute w-full h-full top-0 left-0 z-5 bg-red-200" />
      <video
        className={`absolute w-30 h-34 right-4 bottom-4 z-10 bg-blue-200 rounded-2xl ${
          shouldShowActions ? "moveVideoUpAnimation" : "moveVideoDownAnimation"
        }`}
      />
    </div>
  );
};
