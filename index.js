var spark = require('ciscospark');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var app = express();
app.use(bodyParser.json());

var ACTIVATION_CHAR = '!';

app.post('/', function (req, res) {
  console.log("New message:", util.inspect(req.body.data));
  spark.messages.get(req.body.data.id).then(function(message) {
    if(message.markdown == null && message.text.indexOf(ACTIVATION_CHAR) == 0) {
      spark.messages.create({
        roomId: message.roomId,
        markdown: message.text
      });
    }
    res.send(204);
  }).catch(function(err) {
    console.err('Error getting message text');
    res.send(500);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', process.env.PORT || 3000);
});
