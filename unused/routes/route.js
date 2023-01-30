const { application } = require('express');
const express = require('express');

const router = express.Router();
const login = require('../controllers/login');

router.get('/', login.getLogin);

router.use('/login', login.AuthLogin);

router.use('/callback', login.Callback);


exports.routes = router;