DROP TABLE IF EXISTS donationCard;
CREATE TABLE If NOT EXISTS donationCard (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    item VARCHAR(255),
    quantity VARCHAR(255),
    locationOf VARCHAR(255),
    img IMAGE
);
CREATE TABLE if NOT EXISTS volunteers (
    id SERIAL PRIMARY KEY,
    fullName VARCHAR(255),
    phonNumber VARCHAR(255),
    img VARCHAR(255),
    locationOf VARCHAR(255)
)

