// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    
    console.log(req);
    if (!req.body.email) {
      return res.status(400).send({
        msg: 'Please enter a emails '
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }

    next();
  }
  
};



