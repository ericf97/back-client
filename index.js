const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const express = require('express');
const swaggerYml = YAML.load('./swagger.yml');
const cors=require("cors");

if(!process.env.PORT) {
  require('dotenv').config();
}

const app = express();

const router = require('./router');

const corsOptions = {
  origin: '*', 
  credentials: true,
  optionSuccessStatus: 200,
} 
app.use(cors(corsOptions));

app.listen(process.env.PORT, () => {
  console.log(`app listening port ${process.env.PORT}`);
});

app.use(express.json({limit: '50mb'}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerYml));

app.use('/', router);
