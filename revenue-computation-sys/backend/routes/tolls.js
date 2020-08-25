const router = require('express').Router();
let Toll = require('../models/toll.model');

router.route('/').get((req, res) => {
    Toll.find()
    .then(tolls => res.json(tolls))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const userid = Number(req.body.userid);
  const date = Date.parse(req.body.date);

  const newToll = new Toll({
    username,
    description,
    userid,
    date,
  });

  newToll.save()
  .then(() => res.json('Toll added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Toll.findById(req.params.id)
    .then(toll => res.json(toll))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Toll.findByIdAndDelete(req.params.id)
    .then(() => res.json('Toll deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Toll.findById(req.params.id)
    .then(toll => {
      toll.username = req.body.username;
      toll.description = req.body.description;
      toll.userid = Number(req.body.userid);
      toll.date = Date.parse(req.body.date);

      toll.save()
        .then.catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;