const { application } = require('express');
const express = require('express');


const router = express.Router();

const token = require('../controllers/token-refresh');

router.use('/refresh-token', token.refreshToken);


exports.routes = router;