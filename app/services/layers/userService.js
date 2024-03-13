const MongooseUserRepository = require("../repositories/mongooseUserRepository");

class UserService {
  constructor() {
    this.repository = new MongooseUserRepository();
  }

  async getAll() {
    return this.repository.getAll();
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async delete(id) {
    return this.repository.delete(id);
  }
}

module.exports = UserService;
