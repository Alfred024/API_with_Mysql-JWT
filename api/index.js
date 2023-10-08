const express = require('express');

const config = require('../config/index');
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();
app.use(express.json());

//Routes components
app.use('/api/user', user);
app.use('/api/auth', auth);

app.get('/', (req, res)=>{
    res.send('Funciona')
})
app.listen(config.api.port, ()=>{
    console.log(`API ejecutandose en el puerto ${config.api.port}`);
});