const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("myblogs/index");
});

router.get("/add", (req, res) => {
  res.render("myblogs/add");
});

module.exports = router;
