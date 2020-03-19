const express = require('express');

const app = express();

app.get("/",(req, res) => {
    res.send("hello from Node");
});

app.listen(8000,()=> {
    console.log("hello here node on port 8000 !");
});
