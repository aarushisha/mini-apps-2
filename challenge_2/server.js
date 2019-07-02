const express = require('express');
const port = 3004;
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log('listening at port ', port);
})

