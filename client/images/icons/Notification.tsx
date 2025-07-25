interface INotificationIconProps {
  className?: string;
}
export default function NotificationIcon({ className }: INotificationIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      height={48}
      width={48}
      preserveAspectRatio="xMidYMid meet"
      version="1.1"
      x="0px"
      y="0px"
      enableBackground="new 0 0 48 48"
      xmlSpace="preserve"
    >
      <path
        className={className}
        d="M24.154,2C11.919,2,2,11.924,2,24.165S11.919,46.33,24.154,46.33 s22.154-9.924,22.154-22.165S36.389,2,24.154,2z M23.41,17.428V16.81c0-0.706,0.618-1.324,1.324-1.324s1.323,0.618,1.323,1.324 v0.618c2.559,0.618,4.412,2.823,4.412,5.559v3.176l-8.294-8.294C22.527,17.692,22.969,17.516,23.41,17.428z M24.733,33.134 c-0.971,0-1.765-0.794-1.765-1.765h3.529C26.498,32.34,25.704,33.134,24.733,33.134z M31.969,32.251l-1.765-1.765H17.233v-0.882 l1.765-1.765v-4.853c0-1.059,0.265-2.029,0.794-2.912l-2.559-2.559l1.147-1.147l14.735,14.736L31.969,32.251z"
      />
    </svg>
  );
}
