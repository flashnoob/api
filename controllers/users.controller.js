const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwtMiddleware = require("../middleware/jwt.middleware");
const Response = require("http-response-object");
const jwt = require("jsonwebtoken");

exports.user_create = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      bcrypt.hash(req.body.password, 10).then(hash => {
        let user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          mobileNo: req.body.mobileNo,
          password: hash
        });
        user.save(err => {
          if (err) {
            res.send({ error: err });
          } else {
            res.send({ message: "user Created successfully" });
          }
        });
      });
    } else {
      return res.json({
        emailNotTaken: false
      });
    }
  });
};

exports.user_details = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.send(err);
    else res.send(user);
  });
};

exports.user_update = function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, function(
    err,
    product
  ) {
    if (err) res.send(err);
    else res.send("User updated.");
  });
};

exports.user_delete = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) res.send(err);
    else res.send("Deleted successfully!");
  });
};

exports.user_sign_in = (req, res) => {
  const email = req.body.data.email;
  const password = req.body.data.password;

  User.findOne({
    email
  }).then(user => {
    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }
    bcrypt
      .compare(password, user.password)
      .then(ismatch => {
        if (!ismatch) {
          return res
            .status(400)
            .json({
              success: false,
              message: "incorrect email-id or password"
            });
        }
        if (ismatch) {
          const payload = { id: user.id };

          jwt.sign(
            payload,
            "privateKey",
            { expiresIn: "365d" },
            (err, token) => {
              return res
                .status(200)
                .json({ success: true, message: "login successfully", token });
            }
          );
        }
      })
      .catch(err => console.log(err));
  });
};
exports.user_getall = function(req, res) {
  User.find(function(err, result) {
    if (err) res.send(err);
    else res.send(result);
  });
};
exports.verify_email = function(req, res) {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.json({
        emailNotTaken: true
      });
    } else {
      return res.json({
        emailNotTaken: false
      });
    }
  });
};
