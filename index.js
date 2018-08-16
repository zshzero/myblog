const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Its Working fie!");
});

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
