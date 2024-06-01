import "./App.css";
import React from "react";
import ContactFrom from "./components/ContactForm/ContactForm";
import ContacList from "./components/ContactList/ContactList";
import SearchForm from "./components/SearchBox/SearchBox";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import initialContacts from "./contacts.json";
import SearchBox from "./components/SearchBox/SearchBox";

const contactsData = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

const App = () => {
  const [contact, setContact] = useState(() => {
    const savedObject = window.localStorage.getItem("contacts");
    if (savedObject !== null) {
      return JSON.parse(savedObject);
    }
    return contactsData;
  });
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contact));
  }, [contact]);

  const filterContacts = contact.filter((contact) =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  function addContact(contactObj) {
    setContact((prevValue) => {
      return [...prevValue, contactObj];
    });
  }

  function addFilter(currentFilter) {
    setSearchValue(currentFilter);
  }

  function deleteContact(contactId) {
    setContact((prevContact) =>
      prevContact.filter((contact) => contact.id !== contactId)
    );
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactFrom addContact={addContact} />
      <SearchBox value={searchValue} addFilter={addFilter} />
      <ContacList contacts={filterContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;
