const express = require('express');
const router = express.Router();
const db = require('../../database/db');

const authenticate = require('../../middleware/auth.middleware');
const authorizeRoles = require('../../middleware/role.middleware');

router.get(
  '/',
  (req, res) => {
    res.json({ reached: true });
  }
);

module.exports = router;
