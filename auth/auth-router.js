const router = require('express').Router();
const login = require('./auth-model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('./authenticate-middleware')
const secrets = require('../config/secrets')

function generateToken(user){
  const payload ={
    subject:user.id,
    username: user.username
  
  }
  const timeout={
    expiresIn: "5h"
  }
  return jwt.sign(payload,secrets.jwtSecret,timeout)
}





router.post('/register', (req, res) => {
  const user = req.body;

  const hash= bcrypt.hashSync(user.password,13)
  user.password= hash;

  login.addUser(user)
  .then(saved =>{
    res.status(201).json(saved);
  })
  .catch(error =>{
    res.status(500).json(error)
  })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
    login.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user); // get a token
  
          res.status(201).json({
            message: `Welcome ${user.username}!`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => {
        console.log("ERROR: ", error);
        res.status(500).json({ error: "login error" });
      });
  
});

module.exports = router;
