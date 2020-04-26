const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});;

app.get('/:param1/:param2', async(req, resp) => {

    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const redisKey = `${param1}:${param2}`;
   
    client.get(redisKey, (err, redisVal) => {
        if(redisVal == null) redisVal = NWD(param1, param2);

        resp.send(`NWD: ${redisVal}`)
        client.set(redisKey, parseInt(redisVal));
    });   
});

app.listen(3100, () => {
    console.log('Server from base app is in 3100');
});

function NWD(n, g){
    return g == 0 ? n : NWD(g, n%g);
}
