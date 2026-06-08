interface IConversationMenuProps {
  onDeleteConversation: () => void;
}
export const ConversationMenu = ({
  onDeleteConversation,
}: IConversationMenuProps) => {
  return (
    <ul className="list-none absolute top-7 right-2 dark:bg-dark-4 rounded-md w-max dark:text-dark-text-1 text-sm *:px-6 *:py-3 *:hover:bg-dark-hover-1 *:cursor-pointer overflow-hidden">
      <li onClick={onDeleteConversation}>Delete Chat</li>
    </ul>
  );
};
