const express = require('express');
const bodyParser = require('body-parser');
const repository = require('../../repositories/domain-repository');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route('/')
  .post((request, response) => {
    const { id, uri, httpMethod } = request.body;
    const alternateId = id;
    const generatedId = Date.now(); // TODO: Create a domain id issuer.

    repository.save({ id: generatedId, uri, httpMethod })
      .then((data) => {
        response.status(201).json(Object.assign({}, data, { alternateId }));
      })
      .catch((err, message) => {
        console.log(message, JSON.stringify(err)); // TODO: report error using sentry
        response.sendStatus(500);
      });
  });

module.exports = router;
