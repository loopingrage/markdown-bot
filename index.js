var spark = require('ciscospark');
var express = require('express');
var bodyParser = require('body-parser');
var util = require('util');

var ACTIVATION_CHAR = '!';

// Express Setup
var app = express();
app.use(bodyParser.json());

// TODO: need to get this out of the URL context in order to serve multiple users
var myPersonId = null;

spark.people.get('me').then(function(person) {
  console.log('Found me:', util.inspect(person));
  myPersonId = person.id;
}).catch(function(err) {
  console.error("Can't seem to find myself...", err);
});

app.post('/', function (req, res) {
  console.log("New message:", util.inspect(req.body.data));
  var originalMessageId = req.body.data.id;
  spark.messages.get(originalMessageId).then(function(message) {
    if(shouldProcessMessage(message)) {
      return spark.messages.create({
        roomId: message.roomId,
        markdown: message.text.substr(ACTIVATION_CHAR.length).trim()
      });
    }
  }).then(function() {
    spark.messages.remove(originalMessageId);
  }).catch(function(err) {
    console.error('Error getting message text');
  });
  res.send(204);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port', process.env.PORT || 3000);
});

function shouldProcessMessage(message) {
  return message.markdown == null
    && message.text.indexOf(ACTIVATION_CHAR) == 0
    && message.personId == myPersonId;
}
