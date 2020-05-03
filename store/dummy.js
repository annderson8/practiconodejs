const db = {
    'user': [{
        id: '1', 
        name: 'Rey'
    },
    ],
};


async function list(tabla){
    return db[tabla];
}
async function get(tabla, id){
    let col = await list(tabla)
    return col.filter(item => item.id === id)[0] || null;
}
async function upser(tabla, data){
    db([tabla].push(data));
}
async function remove(tabla, id){
    let col = await list(tabla)
    return true;
}

module.exports = {
    list,
    get,
    upser,
    remove
}