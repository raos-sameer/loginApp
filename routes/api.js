const express = require("express");
const router = express.Router();
const SignUp = require("../model/signup");
//Routes
router.post("/signup/", (req, res) => {
  SignUp.find({
    email: req.body.email,
  })
    .then((data) => {
      if (data.length > 0) {
        res.json({
          error: "Email already present",
        });
      } else {
        const data = {
          email: req.body.email,
          fullName: req.body.fullName,
          password: req.body.password,
        };
        const newUser = new SignUp(data);
        newUser.save((error) => {
          if (error) {
            res.json({
              error: "Something went wrong!",
            });
          } else {
            res.json(data);
          }
        });
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

router.get("/login/", (req, res) => {
  SignUp.find({
    email: req.query.email,
    password: req.query.password,
  })
    .then((data) => {
      console.log("Data :", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});
module.exports = router;
