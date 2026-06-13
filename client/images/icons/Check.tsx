interface ICheckIconProps {
  className?: string;
}

export default function CheckIcon({ className }: ICheckIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      height={20}
      width={20}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      fill="currentColor"
      className={className}
    >
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        fill="currentColor"
      />
    </svg>
  );
};
