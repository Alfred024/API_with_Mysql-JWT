const express = require('express');

const config = require('../config/index');
const post = require('./components/post/network');
const errors = require('../network/erros');

const app = express();

app.use(bodyParser.json());

app.use('/api/post', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', config.postService.port);
});