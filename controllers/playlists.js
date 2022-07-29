const callback = require('./login');



exports.createPlaylist = (req, res, next) => {
    const access_token = (req.get('Cookie').split(';')[1].trim().split(':')[1]);
    console.log(access_token);
    res.redirect('/')

}