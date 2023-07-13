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

  async store(req, res) {
    // Criar um registro
    const {
      name,
      email,
      phone,
      categoryId,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: 'You need to insert at least a e-mail or phone number' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already been taken' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      categoryId,
    });

    res.json(contact);
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
