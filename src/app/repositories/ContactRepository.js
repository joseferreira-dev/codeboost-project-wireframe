const { v4 } = require('uuid');

const db = require('../database/index');

let contacts = [
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus@gmail.com',
    phone: '+5583998567401',
    categoryId: v4(),
  },
  {
    id: v4(),
    name: 'José',
    email: 'jose@gmail.com',
    phone: '+5583996541120',
    categoryId: v4(),
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

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create(name, email, phone, categoryId) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, categoryId)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `, [name, email, phone, categoryId]);

    return row;
  }

  update(id, { name, email, phone, categoryId }) {
    return new Promise((resolve, reject) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        categoryId,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContact : contact
      ));

      resolve(updatedContact);
    });
  }
}

module.exports = new ContactRepository();
