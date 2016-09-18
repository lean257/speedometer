let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let repository = require(`${__APP_DIR__}/repositories/domain-repository`);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
  .post(function(request, response) {
    let {id, uri, httpMethod} = request.body;

    let alternateId = id;
    let generatedId = Date.now(); // TODO: Create a domain id issuer.

    repository.save({id: generatedId, uri, httpMethod})
      .then(({id, uri, httpMethod}) => {
        response.status(201).json({id, uri, httpMethod, alternateId});
      })
      .catch((err, message) => {
        console.log(message, JSON.stringify(err)); //TODO: report error using sentry
        response.sendStatus(500);
      });
  });

module.exports = router;
