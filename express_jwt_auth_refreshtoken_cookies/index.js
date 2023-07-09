const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
// Parse JSON body
app.use(express.json());

app.use("/user", userRouter);
app.use("", productRouter);
// Start the server
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Successfully connected to db");
  } catch (error) {
    console.log("error : ", error.message);
  }
  console.log(`Server started on port ${process.env.port}`);
});
