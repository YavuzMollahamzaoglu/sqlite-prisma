"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PrismaUserService_1 = require("./PrismaUserService");
const userRepository = new app_1.PrismaUserRepository();
const userService = new PrismaUserService_1.PrismaUserService(userRepository);
// Kullanıcı oluştur
userService.createUser("john@example.com", "John Doe", 25, "john_doe");
// Kullanıcı bilgilerini güncelle
userService.updateUser(1, { name: "John Doe Jr.", age: 26 });
// Kullanıcıyı sil
userService.deleteUser(1);
// Tüm kullanıcıları getir
const allUsers = await userService.getAllUsers();
console.log(allUsers);
