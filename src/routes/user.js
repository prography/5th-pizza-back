const { Router } = require('express');
const UserController = require('../controllers/UserController')

const router = Router();

router.delete('/:user_id', UserController.deleteUser)

module.exports = router;