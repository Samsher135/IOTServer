const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

var app = express();

app.set('view engine', 'hbs')
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true }));

let pin_status;
let state = 1;

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

//get_pin
app.get('/get_pin', (req, res)=>{
    res.status(200).send({pin_status:pin_status});
})


const PORT = process.env.PORT;

app.listen(PORT, console.log(
    `Server started on port ${PORT}`));