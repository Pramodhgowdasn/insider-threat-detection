
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const authenticate = require('../../middleware/auth.middleware');

router.get('/', authenticate, usersController.getUsers);
router.post('/', authenticate, usersController.createUser);

module.exports = router;
