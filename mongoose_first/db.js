const mongoose = require("mongoose");

const main = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/backend"
    );
    console.log("Connected to MongoDB");
    // When you want to save many documents at once then write like this
    // await StudentModel.insertMany([
    //   { name: "Izzy", age: 2, city: "Somewhere" },
    // ]);

    // When you want to save single document at once then write like this

    const student = new StudentModel({
      name: "Nala",
      age: 3,
      city: "Gurgaon",
    });
    await student.save();

    //////Finding the data
    const data = await StudentModel.find({
      $and: [{ age: { $gte: 1 } }, { age: { $lte: 2 } }],
    });
    console.log("data is", data);
    ////
    console.log("Inserted the Data");
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log(error);
  }
};

main();

// Creating structure of the data I want to store in DB

const studentSchema = mongoose.Schema(
  {
    name: String,
    age: Number,
    city: String,
  },
  { versionKey: false }
);

// If you want to make keys or values mandatory then make schema like this

const studentSchema2 = mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
  },
  { versionKey: false }
);

// Creating the model
const StudentModel = mongoose.model("student", studentSchema);
