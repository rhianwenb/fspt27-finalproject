--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS properties;
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
    Password VARCHAR(20),
    Age INT,
    Type VARCHAR(20)  -- tenant or landlord 
);

CREATE TABLE properties(
    PropertyID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    PropertyName VARCHAR(50),
    AddressLine1 VARCHAR(100),
    AddressLine2 VARCHAR(100),
    AddressLine3 VARCHAR(100),
    Town VARCHAR(100),
    City VARCHAR(100),
    County VARCHAR(100),
    State VARCHAR(100),
    PostCode VARCHAR(20)
);

CREATE TABLE reviews(
    ReviewID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID),
    ReviewDate DATE,
    Rating1 INT,
    Rating2 INT,
    Rating3 Int,
    Rating4 Int,
    Rating5 Int,
    Rating6 Int,
    Comments TEXT(8000) 
);
