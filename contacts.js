const fs = require("fs");
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) console.error(err);
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath));
  const filteredContact = contacts.filter(({ id }) => Number(id) === contactId);
  console.table(filteredContact);
}

function removeContact(contactId) {
  // ...twój kod
}

function addContact(name, email, phone) {
  // ...twój kod
}

module.exports = { listContacts, getContactById };
