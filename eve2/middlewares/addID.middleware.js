const fs = require("fs");
const addID = (req, res, next) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let heroData = data.heroes;

  let newId = heroData.length > 0 ? heroData[heroData.length - 1].id + 1 : 1;
  req.body.id = newId;
  next();
};

module.exports = {
  addID,
};

//+1
