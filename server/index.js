const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const notes = require("./models/notes");
var bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://MohitNippanikar:mhtnipp77@cluster0.mwqucgz.mongodb.net/Notepad?retryWrites=true&w=majority" ||
      process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 3002, () => {
      console.log("Server running on 3002");
    });
  })
  .catch((err) => {
    res.send(err);
  });

app.get("/", async (req, res) => {
  let resNote = await notes.findOne({ title: "note1" });

  res.send({ resNote: resNote.text });
});
app.put("/", async (req, res) => {
  await notes.updateOne({ title: "note1" }, { text: req.body.putNote });
  res.send({ status: "done" });
});
module.exports = app;