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
    Rating7 INT,
    Comments TEXT,
    MovingIn DATE,
    MovingOut DATE,
    PRIMARY KEY (ReviewID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
);

INSERT INTO properties (FormattedAddress, Latitude, Longitude) VALUES
('Flat 9, Basin Mill, Laburnum Street, London E2 8FP, UK', 51.4987703, -0.0421737),
('123A Hammersmith Grove, London W6 0NJ, UK', 51.4990214, -0.2281128),
('65-89 Brondesbury Villas, London NW6 6AG, UK', 51.5361797, -0.1971449),
('119 Ashfield Street, London E1 3EX, UK', 51.5169185, -0.0543013),
("84 Stork's Road, London SE16 4DP, UK", 51.4954534, -0.0641014),
('2 Shoreditch High Street, London EC2A 2BA, UK', 51.5220985, -0.0788474),
('40 Osborn Terrace, London SE3 9GB, UK', 51.4577030, 0.0119778),
('206, 148 Christchurch Way, London SE10 0XG, UK', 51.4900827, 0.0051548),
('Apartment 3, Claremont House, 28 Quebec Way, London SE16 7FS, UK', 51.4987703, -0.0421737),
('Flat 32, Reliance Wharf, London N1 5EW, UK', 51.5369553, -0.0788002),
('174 Saint James''s Road, London SE1 5BN, UK', 51.4916801, -0.0654561),
('27 Woking Close, London SW15 5JZ, UK', 51.4641321, -0.2487157),
('Farington House, 22 Gloucester Street, London SW1V 2DN, UK', 51.4899663, -0.1402552),
('107 Hambalt Road, London SW4 9EL, UK', 51.4548765, -0.1386887),
('70 Sirdar Road, London W11 4EG, UK', 51.5116549, -0.2149411),
('112A Copenhagen Street, London N1 0SG, UK', 51.5369680, -0.1155448),
('3B, 39 Petherton Road, London N5 2QX, UK', 51.5524279, -0.0906993);

INSERT INTO users (FirstName, LastName, UserName, EmailAddress, Password, Age, Type) VALUES
('John', 'Doe', 'johndoe', 'john.doe@example.com', '$2b$10$Bfsl/pQiO0B06TBy/hugWe7wRSKbtXYxehmBPu6cV91gu1x0Us2WS', 30, 'Tenant'),
('Jane', 'Smith', 'janesmith', 'jane.smith@example.com', '$2b$10$Ow9VbSdjtwg4Yc8i0DI9x.r9z7hN2/5iGtLMLt84lAVjuF5Z0eK9i', 25, 'Tenant'),
('Robert', 'Johnson', 'robertjohnson', 'robert.johnson@example.com', '$2b$10$XLKGDZ0LIVmfF2hjTXctgOidSWOBKogRm1JWfVY6icEiUvE4prgGG', 28, 'Tenant'),
('Michael', 'Williams', 'michaelwilliams', 'michael.williams@example.com', '$2b$10$RFe4vdGH/Gj8is12UGN/Ou7cQiLYQn5SyXrv9AvbN/HILTnPirmwO', 35, 'Tenant'),
('Sara', 'Jones', 'williamjones', 'william.jones@example.com', '$2b$10$fy1Bh6Lo9cpSruWSF/LAY.gTh7xOL8mWO6g7Bziok6XwJ6Hler/my', 32, 'Tenant'),
('Joscelyn', 'Miller', 'joscelynmiller', 'joscelyn.miller@example.com', '$2b$10$txIY4.y8vKeJpLoxrPybbeWf.4bLcgxCDkiMO0pj5UfwTdzoyC3c.', 31, 'Tenant');

INSERT INTO reviews (UserID, PropertyID, ReviewDate, Rating1, Rating2, Rating3, Rating4, Rating5, Rating6, Rating7, Comments, MovingIn, MovingOut) VALUES
(1, 1, '2023-07-01', 5, 4, 3, 5, 4, 3, 5, 'Great place, enjoyed my stay.', '2022-01-01', '2023-01-01'),
(2, 2, '2023-06-15', 4, 4, 4, 4, 4, 4, 4, 'Good location but noisy.', '2021-05-01', '2023-05-01'),
(3, 3, '2023-05-10', 3, 3, 3, 3, 3, 3, 3, 'Average experience, could be better.', '2020-09-01', '2023-04-01'),
(4, 4, '2023-06-20', 5, 5, 5, 4, 4, 4, 5, 'Nice place, would recommend.', '2021-06-01', '2023-06-01'),
(5, 5, '2023-06-25', 4, 4, 4, 3, 3, 3, 4, 'Decent place, good value.', '2021-07-01', '2023-07-01'),
(6, 6, '2023-07-05', 5, 5, 5, 5, 5, 5, 5, 'Excellent, very satisfied.', '2021-08-01', '2023-08-01'),
(1, 7, '2023-07-10', 4, 3, 4, 3, 4, 3, 4, 'Good place, could improve.', '2021-09-01', '2023-09-01'),
(2, 8, '2023-07-15', 3, 3, 3, 3, 3, 3, 3, 'Average, had some issues.', '2021-10-01', '2023-10-01'),
(3, 9, '2023-07-20', 4, 4, 4, 4, 4, 4, 4, 'Nice area, decent stay.', '2021-11-01', '2023-11-01'),
(4, 10, '2023-07-25', 5, 5, 5, 5, 5, 5, 5, 'Perfect location, great stay.', '2021-12-01', '2023-12-01'),
(5, 11, '2023-07-30', 4, 4, 4, 4, 4, 4, 4, 'Good place, convenient location.', '2021-01-01', '2023-01-01'),
(6, 12, '2023-08-01', 3, 3, 3, 3, 3, 3, 3, 'Average experience, okay stay.', '2021-02-01', '2023-02-01'),
(1, 13, '2023-08-05', 5, 5, 5, 5, 5, 5, 5, 'Wonderful place, highly recommend.', '2021-03-01', '2023-03-01'),
(2, 14, '2023-08-10', 4, 4, 4, 4, 4, 4, 4, 'Nice property, good stay.', '2021-04-01', '2023-04-01'),
(3, 15, '2023-08-15', 3, 3, 3, 3, 3, 3, 3, 'Average, some improvements needed.', '2021-05-01', '2023-05-01'),
(4, 16, '2023-08-20', 5, 5, 5, 5, 5, 5, 5, 'Excellent stay, very happy.', '2021-06-01', '2023-06-01'),
(5, 17, '2023-08-25', 4, 4, 4, 4, 4, 4, 4, 'Good experience, would return.', '2021-07-01', '2023-07-01'),
(6, 1, '2023-08-30', 3, 3, 3, 3, 3, 3, 3, 'It was okay, not great.', '2021-08-01', '2023-08-01'),
(1, 9, '2023-09-01', 5, 5, 5, 5, 5, 5, 5, 'Fantastic place, highly recommend.', '2021-09-01', '2023-09-01'),
(4, 16, '2023-09-05', 4, 4, 4, 4, 4, 4, 4, 'Good location, decent stay.', '2021-10-01', '2023-10-01'),
(3, 1, '2023-09-10', 3, 3, 3, 3, 3, 3, 3, 'Average place, had some issues.', '2021-11-01', '2023-11-01'),
(4, 12, '2023-09-15', 5, 5, 5, 5, 5, 5, 5, 'Excellent property, very satisfied.', '2021-12-01', '2023-12-01'),
(5, 13, '2023-09-20', 4, 4, 4, 4, 4, 4, 4, 'Good place, would recommend.', '2022-01-01', '2024-01-01');

