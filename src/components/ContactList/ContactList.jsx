import Contact from "../Contact/Contact";
import React from "react";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact onDelete={onDelete} contactData={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
