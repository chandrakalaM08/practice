//  do not forgot to export server
// module.exports = app;

const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/add/hero", (req, res) => {
  try {
  } catch (error) {
    res.send(error);
  }
});

app.get("/heroes", async (req, res) => {
  try {
    let responseData = fs.readFileSync("./db.json", "utf-8");
    res.send(responseData);
  } catch (error) {
    res.send(error);
  }
});

app.patch("/update/villain/:hero_id", (req, res) => {});

app.delete("/delete/hero/:hero_id", (req, res) => {});

app.listen(8000, () => {
  console.log("Server running at 8000");
});

module.exports = app;
