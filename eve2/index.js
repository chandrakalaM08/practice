//  do not forgot to export server
// module.exports = app;

const express = require("express");
const fs = require("fs");
const { addID } = require("./middlewares/addID.middleware");
const { auth } = require("./middlewares/auth.middleware");
const app = express();
const { logger } = require("./middlewares/logger.middleware");

app.use(express.json());
app.use(addID);
app.use(logger);
app.post("/add/hero", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let { id } = req.body;
    let newHero = {
      health: 95,
      id: id,
      name: "Captain Marvel",
      powers: ["superhuman strength", "energy projection", "flight"],
      villains: [
        { health: 60, name: "Yon-Rog" },
        { health: 80, name: "Supreme Intelligence" },
      ],
    };

    data.heroes.push(newHero);
    fs.writeFileSync("./db.json", JSON.stringify(data));
    res.send(data.heroes);
  } catch (error) {
    res.send(error);
  }
});

app.get("/heroes", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.send(data.heroes);
  } catch (error) {
    res.send(error);
  }
});

app.use(auth);

app.patch("/update/villain/:hero_id", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let heroData = data.heroes;

    let { hero_id } = req.params;

    let flag = false;
    for (let i = 0; i < heroData.length; i++) {
      if (heroData[i].id === +hero_id) {
        flag = true;
        let { name, health } = req.body;
        heroData[i].villains.push({ name, health });
        break;
      }
    }

    if (flag) {
      const updatedData = heroData.find((el) => el.id === +hero_id);
      fs.writeFileSync("./db.json", JSON.stringify(data));
      res.send(updatedData);
    } else {
      res.send({ message: "Hero not found" });
    }
  } catch (error) {
    res.send(error);
  }
});

app.delete("/delete/hero/:hero_id", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let heroData = data.heroes;

    let { hero_id } = req.params;

    let updatedData = heroData.filter((el) => el.id !== +hero_id);

    fs.writeFileSync("./db.json", JSON.stringify(updatedData));
    res.send(updatedData);
  } catch (error) {
    res.send(error);
  }
});

app.listen(7000, () => {
  console.log("Server running at 7000");
});

module.exports = app;
