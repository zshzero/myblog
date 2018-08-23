const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// Loading User Model
require("./models/User");

// Passport Configuring
require("./config/passport")(passport);

// Loading Routes
const auth = require("./routes/auth");

// Loading Keys
const keys = require("./config/keys");

// Mapping global promises
mongoose.Promise = global.Promise;

// Connecting Mongoose
mongoose
  .connect(
    keys.mongoURI,
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

app.get("/", (req, res) => {
  res.send("Its Working!");
});

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Using Routes
app.use("/auth", auth);

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
