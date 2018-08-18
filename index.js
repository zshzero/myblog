const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Passport Configuring
require("./config/passport")(passport);

// Loading Routes
const auth = require("./routes/auth");

const app = express();

app.get("/", (req, res) => {
  res.send("Its Working!");
});

// Use Routes
app.use("/auth", auth);

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
