const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

require("colors");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) console.error(err);
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const filteredContact = contacts.filter(({ id }) => +id === contactId);
  console.table(filteredContact);
}

function removeContact(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  if (contacts.find(({ id }) => +id === contactId) !== undefined) {
    const newContactsList = contacts.filter(({ id }) => +id !== contactId);
    fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, "\t"),
      (err) => {
        if (err) console.error(err);
        console.log(
          `Pomyślnie usunięto kontakt o numerze ID: ${contactId}`.green
        );
      }
    );
  } else {
    console.log(`Nie ma kontaktu dla ID o numerze: ${contactId}`.red);
  }
}

function addContact(name, email, phone) {
  // ...twój kod
}

module.exports = { listContacts, getContactById, removeContact };
