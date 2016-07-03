var spark = require('ciscospark');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());

app.post('/', function (req, res) {
  spark.messages.create({
    roomId: req.body.roomId,
    markdown: req.body.text
  });
  req.send(204);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', process.env.PORT || 3000);
});
