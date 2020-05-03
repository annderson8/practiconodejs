const express = require('express');
const bodyPaser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const config = require('../config');
const user = require('./components/user/network');
const app = express();
const swaggerDoc = require('./swagger.json');

app.use('/api/user', user);
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyPaser.json());
app.listen(config.api.port,() => {
    console.log('Api escuchando en el puerto:' + config.api.port);
});