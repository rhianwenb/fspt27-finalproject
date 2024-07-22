--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users, properties, reviews,comments;
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
    Rating7 INT,
    Comments TEXT,
    MovingIn DATE,
    MovingOut DATE,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
);


CREATE TABLE questions(
    CommentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    PropertyID INT,
    CommentDate DATE,
    Text VARCHAR(140),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
)

CREATE TABLE answers(
    AnswerID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CommentID INT,
    UserID INT,
    PropertyID INT,
    Text VARCHAR(140),
    FOREIGN KEY (CommentID) REFERENCES comments (CommentID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
)
