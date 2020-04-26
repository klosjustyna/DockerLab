const keys = require('./keys');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const redis = require('redis');
const client = redis.createClient(
    keys.redisPort,
    keys.redisHost
);

const {Pool} = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,    
});

pgClient.on('error', () => {
    console.log('Error');
});

pgClient.query('CREATE TABLE IF NOT EXISTS results (number INT)').catch(err => console.log(err));

app.get('/',(req, resp) => {
    console.log(req); 

    resp.send('hello  from backend')
});

app.post('/api', (req, resp) => {
   
    const param1 = req.body.param1;
    const param2 = req.body.param2;

    const redisKey = `${param1}:${param2}`; 

    client.get(redisKey, (err, redisVal) => {
        if(redisVal == null) redisVal = areaRectangle(param1, param2);

         pgClient.query(`INSERT INTO results(number) VALUES (${redisVal})`).catch(err => console.log(err)); 
        // pgClient.query(
        //     "INSERT INTO results (number) VALUES ($1)",
        //     [redisVal],(err,res) => {
        //         if (err) {
        //             console.log(err,'hejejejejejjej')
        //           } else {
        //             console.log(res.rows[0])
        //           }
       //  })

        resp.send({
                "x": param1,
                "y": param2,
                "out": redisVal});
        client.set(redisKey, parseInt(redisVal));
    });
});
/*
app.get('/:param1/:param2', async(req, resp) => {
    console.log(req.params.param1);
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const redisKey = `${param1}:${param2}`; 

    client.flushdb( function (err, succeeded) {
        console.log(succeeded); // will be true if successfull
    });
    client.get(redisKey, (err, redisVal) => {
        if(redisVal == null) redisVal = areaRectangle(param1, param2);

     
        resp.send(`rectangle: ${redisVal}`)
        client.set(redisKey, parseInt(redisVal));
    });    
});*/

app.get('/areaRectangle', (req, resp) => {

    resp.send('Results from db')
    pgClient
      .query("SELECT DISTINCT * FROM results"),
      (err,resp) => {
        if (err) {
            console.log('select error :::::::::::::::::: ',err)
          } else {
            console.log('ok')
          }
        }
});

app.listen(4000, () => {
    console.log('Server from base app is in 4000');
});

function areaRectangle(n, g){
    return n*g;
}

