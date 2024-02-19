import { User } from "./entityObject";
import { UserRepository } from "./repository";

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  createUser(
    email: string,
    name: string | undefined,
    age: number,
    username: string
  ): void {
    const newUser = new User(
      this.userRepository.getAllUsers().length + 1,
      email,
      name,
      age,
      username
    );
    this.userRepository.save(newUser);
  }

  updateUser(
    userId: number,
    updatedFields: { name?: string; age?: number; username?: string }
  ): void {
    const userToUpdate = this.userRepository.getById(userId);

    if (userToUpdate) {
      const updatedUser = { ...userToUpdate, ...updatedFields };
      this.userRepository.updateUser(updatedUser);
    }
  }

  deleteUser(userId: number): void {
    this.userRepository.deleteUser(userId);
  }

  getUserById(userId: number): User | undefined {
    return this.userRepository.getById(userId);
  }

  getAllUsers(): User[] {
    return this.userRepository.getAllUsers();
  }
}
