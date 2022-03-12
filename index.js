const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerYml = YAML.load('./swagger.yml');
const express = require('express');

const app = express();

const router = require('./router');

app.listen(3000, () => {
    console.log(`app listening port 3000`)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYml));

app.use('/', router);
