const express = require('express');
const bodyParser = require('body-parser');
const repository = require('../../repositories/domain-repository');
const log = require('../../../logger')('api/v1/domains');

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
        log.info(`Domain ${data.uri} was created successfully`);
        response.status(201).json(Object.assign({}, data, { metrics }));
      })
      .catch((err) => {
        log.error({ err });
        response.sendStatus(500);
      });
  });

module.exports = router;
