const { Router } = require('express');

const eventController = require('../controllers/eventController');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');

const router = Router();

router.use('/events', eventController);
router.use('/users', userController);
router.use('/login', loginController);

module.exports = router;
