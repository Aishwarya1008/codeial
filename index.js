const express = require('express');
const port = 8000;
const path = require('path');

const app = express();

app.use('/', require('./routes/index'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, function(err){
    if(err){
        console.log('Error in listening', err);
        return;
    }
    console.log('Success');
});