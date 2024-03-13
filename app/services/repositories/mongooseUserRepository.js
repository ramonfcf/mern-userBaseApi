const userSchema = require("../../models/userModel");

class MongooseUserRepository {
  constructor() {
    this.model = userSchema;
  }

  async getAll() {
    return this.model.find();
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async findById(id) {
    return this.model.findById(id);
  }
}

module.exports = MongooseUserRepository;
