const express = require('express');
const port = 8000;

const app = express();

app.listen(port, function(err){
    if(err){
        console.log('Error in listening', err);
        return;
    }
    console.log('Success');
});