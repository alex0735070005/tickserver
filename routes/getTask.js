let express = require('express');
let request = require('request');
const tickApi = require('../sustem/tickApi.json');
let router = express.Router();

/**
 * Send get task query
 * https://www.tickspot.com/113000/api/v2/tasks/task_id.json
 */
router.get('/:id', function (req, res, next) {

  /**
   * Set api headers
   * @type {{url: string, headers: {"User-Agent", Authorization}}}
   */
  const options = {
    url: tickApi.url + req.query.subscriptionId + tickApi.version + 'tasks/' + req.params.id+'.json',
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
          code:response.statusCode,
          error:error,
          body:body,
        }
      );
    }
  });
});

module.exports = router;
