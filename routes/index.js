const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blogs = mongoose.model("blogs");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/", ensureGuest, (req, res) => {
  res.render("index/welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Blogs.find({ user: req.user.id }).then(blogs => {
    res.render("index/dashboard", {
      blogs: blogs
    });
  });
});

router.get("/about", (req, res) => {
  res.render("index/about");
});

module.exports = router;
