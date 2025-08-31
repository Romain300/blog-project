const { Router } = require('express');
const { logInUser } = require('../controllers/logInController');

const router = Router();
router.post('/', logInUser);

module.exports = router;