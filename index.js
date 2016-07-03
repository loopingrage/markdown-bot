var spark = require('ciscospark');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var app = express();
app.use(bodyParser.json());

app.post('/', function (req, res) {
  console.log("New message:", util.inspect(req.body));
  spark.messages.create({
    roomId: req.body.data.roomId,
    markdown: req.body.data.text
  });
  res.send(204);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', process.env.PORT || 3000);
});
