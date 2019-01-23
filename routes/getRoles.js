let express = require('express');
let request = require('request');
const tickApi = require('../sustem/tickApi.json');
let router = express.Router();


/**
 * Send get roles query
 * This method use basic auth by email and password
 * https://www.tickspot.com/api/v2/roles.json
 */
router.get('/', function (req, res, next) {

  /**
   * Set api headers
   */
  const options = {
    url: tickApi.authUrl,
    headers: {
      "Authorization": req.get('TickSpot-Authorization'),
      "User-Agent": req.get('TickSpot-User-Agent')
    },
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    } else {
      res.status(response.statusCode);
      res.send({
          code: response.statusCode,
          error: error,
          body: body,
        }
      );
    }
  });
});

module.exports = router;
