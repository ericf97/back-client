const { Router } = require("express");
const routes = require('./src/router');

const router = Router();

router.use('/api', routes);
router.get('/health', (req, res) => {
  res.status(200).send('Service Status ok');
});

module.exports = router;
