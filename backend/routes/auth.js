const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MONGOURI, JWT_SECRET } = require("../keys");

router.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ error: "Please add all the fields." });
    }

    const savedUser = await USER.findOne({ email: email });
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new USER({
      name,
      email,

      password: hashedPassword,
    });

    const userData = await user.save();
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while signing up." });
  }
});

router.post("/api/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add email and password." });
  }

  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
          const { _id, name, email } = savedUser;

          res.json({ token, user: { _id, name, email } });
        } else {
          return res.status(422).json({ error: "Invalid password" });
        }
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
