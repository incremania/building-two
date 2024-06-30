const express = require('express');
const router = express.Router();
// const { register, getAllUsers } = require('../controllers/user')
const {  register } = require('../controllers/user')


router
.post('/register', register)
// .get('/users', getAllUsers)

module.exports = router