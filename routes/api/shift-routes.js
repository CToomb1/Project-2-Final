const router = require('express').Router();
const emp = require('../../models/shift.js');

// router.post('/api/new', (req, res) => {
//     console.log('Shift Data:');
//     console.log(req.body);

//     emp.create({
//         date: req.body.date,
//         time: req.body.time,
//         comment: req.body.comment
//     }).then(results => {
//       console.log('created')
//       res.end();
//     });
//   });

module.exports = router;