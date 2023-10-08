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

module.exports = {
    list, get, upsert, remove
}