const express = require('express');
const userController = require('../userController');
const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
    res.status(201).send("user created");
})

//intended route for login checl
router.post('/login', 
userController.loginUser, 
(req, res) => {
    res.status(200).send(res.locals.loginMsg);
})

module.exports = router;