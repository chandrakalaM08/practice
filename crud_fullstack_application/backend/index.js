const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes");
const { notesRouter } = require("./routes/notesRoutes");
const { authMiddleware } = require("./middleware/authentication.middleware");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use(authMiddleware);
app.use("/notes", notesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected successfully to database");
  } catch (error) {
    console.log(`error: Trouble connecting to database, ${error.message}`);
  }
  console.log(`Server is running on port ${process.env.port}`);
});
