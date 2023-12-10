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
      name: "Yavuz Mollahamzaoglu",
      email: "yavuzmollahamzaoglu@gmail.com",
    },
  });

  const users = await prisma.user.findMany();
  console.log(users);

  res.send("Hello put");
});

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
