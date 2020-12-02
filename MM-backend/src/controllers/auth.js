const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { name, password, email, photo, number } = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  User.findOne({ email }, (err, data) => {
    User.findOne({ name }, (err, name) => {
      if (name) {
        console.log(name);
  
        return res.status(400).json({
          error: "User name already exists !!!",
        });
      } 
    })
    
    if (data) {
      console.log(data);

      return res.status(400).json({
        error: "Email already exists !!!",
      });
    }
    else{
      const user = new User({ name, email, password: hash, photo, number });
      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            err: "NOT able to save user in DB",
          });
        }
        res.json({
          name: user.name,
          email: user.email,
          id: user._id,
        });
      });
    }
  });
   
};

exports.signin = (req, res) => {
  const errors = validationResult(req);

  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        error: "Email and Password do not match ",
      });
    }

    //CREATE TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //PUT TOKEN IN COOKIE
    res.cookie("token", token, { expire: new Date() + 9999 });
    //SEND RESPONSE TO FRONT END
    const { _id, name, email, role, photo } = user;
    return res.json({ token, user: { _id, name, email, role, photo } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully!!!",
  });
};

//PROTECTED ROUTES
// exports.isSignedIn = expressJwt({
//   secret: process.env.SECRET,
//   algorithms: ['RS256'],
//   userProperty: "auth"
// });

//CUSTOM MIDDLEWARES
// exports.isAuthenticated = (req, res, next) => {
//   let checker = req.profile && req.auth && req.profile._id == req.auth._id;
//   if (!checker) {
//     return res.status(403).json({
//       error: "ACCESS DENIED",
//     });
//   }
//   next();
// };

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "YOU ARE NOT ADMIN, ACCESS DENIED",
    });
  }
  next();
};
