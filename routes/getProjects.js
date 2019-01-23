let express = require('express');
let request = require('request');
const tickApi = require('../sustem/tickApi.json');
let router = express.Router();

/**
 * Send get projects query
 * https://www.tickspot.com/subscription_id/api/v2/projects.json
 */
router.get('/', function (req, res, next) {
  /**
   * Set api headers
   * @type {{url: string, headers: {"User-Agent", Authorization}}}
   */
  const options = {
    url: tickApi.url + req.query.subscriptionId + tickApi.version + 'projects.json',
    headers: {
      "Authorization": req.get('TickSpot-Authorization'),
      "User-Agent": req.get('TickSpot-User-Agent')
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.parse(body));
    }
    else{
      res.send({
          error:response.statusCode,
        }
      );
    }
  });

});

module.exports = router;
