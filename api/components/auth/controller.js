const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'AUTH';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = require('../../../store/mysql');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });

        //Data password es la contraseña encriptada que se guarda en la tabla AUTH
        return bcrypt.compare(password, data.password)
            .then(samePassword =>{
                if(samePassword){
                    return auth.sign({ ...data });
                }else{
                    throw new Error('El username no existe');
                }
            })
            .catch((err) =>{
                console.log(`Error en la información proporcionada:  ${err}`);
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }
        return store.upsert(TABLA, authData);
    }

    async function remove(id) {
        return await store.remove(TABLA, id);
    }

    return {
        login,
        upsert,
        remove,
    }
}