const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const config = require('./config/keys');
// const mongoose = require("mongoose");
// mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/dialogflow', require('./routes/df-routes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

// const express = require('express');
// const port = process.env.PORT || 3030;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// var app = express();

// app.use(cors());

// app.get('/df/server', (req, res) => {
//   res.send('Hi, from server');
// });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// require('./routes/df-routes')(app);

// app.listen(port, () => {
//   console.log('server is running');
// });
