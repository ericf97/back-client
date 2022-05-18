const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerYml = YAML.load('./swagger.yml');
const express = require('express');

if(!process.env.PORT) {
  require('dotenv').config();
}

const app = express();

const router = require('./router');

app.listen(process.env.PORT, () => {
  console.log(`app listening port ${process.env.PORT}`)
});

app.use(express.json({limit: '50mb'}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYml));

app.use('/', router);
