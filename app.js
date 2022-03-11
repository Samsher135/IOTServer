const express = require('express');
const hbs = require('hbs');
const event = require('events');
const EventEmitter = require('stream');
require('dotenv').config();

let eventEmitter = new EventEmitter();

var app = express();

app.set('view engine', 'hbs')
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

let pin_status;
let state = 1;
let temp, hum;

app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/update_pin', (req, res)=>{
    if(state == 1){
    pin_status = 1;
    state = 0;
    res.status(200).send("Led_on");
    }else{
        pin_status = 0;
            state = 1;
        res.status(200).send("Led_off");
    }
})

//read sensor data for client side
app.get('/get_readings', (req, res)=>{
    res.status(200).send({temp:temp, hum:hum});
});

//set temperature and humidity sensor data
app.get('/readings', (req, res)=>{
    temp = req.query.temp;
    hum = req.query.hum;
    console.log(temp, hum);
    res.status(200).send("new_readings");
})

// render sensordata page
app.get('/sensordata', (req, res)=>{
    res.render('sensordata');
});

app.get('/get_pin', (req, res)=>{
    res.status(200).send({pin_status:pin_status});
})


const PORT = process.env.PORT;

app.listen(PORT, console.log(
    `Server started on port ${PORT}`));