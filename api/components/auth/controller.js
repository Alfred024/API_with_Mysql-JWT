const auth = require('../../auth/index');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = require('../../../store/dummy');
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });

        if(data[0].password === password){
            return auth.sign(data[0]);
        }else{
            throw new Error('El username no existe');
        }
    }

    function upsert(data) {
        const authData = {
            id: data.id,
        }

        if(data.username){
            authData.username = data.username
        }

        if(data.password){
            authData.password = data.password
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