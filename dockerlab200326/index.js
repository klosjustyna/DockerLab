const express = require('express');

const redis = require('redis');

const app = express();

const process = require('process');

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

//  client.set('counter', 0);
 client.set('record', 0);

app.get('/numberOne/numberTwo', (req, resp) => {

    console.log('New action');
    process.exit(0);
    while(numberOne != numberTwo){
        if(numberOne > numberTwo)
        numberOne = numberOne - numberTwo;
        else 
        numberTwo = numberTwo - numberOne;
    }  
        client.set('numberOne', parseInt(numberOne));

});

app.listen(8080, () => {
    console.log('Server listening on port 8001');
});
