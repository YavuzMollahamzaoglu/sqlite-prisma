"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entityObject_1 = require("./entityObject");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(email, name, age, username) {
        const newUser = new entityObject_1.User(this.userRepository.getAllUsers().length + 1, email, name, age, username);
        this.userRepository.save(newUser);
    }
    updateUser(userId, updatedFields) {
        const userToUpdate = this.userRepository.getById(userId);
        if (userToUpdate) {
            const updatedUser = Object.assign(Object.assign({}, userToUpdate), updatedFields);
            this.userRepository.updateUser(updatedUser);
        }
    }
    deleteUser(userId) {
        this.userRepository.deleteUser(userId);
    }
    getUserById(userId) {
        return this.userRepository.getById(userId);
    }
    getAllUsers() {
        return this.userRepository.getAllUsers();
    }
}
