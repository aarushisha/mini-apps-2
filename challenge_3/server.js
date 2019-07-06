const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8008;

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => console.log('listening on port', port))
