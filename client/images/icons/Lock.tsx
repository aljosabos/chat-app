interface ILockIconProps {
  className?: string;
}
function LockIcon({ className }: ILockIconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 28 35">
      <path
        className={className}
        d="M14 1.102a8.273 8.273 0 018.273 8.273l-.001 2.804.084.003A4.86 4.86 0 0127 17.037v12.43a4.86 4.86 0 01-4.86 4.86H5.86A4.86 4.86 0 011 29.467v-12.43a4.86 4.86 0 014.727-4.858V9.375A8.273 8.273 0 0114 1.102zm0 18.458c-1.958 0-3.545 1.653-3.545 3.692s1.587 3.691 3.545 3.691 3.545-1.652 3.545-3.691c0-2.04-1.587-3.692-3.545-3.692zm0-14.766c-2.538 0-4.61 2-4.722 4.51l-.005.217-.001 2.655h9.455V9.521A4.727 4.727 0 0014 4.794z"
      ></path>
    </svg>
  );
}

export default LockIcon;
