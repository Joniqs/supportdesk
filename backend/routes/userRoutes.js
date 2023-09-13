const express = require('express');
const router = express.Router();
const { registeredUser, loginUser } = require('../controllers/userController');

router.post('/', registeredUser);

router.post('/login', loginUser);

module.exports = router;
