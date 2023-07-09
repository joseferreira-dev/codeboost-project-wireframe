const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os contatos
    const contacts = await ContactRepository.findAll();

    res.json(contacts);
  }

  async show(req, res) {
    // Obter um registro
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  store() {
    // Criar um registro
  }

  update() {
    // Editar um registro
  }

  async delete(req, res) {
    // Deletar um registro
    const { id } = req.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    await ContactRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
