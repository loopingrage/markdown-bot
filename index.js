var spark = require('ciscospark');
var express = require('express');
var app = express();

app.post('/', function (req, res) {
  spark.messages.create({
    roomId: req.body.roomId,
    markdown: req.body.text
  });
  req.send(204);
});

app.listen(3000 || process.env.PORT, function () {
  console.log('Listening on port 3000!');
});
