const User = require("../models/users.model");

exports.user_create = function(req, res,next) {

  
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    mobileNo: req.body.mobileNo,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
     return  next(err)
    } else {
      res.send("user Created successfully");
    }
  });
};

exports.user_details = function(req, res) {
    User.findById(req.params.id, function(err, user) {
    if (err) res.send(err);
    else res.send(user);
  });
};

exports.user_update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
      if (err) res.send (err);

      else res.send('User updated.');
  });
};

exports.user_delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err) {
      if (err) res.send (err);

     else res.send('Deleted successfully!');
  })
};
exports.user_getall = function (req, res) {
  User.find( function (err,result) {
      if (err) res.send (err);

     else res.send(result);
  })
};
exports.verify_email = function (req, res) {
  User.findOne({ 
    'email':req.body.email })
    .then(user => {
      if (!user) {
        return res.json({
          emailNotTaken: true
        });
      }
      else{ return res.json({
        emailNotTaken: false
      });}
    }    
    )}