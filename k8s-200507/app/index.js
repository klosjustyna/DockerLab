const express = require('express');
const app = express();

app.get('/', async(req, resp) => {
    resp.send(`Random number: ${randomNumber()}`)
});


app.listen(3100, () => {
    console.log('Server from base app is in 3100');
});

function randomNumber(){
    return  Math.floor(Math.random() * 100);
}
