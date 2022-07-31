const { application } = require('express');
const express = require('express');

const router = express.Router();

const playlist = require('../controllers/playlists')

router.get('/create-playlist', playlist.createPlaylist);

//router.post('/add-playlist');


exports.routes = router;