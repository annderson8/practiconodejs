const express = require('express');
const bodyPaser = require('body-parser');
const config = require('../config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

app.use(bodyPaser.json());

app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port,() => {
    console.log('Servicio Post escuchando en el puerto:' + config.post.port);
});