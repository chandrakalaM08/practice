const mongoose = require("mongoose");
const express = require("express");

const app = express();

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://chandrakaladms:3rm5R2e46uBxXWuD@cluster0.toyzeqx.mongodb.net/livedatabase=true&w=majority"
    );
    console.log("successfully connected to database");
    console.log("Connected to MongoDB");
    // When you want to save many documents at once then write like this
    // await StudentModel.insertMany([
    //   { name: "Izzy", age: 2, city: "Somewhere" },
    // ]);

    // When you want to save single document at once then write like this

    const student = new StudentModel({
      name: "Jerry",
      age: 33,
      city: "Noida",
    });
    await student.save();

    //////Finding the data
    const data = await StudentModel.find();
    console.log("data is", data);
  } catch (error) {
    console.log(error);
  }
};

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

// Creating the model
const StudentModel = mongoose.model("student", studentSchema);

app.listen(8080, () => {
  connection();
  console.log("server running on port 8080");
});
