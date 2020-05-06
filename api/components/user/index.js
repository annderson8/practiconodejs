
const config = require('../../../config');
let store;
if (config.remoteDB === true){
    store = require('../../../store/remote-mysql');
}else{
    store = require('../../../store/mysql');
}

const ctr = require('./controller');

module.exports = ctr(store);