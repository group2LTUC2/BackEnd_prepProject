'use strict'

const express = require('express');
const axios = require('axios');
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

server.put('/donations/:id',updateDonations);
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



function updateDonations(req,res){
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    // const r=req.body;
    const sql = `UPDATE donationCard SET fullName=$1,phonNumber=$2,item=$3,quantity=$4,locationOf=$5,img=$6 WHERE id=${id} RETURNING *`;
    const values =[r.phonNumber,r.item,r.quantity,r.locationOf,r.img,req.body.fullName];
    client.query(sql,values)
    .then((data)=>{
        res.status(200).send(data.rows);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}
function notFoundHandler(req, res) {
    res.status(404).send("Page not found");
}

function errorHandler(error, req, res) {
    const err = {
        status: 500,
        message: error
    }
    res.status(500).send(err);
}

Client.connect().then(() => {
    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    })
})