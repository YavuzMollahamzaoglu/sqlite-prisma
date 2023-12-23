import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/person", (req, res) => {
  res.send("Hello world. From here we should get api knowledge. ");
});

app.put("/user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);

  res.send("Hello put");
});

// app.post("/users", async (req, res) => {
//   const user = await prisma.users.create({
//     data: {
//       name: req.body.name,
//       email: req.body.email,
//       age: req.body.age,
//       username: req.body.username,
//     },
//   });

//   const users = await prisma.user.findMany();
//   console.log(users);

//   res.send("We created a new user without a problem.");
// });

// app.post("/users", async (req, res) => {
//   if (Error) {
//     console.log("This username already exists please choose new one.", Error);
//     res.send("This username already exists please choose new one.");
//   } else {
//     const user = await prisma.users.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//         username: req.body.username,
//       },
//     });

//     const users = await prisma.user.findMany();
//     console.log(users);

//     res.send("We created a new user without a problem.");
//   }
// });

// app.post("/users", async (req, res) => {
//   let age: number = req.body.age;

//   if (age < 18) {
//     res.send("You have to be more than 18 for this website.");
//   } else {
//     const user = await prisma.users.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//         username: req.body.username,
//       },
//     });

//     const users = await prisma.user.findMany();
//     console.log(users);

//     res.send("We created a new user without a problem.");
//   }
// });

// app.post("/users", async (req, res) => {
//   const user = await prisma.users.update({
//     where: {
//       id: 1,
//     },
//     data: {
//       name: req.body.name,
//     },
//   });

//   const users = await prisma.user.findMany();
//   console.log(users);

//   res.send(`Your profile name changed to ${req.body.name}`);
// });

// app.post("/users", async (req, res) => {
//   const user = await prisma.users.delete({
//     where: {
//       id: 4,
//     },
//   });

//   const users = await prisma.user.findMany();
//   console.log(users);

//   res.send(`User with the  ${req.body.username} ID number has been deleted.`);
// });

// app.post("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);

//   res.send(`Hello post`);
// });

// app.post("/users", async (req, res) => {
//   const users = await prisma.user.findUnique({
//     where: {
//       email: "yavuzmollahamzaoglu@gmail.com",
//     },
//   });
//   res.json(users);

//   res.send(`Hello post`);
// });

app.post("/article", (req, res) => {
  console.log(req.body.body);
  console.log(req.body.title);
  res.send("Hello put");
});

app.post("/article2", (req, res) => {
  console.log(req.body.body);
  console.log(req.body.title);
  res.send("For this reponse we are waiting from you to send your book's name");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const prisma = new PrismaClient();

async function main() {
  // TODO: implement prisma add user code here.
}

// main()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     });
