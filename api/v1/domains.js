const express = require('express');
const bodyParser = require('body-parser');
const repository = require('../../repositories/domain-repository');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .post((request, response) => {
    const { id, uri, httpMethod } = request.body;
    const chartData = { labels: [], datasets: [{ data: [] }] };

    repository.save({ uri, httpMethod, alternateId: id })
      .then((data) => {
        response.status(201).json(Object.assign({}, data, { chartData }));
      })
      .catch((err) => {
        console.log(err);
        response.sendStatus(500);
      });
  });

module.exports = router;
