const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
 
const { isAuthenticated } = require("./../middlewares/jwt.middleware.js"); 

const router = express.Router();
const saltRounds = 10;

router.post('/signup', (req, res, next) => {
  const {email, username, password} = req.body 

  // Check if the email or password or name is provided as an empty string 
  if (email === '' || password === '' || username === '') {
    res.status(400).json({ message: "Provide email, username and password" });
    return;
  }
 
  if(username.length > 25){
    res.status(400).json({ message: "Username is too long."})
    return;
  }
  if(email.length > 321){
    res.status(400).json({ message: "Email is too long and doesnt exist propably"})
  }
  if(password.length > 256){
    res.status(400).json({ message: "Password is too long."})
  }

  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }
  
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  // Check the users collection if a user with the same email already exists
  User.findOne({username})
    .then((foundUsername) => {
      // If the user with the same email already exists, send an error response
      if (foundUsername) {
        res.status(400).json({ message: "Username already taken" });
        return;
      }
      
      User.findOne({email})
        .then(foundEmail => {
          if(foundEmail){
            res.status(400).json({ message: "User with that Email already exists. Try Login" });
            return;
          }
          
          // If the username AND email is unique, proceed to hash the password
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);
    
          // Create a new user in the database
          // We return a pending promise, which allows us to chain another `then` 
          User.create({ email, password: hashedPassword, username })
          .then((createdUser) => {
            // Deconstruct the newly created user object to omit the password
            // We should never expose passwords publicly
            const { email, username, _id } = createdUser;
          
            // Create a new object that doesn't expose the password
            const user = { email, username, _id };
      
            // Send a json response containing the user object
            res.status(201).json({ user: user });
          })

        })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" })
    });
})

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
 
  // Check if email or password are provided as empty string 
  if (username === '' || password === '') {
    res.status(400).json({ message: "Provide username and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ username })
    .then((foundUser) => {
    
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: `Username ${username} not found.` })
        return;
      }
 
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
 
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, username } = foundUser;
        
        // Create an object that will be set as the token payload
        const payload = { _id, email, username };
 
        // Create and sign the token
        const authToken = jwt.sign( 
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );
 
        // Send the token as the response
        res.status(200).json({ authToken: authToken }) //maybe: res.status(200).json({ token: authToken })
      }
      else {
        res.status(401).json({ message: "Wrong Password" });
      }
 
    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
})

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = router