const express=require('express');
const app=express();
const mongoose=require('mongoose');
const appConfig=require('./config/appConfig');
const route=require('./routes/user');
const bodyParser=require('body-parser');


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
route.setRouter(app);

app.listen(3000, function(){
    let db=mongoose.connect(appConfig.db.uri, {useNewUrlParser:true})
});