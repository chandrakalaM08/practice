// export server
// module.exports = app

const express = require("express");
const fs = require("fs");
const os = require("os");
const app = express();
const dns = require("dns");
app.use(express.json());

function loggingOperations(operation) {
  const logMessage = `${operation} at ${new Date().toString()}\n`;
  fs.appendFileSync("./logs.txt", logMessage);
}

app.get("/", (req, res) => {
  loggingOperations("The home route visited");
  res.send("<h1>Welcome to the Home Page</h1>");
});

app.post("/add/student", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let studentData = data.students;
    const { age, location, tickets } = req.body;

    const newObj = {
      id: os.userInfo().uid,
      name: os.userInfo().username,
      age: age,
      location: location,
      tickets: tickets,
    };

    studentData.push(newObj);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    console.log("here", studentData);
    loggingOperations("New student has been added to the database");

    res.send(data.students);
  } catch (error) {
    res.send(error);
  }
});

app.post("/add/instructor", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let instructorData = data.instructors;
    const { age, location, sub, exp } = req.body;

    const newObj = {
      id: os.userInfo().uid,
      name: os.userInfo().username,
      age: age,
      location: location,
      sub: sub,
      exp: exp,
    };

    instructorData.push(newObj);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    loggingOperations("New instructor has been added to the database");
    res.send(instructorData);
  } catch (error) {
    res.send(error);
  }
});

app.get("/students", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    loggingOperations("All the students data provided");
    res.send(data.students);
  } catch (error) {
    res.send(error);
  }
});

app.get("/instructors", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    loggingOperations("All the instructors data provided");
    res.send(data.instructors);
  } catch (error) {
    res.send(error);
  }
});

app.get("/tickets", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let studentData = data.students;
    let ticketCount = 0;

    // studentData.forEach((element) => {
    //   ticketCount += element.tickets.length;
    // });

    for (let i = 0; i < studentData.length; i++) {
      ticketCount += studentData[i].tickets.length;
    }

    loggingOperations(
      `Total number of tickets in the system are ${ticketCount}`
    );
    res.send(`Total number of tickets in the system are ${ticketCount}`);
  } catch (error) {
    res.send(error);
  }
});

app.get("/address", (req, res) => {
  try {
    const url = "masaischool.com";
    dns.lookup(url, (err, address, family) => {
      loggingOperations(
        `URL: ${url} IP Address: ${address} Family: ${
          family === 4 ? "IPv4" : "IPv6"
        }`
      );
      res.send(
        `URL: ${url} IP Address: ${address} Family: ${
          family === 4 ? "IPv4" : "IPv6"
        }`
      );
    });
  } catch (error) {
    res.send(error);
  }
});

app.listen(8080, () => {
  console.log("Server running");
});
module.exports = app;
