const db = {
    
};

async function list(tabla) {
    if(!db[tabla]){
        db[tabla] = [];
    }
    return db;
    //return db[tabla];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter( (item) => item.id === id ) || null;
}

async function upsert(tabla, data) {
    let users = await list(tabla);
    users = users[tabla];
    users.push(data);
    return data;
}

async function remove(tabla, id) {
    let users = await list(tabla);
    users = users[tabla];
    let userIndex = 0;
    while(users[userIndex].id != id){
        userIndex++;
    }
    let userDeleted = users[userIndex];
    users.splice(userIndex, 1);
    return userDeleted;
}

async function query(tabla, q) {

    let usernameSearch = q.username;

    let col = await list(tabla);
    let authTable = col[tabla];

    let keys = Object.keys(q);
    //Obtiene el nombre del atributo de aquel objeto al que le haremos la comparación
    let key = keys[0];

    return authTable.filter( (item) => item[key] === usernameSearch ) || null;
}

module.exports = {
    list, 
    get, 
    upsert, 
    remove, 
    query,
}