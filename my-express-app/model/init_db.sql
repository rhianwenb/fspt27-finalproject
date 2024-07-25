--
-- Drop Tables
--

SET foreign_key_checks = 0;

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;
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
    FormattedAddress VARCHAR(200) NOT NULL,
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

<<<<<<< HEAD

CREATE TABLE comments(
    CommentID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    PropertyID INT,
    CommentDate DATE,
    Text VARCHAR(140),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
);

CREATE TABLE answers(
    AnswerID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CommentID INT,
    UserID INT,
    PropertyID INT,
    AnswerDate DATE,
    Text VARCHAR(140),
    FOREIGN KEY (CommentID) REFERENCES comments (CommentID),
    FOREIGN KEY (UserID) REFERENCES users(UserID),
    FOREIGN KEY (PropertyID) REFERENCES properties(PropertyID)
);

=======
>>>>>>> main
INSERT INTO properties (FormattedAddress, Latitude, Longitude) VALUES
('Flat 9, Basin Mill, Laburnum Street, London E2 8FP, UK', 51.4987703, -0.0421737),
('123A Hammersmith Grove, London W6 0NJ, UK', 51.4990214, -0.2281128),
('65-89 Brondesbury Villas, London NW6 6AG, UK', 51.5361797, -0.1971449),
('119 Ashfield Street, London E1 3EX, UK', 51.5169185, -0.0543013),
<<<<<<< HEAD
('84 Stork''s Road, London SE16 4DP, UK', 51.4954534, -0.0641014),
=======
("84 Stork's Road, London SE16 4DP, UK", 51.4954534, -0.0641014),
>>>>>>> main
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

<<<<<<< HEAD

=======
>>>>>>> main
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
(2, 2, '2023-09-05', 4, 4, 4, 4, 4, 4, 4, 'Good location, decent stay.', '2021-10-01', '2023-10-01'),
(4, 16, '2023-09-05', 4, 4, 4, 4, 4, 4, 4, 'Good location, decent stay.', '2021-10-01', '2023-10-01'),
(3, 1, '2023-09-10', 3, 3, 3, 3, 3, 3, 3, 'Average place, had some issues.', '2021-11-01', '2023-11-01'),
(4, 12, '2023-09-15', 5, 5, 5, 5, 5, 5, 5, 'Excellent property, very satisfied.', '2021-12-01', '2023-12-01'),
(5, 13, '2023-09-20', 4, 4, 4, 4, 4, 4, 4, 'Good place, would recommend.', '2022-01-01', '2024-01-01');


INSERT INTO comments (UserID, PropertyID, CommentDate, Text) VALUES
(1, 1, '2023-07-01', 'How is the neighborhood safety around Flat 9?'),
(2, 1, '2023-07-02', 'Is there a good grocery store nearby?'),
(3, 2, '2023-07-03', 'What is the public transport like around Hammersmith Grove?'),
(4, 2, '2023-07-04', 'Are there parks or green spaces in the area?'),
(5, 3, '2023-07-05', 'Any issues with noise at night around Brondesbury Villas?'),
(6, 3, '2023-07-06', 'Is parking easily available here?'),
(1, 4, '2023-07-07', 'Are there good schools near Ashfield Street?'),
(2, 4, '2023-07-08', 'How is the nightlife in this area?'),
(3, 5, '2023-07-09', 'Is the public transport reliable around Stork\'s Road?'),
(4, 5, '2023-07-10', 'Any issues with damp or mold in the property?'),
(5, 6, '2023-07-11', 'Is Shoreditch High Street noisy during weekends?'),
(6, 6, '2023-07-12', 'How is the internet connectivity here?'),
(1, 7, '2023-07-13', 'Are there any community events in this area?'),
(2, 7, '2023-07-14', 'How is the local market in Osborn Terrace?'),
(3, 8, '2023-07-15', 'Is Christchurch Way close to public transport?'),
(4, 8, '2023-07-16', 'Any recommendations for nearby restaurants?'),
(5, 9, '2023-07-17', 'How is the parking situation around Quebec Way?'),
(6, 9, '2023-07-18', 'Are there any gyms nearby?'),
(1, 10, '2023-07-19', 'How is the commute from Reliance Wharf to central London?'),
(2, 10, '2023-07-20', 'Is it a pet-friendly neighborhood?'),
(3, 11, '2023-07-21', 'Are there frequent power cuts in this area?'),
(4, 11, '2023-07-22', 'Any good cafes around Saint James\'s Road?'),
(5, 12, '2023-07-23', 'How is the water pressure in the property?'),
(6, 12, '2023-07-24', 'Is there a playground for kids nearby?'),
(1, 13, '2023-07-25', 'Are there any upcoming construction projects near Gloucester Street?'),
(2, 13, '2023-07-26', 'Is it easy to find parking here?'),
(3, 14, '2023-07-27', 'How is the community vibe around Hambalt Road?'),
(4, 14, '2023-07-28', 'Any issues with pests in the property?'),
(5, 15, '2023-07-29', 'Are there good schools near Sirdar Road?'),
(6, 15, '2023-07-30', 'How are the shopping options in the area?'),
(1, 16, '2023-07-31', 'Is Copenhagen Street well-lit at night?'),
(2, 16, '2023-08-01', 'Any recommendations for nearby parks?'),
(3, 17, '2023-08-02', 'How is the traffic around Petherton Road?'),
(4, 17, '2023-08-03', 'Is it a friendly neighborhood?');

-- Insert dummy data into answers table
INSERT INTO answers (CommentID, UserID, PropertyID, AnswerDate, Text) VALUES
(1, 2, 1, '2023-07-02', 'I lived there for two years and always felt safe, even when walking home late at night.'),
(1, 3, 1, '2023-07-03', 'It\'s generally safe, but there was a break-in a few months ago.'),
(2, 3, 1, '2023-07-03', 'There\'s a fantastic local grocery store just around the corner that has everything you need.'),
(4, 1, 2, '2023-07-05', 'The parks are beautiful and great for a morning jog or an evening stroll.'),
(4, 5, 2, '2023-07-06', 'There are a few parks, but they can get quite crowded on weekends.'),
(5, 1, 3, '2023-07-06', 'I never had issues with noise, but I heard that the street can be busy during rush hours.'),
(6, 4, 3, '2023-07-07', 'Parking is a nightmare! I usually have to park a few blocks away.'),
(8, 6, 4, '2023-07-09', 'The nightlife is amazing! So many bars and clubs to choose from.'),
(8, 5, 4, '2023-07-09', 'It can get pretty rowdy at night, so be prepared for some noise.'),
(10, 2, 5, '2023-07-11', 'No damp issues, but the walls are thin, and you can hear the neighbors.'),
(11, 1, 6, '2023-07-12', 'Yes, it gets quite loud, especially on Friday and Saturday nights.'),
(12, 3, 6, '2023-07-13', 'Internet connectivity is okay, but it slows down during peak hours.'),
(13, 4, 7, '2023-07-14', 'There are community events every month, which are a great way to meet neighbors.'),
(13, 2, 7, '2023-07-15', 'Check out the local community board; it’s always full of interesting events.'),
(14, 5, 7, '2023-07-15', 'The market is decent, but it gets quite busy on weekends.'),
(15, 3, 8, '2023-07-16', 'Public transport is pretty convenient, with a bus stop just a few minutes away.'),
(16, 4, 8, '2023-07-17', 'There are some great restaurants nearby. I especially love the Italian place on the corner.'),
(18, 2, 9, '2023-07-19', 'Yes, there are a couple of gyms nearby, but they can be quite expensive.'),
(18, 3, 9, '2023-07-19', 'The local gym is small but has all the necessary equipment.'),
(19, 4, 10, '2023-07-20', 'The commute is pretty smooth. I take the bus, and it’s usually on time.'),
(22, 6, 11, '2023-07-23', 'There are some nice cafes, but they can be pricey.'),
(23, 5, 12, '2023-07-24', 'The water pressure is generally good, except during peak hours.'),
(25, 6, 13, '2023-07-26', 'Parking is challenging. I sometimes have to drive around for 15 minutes to find a spot.'),
(26, 1, 13, '2023-07-27', 'Finding parking can be difficult, especially in the evenings.'),
(28, 3, 14, '2023-07-29', 'I’ve never had any issues with pests, but a neighbor mentioned seeing a mouse once.'),
(29, 2, 15, '2023-07-30', 'There are several good schools nearby, but some of them have long waiting lists.'),
(31, 6, 16, '2023-08-01', 'The parks are lovely and well-maintained. Great for kids and pets.'),
(33, 4, 17, '2023-08-03', 'The neighborhood is friendly, but it can be a bit noisy with traffic during rush hours.');
