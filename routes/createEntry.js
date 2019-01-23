let express = require('express');
let request = require('request');
const tickApi = require('../sustem/tickApi.json');
let router = express.Router();

/**
 * Send create entry query
 * https://www.tickspot.com/113000/api/v2/entries.json
 */
router.post('/', function (req, res, next) {

  const {
    date,
    hours,
    notes,
    taskId,
    userId
  } = req.body;

  /**
   * Set api headers
   * @type {{url: string, headers: {"User-Agent", Authorization}}}
   */
  const options = {
    url: tickApi.url + req.query.subscriptionId + tickApi.version + 'entries.json',
    method:'POST',
    body:JSON.stringify(
      {
        date,
        hours,
        notes,
        task_id:taskId,
        user_id:userId
      }
    ),
    headers: {
      "Authorization": req.get('TickSpot-Authorization'),
      "User-Agent": req.get('TickSpot-User-Agent'),
      "Content-Type": tickApi.contentType,
    }
  };

  request(options, (error, response, body) => {
    if (!error && tickApi.statusCodes[response.statusCode]) {
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
