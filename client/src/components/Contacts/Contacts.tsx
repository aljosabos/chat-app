import type { User } from "@features/user/types";
import { Contact } from "..";

interface IContactsProps {
  contacts: User[];
}
export const Contacts = ({ contacts }: IContactsProps) => {
  return (
    <div>
      {contacts?.map((contact) => (
        <div key={contact._id}>
          <span className="m-4 text-green-3 text-sm">Contacts</span>
          <Contact {...contact} />
        </div>
      ))}
    </div>
  );
};
