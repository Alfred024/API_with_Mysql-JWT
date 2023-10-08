const express = require('express');

const config = require('../config/index');
const user = require('./components/user/network');

const app = express();

app.use('/api/user', user);
app.get('/', (req, res)=>{
    res.send('Funciona')
})
app.listen(config.api.port, ()=>{
    console.log(`API ejecutandose en el puerto ${config.api.port}`);
});