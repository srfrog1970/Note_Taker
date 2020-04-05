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
    // Take out the note in the db.json object array
    data.splice(req.params.id - 1, 1);
    // Call to reset the IDs
    resetIds(data);
    // console.log(path.join(__dirname, "../db/db.json", JSON.stringify(data)));
    // Write out the db.json file.
    fs.writeFile(
      //__dirname comes from "path"
      // "../db/dbjson" means its 2 levels up and in the db folder called db.json
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
  // loop through each array and the id is the index number+1
  data.forEach((element, indexNum) => {
    element.id = indexNum + 1;
  });
}
