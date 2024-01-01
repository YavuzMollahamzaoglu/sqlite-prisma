import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/person", (req, res) => {
  res.send("Hello world. From here we should get api knowledge. ");
});

// https://restfulapi.net/resource-naming/
// Check following url for api naming best practices. You can also have a little research about it.
// Based on best practices, this api should be /users
// GET, POST, PUT, PATCH, DELETE... Those are called http request methods.. Check them to learn when ton use PUT, when to use POST.
// For example: if you are creating something new in the database then you should use POST. If you are updating an existing item
// then you should use PUT....
app.put("/user", async (req, res) => {
  // You directly create the user, but what if body doesn't contain name or email?
  // To prevent things like that, we need some checks before creating the user.

  /*
  For example:
  if (!req.body.name || !req.body.email) {
    // we should return an error code, not 200 and an error message.
    res.send(...)
  }
  */

  // What if this function fails? You need to wrap it with try catch, and return
  // differently if there is an error or not.
  // Another thing: Your user model contains more fields, not only name and email!!!
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  // The responsibility of this API is to create a user. There is no need to query all the users after creating one.
  // As I understand you wrote this code to test if create worked, but instead you can send another request to GET /users and return all the users
  // or even GET /users/{{unique_user_identifier}} with the identifier of the user that you just created.
  const users = await prisma.user.findMany();
  console.log(users);

  // Instead of returning 'Hello Put', we should return something makes more sense.
  // Imagine returning something like this { message: 'User is created successfully.', user: { name: req.body.name, req.body.email }}
  res.send("Hello put");
});

// Now I see you have some commented code. Imagine I want to review your code, should I also review this part? Is this code being used?
// If they are commented, then it means they are not in use. We never leave unnecessary code in your projects. If it is unnecessary, delete them..
// If not, uncomment them..

// 1.
// Good api name and method type POST /users
// No parameter check. what if something mandatory is empty, for example username or email...
// You don't have try catch, what if it fails?
// What if user already exists?
// No need to get all the users after creating one.
// You should return an object. { message: '', user: {}}

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

// 2.
// I see you want to try the user already exists error.
// But I really didn't understand what you tried here.
// if(Error) looks a bit weird. what is Error? When it is true?
// It should be something like this:
//
// const user = prisma.users.get....
// if(user) { ... }
//
// Another thing is that you should return a diffrerent error code in error scenario.
// Also return an object like this { message: '...' }
// No need to get all the users after creating one.
// You should return an object. { message: '', user: {}}

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

// 3.
// Nice you tried some validation here.
// First things first 'let age' should be const age.. Please double check when to use const and let to remember, because I think you know about them already.
// Another thing is that you created a variable for age, but you are still using req.body.age when you create the user. Why not using the age variable there?
// Let's create 4 variables for name, email, age and username.
// They should all be let? Of course not.. Use const...
// And add some additional checks if username is there, if email is a valid email....
// I am repeating myself but don't get users after creating one, and return an object at the end.
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

// 4.
// Let me try to tell you what happens here. You have an endpoint POST /users
// But you already have that?! You can't just use the same endpoints. If you send a request which one should listen and send back a response?
// Don't forget!! Endpoint and Method Type combination is unique. Which means you can have POST /users and PUT users/ at the same time.
// But you can't have two timeds POST /users..
// Second thing is what this endpoint doing is a bit weird. You update name of thje user with id = 1
// It shouldn't update user with id 1 always. Instead it should get id from URL
// https://expressjs.com/en/guide/routing.html check Route parameters.
// And it should be username?!!! PUT users/{{username}}
// where: { username }
// The rest is similar with previous comments.
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

// 5.
// Again another POST USERS!! You know it is not possbile now.
// Instead you should use DELETE /users/{{username}}
// Right now it always deletes user with id 4. That part should be dynamic, which means where part should use a variable...
// Rest is similar.. error case? try catch!!! response object instead of text!!
//
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

// 6.
// This api returns all the users/
// Then it should be GET /users
// Then you should return an object, example
// { count: users.length, users }
// app.post("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);

//   res.send(`Hello post`);
// });

// 7.
// This is a GET. Remember, you should never hardcode a variable. In this case: "yavuzmollahamzaoglu@gmail.com"
// Variables should always come from request. It can be received from body, or it can be received from Route.
// app.post("/users", async (req, res) => {
//   const users = await prisma.user.findUnique({
//     where: {
//       email: "yavuzmollahamzaoglu@gmail.com",
//     },
//   });
//   res.json(users);

//   res.send(`Hello post`);
// });

// Next time clean up your code before committing.
// For example you don't need /article parts anymore.
// Also remember my comment about preventing unnecessary code in your project.
// Last line is commented out. Don't forget to clean up
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
