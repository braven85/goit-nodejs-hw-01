const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");

require("colors");

function listContacts() {
  fs.readFile(contactsPath)
    .then((res) => {
      console.table(JSON.parse(res));
    })
    .catch((err) => console.error(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((res) => {
      const contacts = JSON.parse(res);
      const filteredContact = contacts.filter(({ id }) => +id === contactId);
      console.table(filteredContact);
    })
    .catch((err) => console.error(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((res) => {
      const contacts = JSON.parse(res);
      const newId = Math.max(...contacts.map(({ id }) => +id)) + 1;
      const newContact = {
        id: String(newId),
        name: name,
        email: email,
        phone: phone,
      };
      const newContactsList = [...contacts, newContact];
      fs.writeFile(
        contactsPath,
        JSON.stringify(newContactsList, null, "\t"),
        (err) => {
          if (err) console.error(err);
          console.log(`Pomyślnie dodano ${name} do listy kontaktów`.green);
        }
      );
    })
    .catch((err) => console.error(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((res) => {
      const contacts = JSON.parse(res);
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
    })
    .catch((err) => console.error(err));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
