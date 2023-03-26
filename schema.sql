-- DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS donationCard;
DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS takenDonations;


CREATE TABLE If NOT EXISTS donationCard (
    donationCard_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL REFERENCES users(email),
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    item VARCHAR(255),
    quantity VARCHAR(255),
    locationOf VARCHAR(255),
    img VARCHAR(255)
);

CREATE TABLE if NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255)NOT NULL REFERENCES users(email),
    phonNumber VARCHAR(255),
    img VARCHAR(255),
    locationOf VARCHAR(255)
);

CREATE TABLE if NOT EXISTS takenDonations (
    takenDonations_id SERIAL PRIMARY KEY,
    fullName VARCHAR(255)NOT NULL REFERENCES users(email),
    phonNumber VARCHAR(255),
    locationOf VARCHAR(255)
);


CREATE TABLE If NOT EXISTS users  (
   id SERIAL PRIMARY KEY,
   username VARCHAR(50) UNIQUE NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL,
    img VARCHAR(1000) NOT NULL

);

