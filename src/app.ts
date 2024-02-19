import { PrismaClient, User } from "@prisma/client";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const prisma = new PrismaClient();

// post user +
// put users/{{username}} +
// delete users/{{username}} +
// get users
// get users/{{username}}

// get users -> query parameter ile email filtresi yapacak

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
  // Another thing: Your user model contains more fields, not only name and email!!!--
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

  // Instead of returning 'Hello Put', we should return something makes more sense.--
  // Imagine returning something like this { message: 'User is created successfully.', user: { name: req.body.name, req.body.email }}--
  res.send(
    `User is created successfully.User:${(req.body.name, req.body.email)}`
  );
});

// Now I see you have some commented code. Imagine I want to review your code, should I also review this part? Is this code being used?
// If they are commented, then it means they are not in use. We never leave unnecessary code in your projects. If it is unnecessary, delete them..
// If not, uncomment them..

// 1.
// Good api name and method type POST /users-
// No parameter check. what if something mandatory is empty, for example username or email...-
// You don't have try catch, what if it fails?-
// What if user already exists?
// No need to get all the users after creating one.-
// You should return an object. { message: '', user: {}}-
// !! Required fieldlari schemada tanimlama butun required fieldlari kontrol et--

// app.post("/users", async (req, res) => {
//   try {
//     if (!req.body.username || !req.body.email) {
//       res
//         .status(400)
//         .send({ message: "You did not pass name or email check again." });
//       return;
//     }
//     const user = await prisma.users.create({
//       data: {
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age,
//         username: req.body.username,
//       },
//     });
//     res.send({
//       message: `You created your user: ${req.body.name}, ${req.body.username}`,
//     });
//   } catch (error) {
//     res
//       .status(400)
//       .send({ message: "There is a problem in your responde check again." });
//   }
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
// No need to get all the users after creating one.-
// You should return an object. { message: '', user: {}}-
// +
app.post("/users", async (req, res) => {
  // const mailformat: any =
  //   /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const { name, username, email, age } = req.body;

  if (!req.body.email || !req.body.username) {
    res.status(400);
    return res.send({
      message: "Username or email is not provided.",
    });
  }

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    res.status(400);
    return res.send({
      message: "User already exists.",
    });
  }

  const user = await prisma.users.create({
    data: {
      name,
      email,
      age,
      username,
    },
  });

  res.send({ message: "User creted succesfully", data: user });
});

// 3.
// Nice you tried some validation here.-
// First things first 'let age' should be const age.. Please double check when to use const and let to remember, because I think you know about them already.-
// Another thing is that you created a variable for age, but you are still using req.body.age when you create the user. Why not using the age variable there?-
// Let's create 4 variables for name, email, age and username.-
// They should all be let? Of course not.. Use const...-
// And add some additional checks if username is there, if email is a valid email....-
// I am repeating myself but don't get users after creating one, and return an object at the end.-
// app.post("/users", async (req, res) => {
//   const age: number = req.body.age;

//   const mailformat: any =
//     /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

//   const email: string = req.body.email;

//   if (age < 18 && email.match(mailformat)) {
//     res.send(
//       "You have to be more than 18 and your email must be valid for this website."
//     );
//   } else {
//     const user = await prisma.users.create({
//       data: {
//         name: req.body.name,
//         email: email,
//         age: age,
//         username: req.body.username,
//       },
//     });

//     res.send("We created a new user without a problem.");
//   }
// });

// 4.
// Let me try to tell you what happens here. You have an endpoint POST /users-
// But you already have that?! You can't just use the same endpoints. If you send a request which one should listen and send back a response?-
// Don't forget!! Endpoint and Method Type combination is unique. Which means you can have POST /users and PUT users/ at the same time.-
// But you can't have two timeds POST /users..-
// Second thing is what this endpoint doing is a bit weird. You update name of thje user with id = 1
// It shouldn't update user with id 1 always. Instead it should get id from URL
// https://expressjs.com/en/guide/routing.html check Route parameters.
// And it should be username?!!! PUT users/{{username}}
// where: { username }
// The rest is similar with previous comment
// we should use Path variable(Path parameter!!!)!!
// Check if there is username for we are looking!!!!!!----
// +
app.put("/user/:username", async (req, res) => {
  const { username } = req.params;

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ username }],
    },
  });

  if (!existingUser) {
    return res.status(404).send({ message: "User not found" });
  }

  const user = await prisma.users.update({
    where: {
      username: req.params.username,
    },
    data: {
      name: req.body.name,
    },
  });

  res.send({ message: "User updated successfully", data: user });
});

// 5.
// Again another POST USERS!! You know it is not possbile now.-
// Instead you should use DELETE /users/{{username}}-
// Right now it always deletes user with id 4. That part should be dynamic, which means where part should use a variable...-
// Rest is similar.. error case? try catch!!! response object instead of text!!--
// do the samethings with 4. function !!!!--

// +
app.delete("/users/:username", async (req, res) => {
  const { username } = req.params;

  const existingUser = await prisma.users.findFirst({
    where: {
      username,
    },
  });

  if (!existingUser) {
    return res.status(404).send({ message: "User not found" });
  }

  const user = await prisma.users.delete({
    where: {
      username,
    },
  });

  res.send({
    message: "User deleted successfully",
    data: user,
  });
});

// 6.
// This api returns all the users/-
// Then it should be GET /users-
// Then you should return an object, example-
// { count: users.length, users }-
// add age with query parameters !!!
// age 19 yazarsam 19 yasindakileri getir eger age pass etmezsem butun kullanicilari getir.!!! age degil email olsun istedigimiz emaili donsun.

app.get("/users/:age", async (req, res) => {
  const age: any = Number(req.params);
  const name = req.body.name;
  const username = req.body.username;
  if (age !== 19) {
    res.send({
      message: `Here is all the users that 19 years old:`,
      name,
      username,
    });
  }
  const users = await prisma.users.findMany();

  const result = { result: users, count: users.length };

  res.send(result);
});

app.get("/users/:username", async (req, res) => {
  const { username } = req.params;

  const user = await prisma.users.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(404);
    return res.send({ message: "User not found" });
  }

  res.send({ message: "User found", data: user });
});

app.get("/users", async (req, res) => {
  const email = req.query.email as string;

  if (email) {
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      res.status(404);
      return res.send({ message: "User not found" });
    }
    return res.send({ count: 1, data: [user] });
  }

  const users = await prisma.users.findMany();
  res.send({ count: users.length, data: users || [] });
});

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
