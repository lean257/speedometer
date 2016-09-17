let express = require('express');
let router = express.Router(); // eslint-disable-line
let bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.route('/')
  .post(function(request, response) {
    let {id, uri, httpMethod} = request.body;
    response.status(201).json({
      id: Date.now(),
      uri,
      httpMethod,
      ref: id
    });
  });

module.exports = router;
