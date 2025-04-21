import User from '../models/user.model';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

export class UserService {
  async getUsers() {
    return await User.findAll();
  }

  async getUserById(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async addUser(data: { name: string; email: string; password: string }) {
    const newUser = await User.create({
      id: `${Date.now()}`,
      ...data,
    });
    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });
    return { token, user };
  }

  async updateUser(
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(data);
    return user;
  }

  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }
}

export default new UserService();
