const jwt = require('jsonwebtoken');
const config = require('../config/index')
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log('DECODED');
        console.log(decoded);
        if(decoded.id !== owner){
            throw new Error('No tienes permisos para editar este perfil');
        }
    },

    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    },
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = jwt.verify(token, secret);

    req.user = decoded;

    return decoded;
}

function getToken(auth) {
    if(!auth){
        throw new Error('No viene token');
    }

    if(auth.indexOf('Bearer ') === -1){
        throw new Error('Formato inválido');
    }

    
    let token = auth.replace('Bearer ', '');
    return token;
}

module.exports = {
    sign,
    check,
};