// require the db.json file
const data = require("../db/db.json");

const fs = require("fs");

const path = require("path");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(data);
  });

  app.post("/api/notes", function (req, res) {
    data.push(req.body);
    resetIds(data);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(data),
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("Added!");
      }
    );

    res.json({ message: "You've created a new note!" });
  });

  app.delete("/api/notes/:id", function (req, res) {
    data.splice(req.params.id, 1);
    resetIds(data);
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(data),
      function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("Deleted!");
      }
    );

    res.json({ message: "You've deleted note!" });
  });
};

function resetIds(data) {
  console.log(data);
  data.forEach((element, indexNum) => {
    element.id = indexNum + 1;
  });
  console.log(data);
}
