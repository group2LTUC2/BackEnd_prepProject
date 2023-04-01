"use strict";

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const pg = require("pg");
require("dotenv").config();
const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT || 3003;
const client = new pg.Client(process.env.DATABASE_URL);
//Route's:
// http://localhost:3000
server.get("/donations", donationsHandler); // donation page ---> show all
server.post("/donations", addHandler);
server.put("/donations/:id", updateDonationHandler);
server.delete("/donations/:id", deleteDonationCardHandler);
server.get('/volunteer', getdashboardHandler); // render all volunteers
server.post('/volunteer', addVolunteerHandler);
server.delete('/volunteer/:id', deleteVolunteerHandler);
server.post('/user', addUserHandler);
server.get('/user', getUserHandler);
server.get('/api', apihandler);
server.post('/takenitems', postTakenItemsHandler);// inserting taken item into database(takenDonations)server.get('/api',apihandler);
server.get('/takenitems', getTakenItemsHandler);// getting taken items from database(takenDonations)
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
  const sql = `INSERT INTO donationCard (email,fullName,phonNumber,item,quantity,locationOf,img) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const values = [
    cadres.email,
    cadres.fullName,
    cadres.phonNumber,
    cadres.item,
    cadres.quantity,
    cadres.locationof,
    cadres.img
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
  const sql = `UPDATE donationCard SET quantity='${donate.quantity}' WHERE donationCard_id= ${id} RETURNING *;`;
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
function deleteDonationCardHandler(req, res) {// in Donation Page
  const id = req.params.id;
  const sql = `DELETE FROM donationCard WHERE donationCard_id=${id} RETURNING *;`;
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
function apihandler(req, res) {
  try {
    // const apiKey = process.env.APIKey;
    const url = `https://api.aladhan.com/v1/timingsByAddress/26-03-2023?address=Amman%2C+JORDAN&method=99&methodSettings=18.5%2Cnull%2C17.5`;
    axios.get(url)
      .then((result2) => {
        // let mapRes = `${result2.data.data.timings.Maghrib}`;
        // let map2 =`${['Date '+result2.data.data.date.readable+ ' ' +result2.data.data.timings.Maghrib+" موعد صلاة المغرب"]}`
        let map2 = `${'Date ' + result2.data.data.date.readable + ' ' + result2.data.data.timings.Maghrib + " موعد صلاة المغرب"}`

        res.send(map2);
        console.log(map2)
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    errorHandler(error, req, res);
  }

}
// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://muslimsalat.p.rapidapi.com/Zarqa.json',
//   headers: {
//     'X-RapidAPI-Key': '6ecec3d108msh4b17ce9d2e0f1b3p1d9c64jsnda6204e4f17c',
//     'X-RapidAPI-Host': 'muslimsalat.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data.items);
//   res.send(response.data.items)

// res.send([response.data.datatimings,response.data.hijri.date+" هجري",response.data.gregorian.date+" ميلادي"]);


//   }).catch(function (error) {
//     console.error(error);
//   });

// }
function getdashboardHandler(req, res) {

  const sql = `SELECT * FROM volunteers`;

  client.query(sql)
    .then((Result) => {
      res.send(Result.rows)

    }).catch((error) => {
      errorHandler(error, req, res);
    })

} 
function addUserHandler(req, res) {
  const cadres = req.body;
  let sql = `INSERT INTO users(username,email,img) VALUES ('${cadres.username}','${cadres.email}','${cadres.img}') RETURNING *;`;
  client.query(sql)
    .then((data) => {
      res.send(data.rows);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

function getUserHandler(req, res) {
  const sql = `SELECT * FROM users`;
  client.query(sql)
    .then((Result) => {
      res.send(Result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });

}

//Toqa
function addVolunteerHandler(req, res) {

  const volunteers = req.body;
  const sql = `INSERT INTO volunteers (fullName,phonNumber,img,locationOf) VALUES($1,$2,$3,$4) RETURNING *`;

  const values = [volunteers.fullName, volunteers.phonnumber, volunteers.img, volunteers.locationof];

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
function deleteVolunteerHandler(req, res) {
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
//new routes added by ahmad
function getTakenItemsHandler(req, res) {
  const sql = `SELECT * FROM takenDonations`;
  client.query(sql)
    .then((Result) => {
      res.send(Result.rows);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
}

function postTakenItemsHandler(req, res) {
  const cadres = req.body;
  const sql = `INSERT INTO takenDonations (fullName,phonNumber,locationOf) VALUES($1,$2,$3) RETURNING *`;
  const values = [
    cadres.fullName,
    cadres.phonNumber,
    cadres.locationOf
  ];
  client.query(sql, values)
    .then((result) => {
      const sql = "SELECT * FROM takenDonations";
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
//end of new routers

// Mohammed
function notFoundHandler(req, res) {
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
