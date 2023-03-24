"use strict";
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);
//Route's:
// http://localhost:3000
server.get("/donations", donationsHandler); // donation page ---> show all
server.post("/donations", addHandler);
server.put("/donations/:id", updateDonationHandler);
server.delete("/donations/:id", deleteDonationCardHandler);
server.get('/volunteer', getdashboardHandler) // render all volunteers
server.post('/volunteer', addVolunteerHandler);
server.delete('/volunteer/:id',deleteVolunteerHandler)
server.get('/api',apihandler);
server.get('*', notFoundHandler);
server.use(errorHandler);
// handlers
//------------------------------
//Mustafa
function donationsHandler(req, res) {//in Donation page 
  const sql = `SELECT * FROM donationCard`;
  client.query(sql)
    .then((Result) => {
      res.send(Result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}
//Mustafa
function addHandler(req, res) {
  const cadres = req.body;
  const sql = `INSERT INTO donationCard (fullName,phonNumber,item,quantity,locationOf,img) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [
    cadres.fullName,
    cadres.phonNumber,
    cadres.item,
    cadres.quantity,
    cadres.locationOf,
    cadres.img,
  ];
  client.query(sql, values)
    .then((result) => {
      const sql = "SELECT * FROM donationCard";
      client.query(sql) //the data come from query from client data base stored in (.then( inside data))
      .then((data) => {
        res.send(data.rows);
      })
      .catch((error) => {
        res.send(error);
      });


    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}
//Ahmad
function updateDonationHandler(req, res) {//in donation page
  const id = req.params.id;
  const donate = req.body;
  const sql = `UPDATE donationCard SET fullName='${donate.fullName}' WHERE id= ${id} RETURNING *;`;
  client.query(sql)
    .then((data) => {
      const sql = `SELECT * FROM donationCard`;
      client.query(sql) //the data come from query from client data base stored in (.then( inside data))
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((error) => {
        res.send(error);
      });

    })
    .catch((error) => {
      res.send(error);
    });
}
//Ahmad
function deleteDonationCardHandler(req,res){// in Donation Page
  const id = req.params.id;
  const sql = `DELETE FROM donationCard WHERE id=${id} RETURNING *;`;
  client.query(sql)
    .then((data) => {
      // res.send(data.rows);
      const sql = `SELECT * FROM donationCard`;
      client.query(sql) //the data come from query from client data base stored in (.then( inside data))
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((error) => {
        res.send(error);
      });

    })
    .catch((error) => {
      res.status(500).send(error);
    });

}
//Sahm
function apihandler(req,res){
  const options = {
    method: 'GET',
    url: 'https://aladhan.p.rapidapi.com/timingsByCity',
    params: {country: 'Jordan', city: 'Amman',method: '5', state: 'Amman'},
    headers: {
      'X-RapidAPI-Key': '3431701e17msh88fc56a55b413d0p19048djsnab34a8eaed3d',
      'X-RapidAPI-Host': 'aladhan.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send([response.data.data.timings,response.data.data.date.hijri.date+" هجري",response.data.data.date.gregorian.date+" ميلادي"]);
  }).catch(function (error) {
    console.error(error);
  });
}
//Sahm
function getdashboardHandler(req, res){

  const sql = `SELECT * FROM volunteers`;

  client.query(sql)
  .then((Result)=>{
       res.send(Result.rows)

  }).catch((error)=>{
       errorHandler(error, req, res); 
  })

}
//Toqa
function addVolunteerHandler(req, res){

  const volunteers = req.body;
  const sql = `INSERT INTO volunteers (fullName,phonNumber,img,locationOf) VALUES($1,$2,$3,$4) RETURNING *`;

  const values = [volunteers.fullName, volunteers.phonNumber, volunteers.img, volunteers.locationOf];

  client.query(sql, values)
  .then((result) => {
    const sql = `SELECT * FROM volunteers`;
    client.query(sql) //the data come from query from client data base stored in (.then( inside data))
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((error) => {
      res.send(error);
    });
  })
  .catch((error) => {
      errorHandler(error, req, res);
  })
}
//Toqa
function deleteVolunteerHandler(req,res){
  const id = req.params.id;
  const sql = `DELETE FROM volunteers WHERE id=${id} RETURNING *;`;
  client.query(sql)
    .then((data) => {
      // res.send(data.rows);
      const sql = `SELECT * FROM volunteers`;
      client.query(sql) //the data come from query from client data base stored in (.then( inside data))
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((error) => {
        res.send(error);
      });

    })
    .catch((error) => {
      res.status(500).send(error);
    });
}
// Mohammed
function notFoundHandler(req,res){
  res.status(404).send("Page not found");
}
// Mohammad
function errorHandler(error, req, res) {
  const err = {
      status: 500,
      message: error
  }
  res.send(err);
}
client.connect().then(() => {
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
  });
});
