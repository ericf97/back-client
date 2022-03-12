const router = require('express').Router();

router.route('/user')
    .get((req, res) => {
        res.json({msg: 'westtt'})
    })
module.exports = router;
