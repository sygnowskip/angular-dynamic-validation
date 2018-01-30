const DEFAULT_API_PORT = 4201;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.set('port', process.env.PORT || DEFAULT_API_PORT);

app.get('/api/health', function (req, res) {
  res.status(200).send("API works!");
});


app.get('/api/health', function (req, res) {
  res.status(200).send("API works!");
});

app.post('/api/with-errors', function (req, res) {
  var errors = {
    "errors": [
      {
        "property": "name",
        "message": "This is response from server for name"
      },
      {
        "property": "surname",
        "message": "This is response from server for surname"
      },
      {
        "property": "unknown",
        "message": "This is response from server for unknown property"
      },
      {
        "message": "This is response from server without property"
      }
    ]
  };

  setTimeout(() => {
    res.status(400).send(errors);
  }, 500);
});

app.post('/api/without-errors', function (req, res) {
  setTimeout(() => {
    res.status(200).send();
  }, 500);
});

app.listen(app.get('port'), () => console.log('Mock API server listening on port %d', app.get('port')));
