const express = require("express");
require("dotenv").config();

const { connection, userSchema, UserModel } = require("./db");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Welcome to Home Page..!!!");
});

// Get users
app.get("/users", async (request, response) => {
  let query = request.query;
  try {
    const users = await UserModel.find(query);
    response.send(users);
  } catch (error) {
    response.send({ error: error.message });
  }
});

// Update a single user
app.patch("/users/:id", async (request, response) => {
  let { id } = request.params;
  let payload = request.body;
  try {
    const user = await UserModel.findByIdAndUpdate({ _id: id }, payload);
    response.send("User has been updated");
  } catch (error) {
    response.send({ error: error.message });
  }
});

//  Delete a user
app.delete("/delete/:id", async (request, response) => {
  let { id } = request.params;

  try {
    const user = await UserModel.findByIdAndDelete({ _id: id });
    response.send("User has been deleted");
  } catch (error) {
    response.send({ error: error.message });
  }
});

//  Register a user
app.post("/signup", async (request, response) => {
  try {
    console.log(request.body);
    const user = new UserModel(request.body);
    await user.save();
    response.send("User has been successfully registered");
  } catch (error) {
    console.log("Error occured");
    response.send({ error: error.message });
  }
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("successfully connected to database");
  } catch (error) {
    console.log("Cannot connect to database");
    console.log(error);
  }
  console.log(`Server is running at port ${process.env.port}`);
});
