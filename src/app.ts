import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/person", (req, res) => {
  res.send("hello world");
});

app.put("/user", (req, res) => {
  console.log(req.body.name);
  res.send("Hello put");
});

app.post("/article", (req, res) => {
  console.log(req.body.title);
  res.send("Hello put");
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
