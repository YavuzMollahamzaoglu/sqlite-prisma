import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaUserRepository {
  async save(userInput: {
    email: string;
    name?: string;
    age: number;
    username: string;
  }): Promise<void> {
    await prisma.user.create({
      data: userInput,
    });
  }

  async getById(userId: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async updateUser(updatedUser: User): Promise<void> {
    await prisma.user.update({
      where: {
        id: updatedUser.id,
      },
      data: updatedUser,
    });
  }

  async deleteUser(userId: number): Promise<void> {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
