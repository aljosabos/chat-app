interface IEyeIconProps {
  className?: string;
  onClick?: () => void;
}

export const EyeIcon = ({ className, onClick }: IEyeIconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      height={24}
      width={24}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={onClick}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};