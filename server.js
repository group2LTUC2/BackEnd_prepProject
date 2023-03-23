'use strict'

const express = require('express');
const axios = require("axios");
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3000
const Client = new pg.Client(process.env.DATABASE_URL)

//Route's:
//  http://localhost:3000


server.get('/', formDonationHandler);  // Home page 

server.get('/donations', donationsHandler);  // donation page ---> show all 


server.get('*', notFoundHandler);
server.use(errorHandler);

// handlers
//------------------------------
function formDonationHandler(req, res){

}

function donationsHandler(req, res){

    const sql = `SELECT * FROM donationCard`
    Client.query(sql).then((Result)=>{
         res.state(200).send(Result.rows)
    }).catch((error)=>{
         errorHandler(error, req, res); 
    })
}




Client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    })
})