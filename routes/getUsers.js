let express = require('express');
let request = require('request');
const tickApi = require('../sustem/tickApi.json');
let router = express.Router();


/**
 * Send get tasks query
 * https://www.tickspot.com/113000/api/v2/users.json
 */
router.get('/', function (req, res, next) {

  /**
   * Set api headers
   * @type {{url: string, headers: {"User-Agent", Authorization}}}
   */
  const options = {
    url: tickApi.url + req.query.subscriptionId + tickApi.version + 'users.json',
    headers: {
      "Authorization": req.get('TickSpot-Authorization'),
      "User-Agent": req.get('TickSpot-User-Agent')
    }
  };

  console.log(options);

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    }
    else{
      res.send({
          code:response.statusCode,
          error:error,
          body:body,
        }
      );
    }
  });
});

module.exports = router;
