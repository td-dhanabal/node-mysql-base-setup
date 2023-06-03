const express = require('express')
const router = express.Router();
const userController = require('../controllers/user');
const checkauth = require('../middleware/checkauth');

router.post("/register", userController.add_user);

router.post("/login", userController.login);

router.get("/users", checkauth, userController.all_users);

module.exports = router;