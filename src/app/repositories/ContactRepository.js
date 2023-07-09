const { v4 } = require('uuid');

const contacts = [
  {
    id: v4(),
    name: 'Mateus',
    email: 'mateus@gmail.com',
    phone: '+5583998567401',
    cateogory_id: v4(),
  },
];

class ContactRepository {
  findAll() {
    return new Promise((resolve, reject) => {
      resolve(contacts)
    });
  }
}

module.exports = new ContactRepository();
