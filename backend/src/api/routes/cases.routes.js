const express = require('express');
const router = express.Router();
const casesController = require('../controllers/cases.controller');
const authenticate = require('../../middleware/auth.middleware');

router.get('/', authenticate, casesController.getCases);
router.post('/', authenticate, casesController.createCase);
router.get('/:id', authenticate, casesController.getCaseById);
router.put('/:id', authenticate, casesController.updateCase);

module.exports = router;
