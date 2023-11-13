const express = require('express');

const config = require('../config/index');
const app = express();
const router = require('./network')

app.use('/', router);

app.listen(config.mysqlService.port, ()=>{
    console.log(`Servicio mysql escuchando en el puerto ${config.mysqlService.port}`);
});