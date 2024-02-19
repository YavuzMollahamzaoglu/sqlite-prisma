import { PrismaUserRepository } from "./app";
import { PrismaUserService } from "./PrismaUserService";
import express, { Request, Response } from "express";

// Express uygulamasını oluştur
const app = express();
const userRepository = new PrismaUserRepository();
const userService = new PrismaUserService(userRepository);

// Kullanıcı oluşturma endpoint'i
app.post("/createUser", async (req: Request, res: Response) => {
  try {
    await userService.createUser(
      "john@example.com",
      "John Doe",
      25,
      "john_doe"
    );
    res.status(200).send("User created successfully");
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Kullanıcı güncelleme endpoint'i
app.put("/updateUser", async (req: Request, res: Response) => {
  try {
    await userService.updateUser(1, { name: "John Doe Jr.", age: 26 });
    res.status(200).send("User updated successfully");
  } catch (error) {
    console.error("User update error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Kullanıcı silme endpoint'i
app.delete("/deleteUser", async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(1);
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("User deletion error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Tüm kullanıcıları listeleme endpoint'i
app.get("/getAllUsers", async (req: Request, res: Response) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Uygulamayı belirtilen portta dinle
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
