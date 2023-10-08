const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if( !store ){
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(user) {
        const newUser = {
            name: user.name,
            username: user.username,
        }   

        if(user.id){
            newUser.id = user.id;
        }else{
            newUser.id = nanoid();
        }

        if(user.password || user.username){
            await auth.upsert({
                id: newUser.id,
                username: newUser.username,
                password: user.password,
            });
        }
        return store.upsert(TABLA, newUser);
    }

    async function remove(id) {
        auth.remove(id);
        return await store.remove(TABLA, id);
    }

    return {
        list,
        get,
        upsert,
        remove,
    };
}