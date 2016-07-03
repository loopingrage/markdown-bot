var spark = require('ciscospark');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var app = express();
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("New message:", util.inspect(req.body.data));
  spark.messages.get(req.body.data).then(function(message) {
    spark.messages.create({
      roomId: message.roomId,
      markdown: message.text
    });
    res.send(204);
  }).catch(function(err) {
    console.err('Error getting message text');
    res.send(500);
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', process.env.PORT || 3000);
});
