interface IMessageMenuProps {
  onDeleteMessage: () => void;
  onEditMessage: () => void;
}

export const MessageMenu = ({
  onDeleteMessage,
  onEditMessage,
}: IMessageMenuProps) => {
  return (
    <ul className="list-none absolute top-0 right-2 dark:bg-dark-4 rounded-md w-max dark:text-dark-text-1 text-sm *:px-6 *:py-3 *:hover:bg-dark-hover-1 *:cursor-pointer overflow-hidden z-10">
      <li onClick={onEditMessage}>Edit message</li>
      <li onClick={onDeleteMessage}>Delete message</li>
    </ul>
  );
};
