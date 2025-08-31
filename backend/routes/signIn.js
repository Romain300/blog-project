const { Router } = require('express');
const { createUser } = require('../controllers/signInController');

const router = Router();
router.post('/', createUser);

module.exports = router;
