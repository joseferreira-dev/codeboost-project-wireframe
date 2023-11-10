const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(req, res) {
    // Listar todas as categorias
    const { orderBy } = req.query;

    const categories = await CategoryRepository.findAll(orderBy);

    res.json(categories);
  }

  async store(req, res) {
    // Criar um registro
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoryRepository.findByName(name);

    if (categoryExists) {
      return res.status(400).json({ error: 'This category already exists' });
    }

    const category = await CategoryRepository.create({ name });

    res.json(category);
  }
}

module.exports = new CategoryController();
