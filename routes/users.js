const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route   POST  api/users
// @desc    Register route
// @access   public

router.post(
  "/",
  [
    check("name", "name should not be empty")
      .not()
      .isEmpty(),
    check("email", "Please include valid Email").isEmail(),
    check("password", "Password must br atleast 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      var user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "email already exists" });
      }
      user = new User({
        name: name,
        email: email,
        password: password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("JWTsecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;
