const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blogs = mongoose.model("blogs");
const User = mongoose.model("users");
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");

router.get("/", (req, res) => {
  Blogs.find({ status: "public" })
    .populate("user")
    .then(blogs => {
      res.render("blogs/index", {
        blogs: blogs
      });
    });
});

router.get("/show/:id", (req, res) => {
  Blogs.findOne({
    _id: req.params.id
  })
    .populate("user")
    .then(blogs => {
      res.render("blogs/show", {
        blogs: blogs
      });
    });
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("blogs/add");
});

router.post("/", (req, res) => {
  let allowComments;

  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const newBlog = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  };

  new Blogs(newBlog).save().then(blog => {
    res.redirect(`/blogs/show/${blog.id}`);
  });
});

module.exports = router;
