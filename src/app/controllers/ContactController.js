const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os contatos
    const contacts = await ContactRepository.findAll();

    res.json(contacts);
  }

  async show(req, res) {
    // Obter um registro
    const contact = await ContactRepository.findById();

    res.json(req.params);
  }

  store() {
    // Criar um registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

module.exports = new ContactController();
