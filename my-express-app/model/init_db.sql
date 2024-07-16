--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users, properties, reviews;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE users(
    UserID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(20),
    LastName VARCHAR(30),
    UserName VARCHAR(30) NOT NULL,
    EmailAddress VARCHAR(30),
    Password VARCHAR(100),
    Age INT,
    Type VARCHAR(20)  
);

-- CREATE TABLE properties(
--     PropertyID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     PropertyName VARCHAR(50),
--     AddressLine1 VARCHAR(100),
--     AddressLine2 VARCHAR(100),
--     AddressLine3 VARCHAR(100),
--     Town VARCHAR(100),
--     City VARCHAR(100),
--     County VARCHAR(100),
--     State VARCHAR(100),
--     PostCode VARCHAR(20)
-- );

CREATE TABLE properties(
    PropertyID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FormattedAddress VARCHAR(100) NOT NULL,
    Latitude DECIMAL (10,7) NOT NULL,
    Longitude DECIMAL (10, 7) NOT NULL
);

CREATE TABLE reviews(
    ReviewID INT NOT NULL AUTO_INCREMENT,
    UserID INT,
    PropertyID INT,
    ReviewDate DATE,
    Rating1 INT,
    Rating2 INT,
    Rating3 INT,
    Rating4 INT,
    Rating5 INT,
    Rating6 INT,
    Comments TEXT,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
);

INSERT INTO properties (FormattedAddress, Latitude, Longitude) VALUES
('Flat 9, Basin Mill, Laburnum street, E2 8FP', 51.4987703, -0.0421737),
('123A Hammersmith Grove, London W6 0NJ, UK', 51.4990214, -0.2281128),
('65-89 Brondesbury Villas, London NW6 6AG, UK', 51.5361797, -0.1971449),
('119 Ashfield Street, London E1 3EX, UK', 51.5169185, -0.0543013),
("84 Stork's Road, London SE16 4DP, UK", 51.4954534, -0.0641014),
('2 Shoreditch High Street, London EC2A 2BA, UK', 51.5220985, -0.0788474),
('40 Osborn Terrace, London SE3 9GB, UK', 51.4577030, 0.0119778),
('206, 148 Christchurch Way, London SE10 0XG, UK', 51.4900827, 0.0051548),
('Apartment 3, Claremont House, 28 Quebec Way, London SE16 7FS, UK', 51.4987703, -0.0421737),
('Flat 32, Reliance Wharf, London N1 5EW, UK', 51.5369553, -0.0788002);

