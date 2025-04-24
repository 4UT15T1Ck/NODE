import User from '../models/user.model.js'
import { ObjectId } from 'mongodb'

class UserService {
  constructor() {
    this.user = User
  }

  async GetAll() {
    return await this.user
  }

  async GetById(id) {
    const user = await this.user.find({ _id: new ObjectId(id) })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async Create(user) {
    const newUser = await this.user.insertOne(user)
    if (newUser) {
      return newUser
    }
    throw new Error('User creation failed')
  }

  async Update(id, user) {
    const result = await this.user.updateOne({ _id: new ObjectId(id) }, { $set: user })
    if (!result) {
      throw new Error('Update failed')
    }
    return result
  }

  async Delete(id) {
    const result = await this.user.deleteOne({ _id: new ObjectId(id) })
    if (!result) {
      throw new Error('Delete failed')
    }
    return result
  }
}

export default new UserService()