const bcrypt = require('bcrypt');
const auth = require('../../auth/index');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });

        return bcrypt.compare(password, data[0].password)
            .then(samePassword =>{
                if(samePassword){
                    return auth.sign(data[0]);
                }else{
                    throw new Error('El username no existe');
                }
            })
            .catch((err) =>{
                console.log(`Encriptetion error: ${err}`);
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