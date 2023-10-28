const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

router.get("/api/all-users/:id", async (req, res, next) => {
  try {
    const users = await USER.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
});

router.get("/api/user/:id", (req, res) => {
  USER.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found." });
    });
});

router.get("/api/all-personal-users/:id", async (req, res, next) => {
  try {
    const personal_users = await USER.find({
      _id: { $ne: req.params.id },
      role: { $in: ["volunteer", "doctor"] },
    }).select(["email", "name", "_id", "-password"]);
    return res.json(personal_users);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
