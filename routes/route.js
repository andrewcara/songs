const { application } = require('express');
const express = require('express');

const router = express.Router();
const login = require('../controllers/login');
const playlist = require('../controllers/playlists')


router.get('/', login.getLogin);

router.use('/login', login.AuthLogin);

router.use('/callback', login.Callback);

router.get('/create-playlist', playlist.createPlaylist);


exports.routes = router;