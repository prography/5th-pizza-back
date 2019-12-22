const { Router } = require('express');
const AuthController = require('../controllers/AuthController')

const router = Router();

router.post('/login/:type', AuthController.login)

module.exports = router;