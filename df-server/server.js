const express = require('express');
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

app.use(cors());

app.get('/df/server', (req, res) => {
  res.send('Hi, from server');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/df-routes')(app);

app.listen(port, () => {
  console.log('server is running');
});
