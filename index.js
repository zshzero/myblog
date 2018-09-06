const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./models/User");

require("./config/passport")(passport);

const index = require("./routes/index");
const auth = require("./routes/auth");
const myblogs = require("./routes/myblogs");

const keys = require("./config/keys");

mongoose.Promise = global.Promise;

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

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/auth", auth);
app.use("/myblogs", myblogs);

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
