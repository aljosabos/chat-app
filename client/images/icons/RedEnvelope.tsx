interface IRedEnvelopeIconProps {
  className?: string;
}

export const RedEnvelopeIcon = ({ className }: IRedEnvelopeIconProps) => {
  return (
    <svg
      viewBox="0 0 512 512"
      width={24}
      height={24}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      {/* Background/Main Envelope */}
      <rect x="64" y="96" width="384" height="320" rx="24" fill="#D32F2F" />

      {/* Outer Gold Border */}
      <rect
        x="72"
        y="104"
        width="368"
        height="304"
        rx="16"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
      />

      {/* Top Flap */}
      <path
        d="M64 120 L256 220 L448 120 Z"
        fill="#C62828"
        stroke="#FFD700"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      <polygon points="256,220 256,416 64,120" fill="#B71C1C" opacity="0.2" />

      {/* Gold Accents (Bottom Corners) */}
      <polygon points="72,376 72,408 104,408" fill="#FFD700" />
      <polygon points="440,376 440,408 408,408" fill="#FFD700" />

      {/* Central Character (Fu/Prosperity) */}
      <g transform="translate(256, 260) scale(0.9)" fill="#FFD700">
        <rect x="-40" y="-70" width="80" height="12" rx="4" />
        <rect x="-15" y="-50" width="30" height="16" rx="4" />
        <rect x="-45" y="-25" width="90" height="12" rx="4" />
        <rect x="-35" y="5" width="70" height="50" rx="4" />
        <rect x="-25" y="20" width="50" height="30" rx="2" />
        <polygon
          points="-25,4 0,-15 25,4"
          fill="none"
          stroke="#FFD700"
          strokeWidth="8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
