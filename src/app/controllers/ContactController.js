const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os contatos
    const { orderBy } = req.query;

    const contacts = await ContactRepository.findAll(orderBy);

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
    const { name, email, phone, categoryId } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: 'You need to insert at least a e-mail or phone number' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      categoryId,
    });

    res.json(contact);
  }

  async update(req, res) {
    // Editar um registro
    const { id } = req.params;
    const { name, email, phone, categoryId } = req.body;

    const contactExists = await ContactRepository.findById(id);

    if (!contactExists) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: 'You need to insert at least a e-mail or phone number' });
    }

    const emailExists = await ContactRepository.findByEmail(email);

    if (emailExists && emailExists.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update({
      name,
      email,
      phone,
      categoryId,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // Deletar um registro
    const { id } = req.params;

    await ContactRepository.delete(id);

    res.sendStatus(204);
  }
}

module.exports = new ContactController();
