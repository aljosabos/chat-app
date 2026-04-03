interface ContactProps {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
  accessToken: string;
}
export const Contact = (contact: ContactProps) => {
  return (
    <div className="flex items-end justify-between p-3 gap-x-3 hover:bg-dark-3 cursor-pointer">
      <div className="flex gap-x-3">
        <img
          src={contact.picture}
          alt={contact.name}
          className="w-11 h-11 rounded-full"
        />

        <div className="flex flex-col">
          <h6 className="font-bold leading-5 dark:text-dark-text-2">
            {contact.name}
          </h6>

          <p className="dark:text-dark-text-2">{contact.status}</p>
        </div>
      </div>
    </div>
  );
};
