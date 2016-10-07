const express = require('express');
const bodyParser = require('body-parser');
const repository = require('../../repositories/domain-repository');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .get((request, response) => {
    repository.all().then(collection => response.status(200).json(collection));
  })
  .post((request, response) => {
    const { uri, httpMethod } = request.body;
    const metrics = [];

    repository.save({ uri, httpMethod })
      .then((data) => {
        response.status(201).json(Object.assign({}, data, { metrics }));
      })
      .catch((err) => {
        console.log(err);
        response.sendStatus(500);
      });
  });

module.exports = router;
