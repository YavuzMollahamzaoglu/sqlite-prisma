import { User } from "@prisma/client";
import { PrismaUserRepository } from "./app";

export class PrismaUserService {
  private userRepository: PrismaUserRepository;

  constructor(userRepository: PrismaUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(
    email: string,
    name: string | undefined,
    age: number,
    username: string
  ): Promise<void> {
    await this.userRepository.save({ email, name, age, username });
  }

  async updateUser(
    userId: number,
    updatedFields: { name?: string; age?: number; username?: string }
  ): Promise<void> {
    const userToUpdate = await this.userRepository.getById(userId);

    if (userToUpdate) {
      const updatedUser: User = { ...userToUpdate, ...updatedFields };
      await this.userRepository.updateUser(updatedUser);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.deleteUser(userId);
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.userRepository.getById(userId);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
