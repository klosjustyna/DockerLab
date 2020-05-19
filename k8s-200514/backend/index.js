const { v4: uuidv4} = require('uuid');

const express = require('express');

const app = express();

const appId = uuidv4();
const appPort = 5000;

const redis = require('redis');

const redisClient = redis.createClient({
    host: 'redis-service',
    port: 6279,
    retry_strategy: () => 1000
});


app.get('/', (req, resp) =>{
    resp.send(`Hello from backend`);
});

app.get('/randomUUID', (req, resp) =>{
    resp.send(`Random Id: [${appId}]`);
});

app.listen(appPort, err => {
    console.log(`Backend listening port -> ${appPort}`);
});
