"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserService = void 0;
class PrismaUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(email, name, age, username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.save({ email, name, age, username });
        });
    }
    updateUser(userId, updatedFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToUpdate = yield this.userRepository.getById(userId);
            if (userToUpdate) {
                const updatedUser = Object.assign(Object.assign({}, userToUpdate), updatedFields);
                yield this.userRepository.updateUser(updatedUser);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.deleteUser(userId);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getById(userId);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAllUsers();
        });
    }
}
exports.PrismaUserService = PrismaUserService;
