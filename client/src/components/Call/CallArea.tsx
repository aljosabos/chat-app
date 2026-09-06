interface ICallAreaProps {
  name: string;
}

export const CallArea = ({ name }: ICallAreaProps) => {
  return (
    <div>
      <h3 className="text-dark-text-1 center text-center my-1 font-semibold">
        {name}
      </h3>
      <p className="text-dark-text-2 text-center">Ringing...</p>
    </div>
  );
};
