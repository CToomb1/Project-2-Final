const router = require('express').Router();
const emp = require('../../models/employee.js');

// router.post('/api/new', (req, res) => {
//     console.log('Emp Data:');
//     console.log(req.body);
  
//     emp.create({
//         first_Name: req.body.first_Name,
//         last_Name: req.body.last_Name,
//         title: req.body.title
//     }).then(results => {
//       console.log('created')
//       res.end();
//     });
//   });
  
  module.exports = router;