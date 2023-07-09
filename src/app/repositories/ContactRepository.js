const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus@gmail.com',
    phone: '+5583998567401',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'José',
    email: 'jose@gmail.com',
    phone: '+5583996541120',
    category_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      contacts = contacts.filter((contact) => contact.id !== id);
    });
  }
}

module.exports = new ContactRepository();
