DROP TABLE IF EXISTS donationCard;
DROP TABLE IF EXISTS takenDonations;
DROP TABLE IF EXISTS volunteers;

CREATE TABLE If NOT EXISTS donationCard (
    donationCard_id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    item VARCHAR(255),
    quantity VARCHAR(255),
    locationOf VARCHAR(255),
    img VARCHAR(255)
);

CREATE TABLE if NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    img VARCHAR(255),
    locationOf VARCHAR(255)
);

CREATE TABLE if NOT EXISTS takenDonations (
    takenDonations_id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    locationOf VARCHAR(255),
     donationCard_id SERIAL
    FOREIGN KEY ( donationCard_id) REFERENCES donationCard (donationCard_id)


);





