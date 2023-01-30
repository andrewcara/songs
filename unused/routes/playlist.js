const { application } = require('express');
const express = require('express');

const router = express.Router();

const playlist = require('../controllers/playlists');

router.use('/create-playlist', playlist.createPlaylist);

router.post('/add-playlist', playlist.addToPlaylist);


exports.routes = router;