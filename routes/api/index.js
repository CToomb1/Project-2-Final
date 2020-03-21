
const router = require('express').Router();

const empRoutes = require('./emp-routes');
const shiftRoutes = require('./shift-routes');


router.use('/emp', empRoutes);
router.use('/shift', shiftRoutes);



module.exports = router;