
const express = require('express')
const axios = require('axios');
const path = require('path');

//? APM

const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'node-apm',
  
    // Use if APM Server requires a token
    secretToken: '',
  
    // Use if APM Server uses API keys for authentication
    apiKey: '',
  
    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'http://localhost:8200',

    captureBody: 'all'
  })

const porta = 3000

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.render('index', {
        title: "Meu primeiro servidor Express com APM",
        version: "0.0.0"
    });
});

app.get('/example', async(req, res, next) => {
    
    var span = apm.startSpan('request API GitHub')

    result = await axios.get('https://api.github.com/users/mapbox');
    
    if (span) span.end()

    res.json(result.data);
    // console.log(result);
});

app.listen(porta, () => {
    console.log(`Rodando na porta ${porta} e utilizando Express e Axios`)
});

