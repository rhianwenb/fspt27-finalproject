# NextTenant

**NextTenant** is a rating app designed for rental properties. It allows renters to provide ratings and reviews on the rental properties they are living in, helping future tenants make informed decisions about the place, the area, and more. 

This app was created by Rhianwen, Orlane and Clio as our final project for the CodeOp Full-stack Development Bootcamp. 

## Features

- **Add Reviews**: Renters can easily add reviews for the rental properties they are living in, including details about the property and the surrounding area (developed by Orlane).
- **Secure Profile**: Users can create and update a secure profile to manage their reviews and interactions on the platform (developed by Rhianwen).
- **View Properties on a Map**: All reviewed properties are viewable on an interactive map, making it easy for users to explore rental options in different areas (developed by Clio).

## Installation

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).
  
### .env file(s)
- Create .env in your project directory and add info for your MySQL database:
  ```
  DB_HOST = localhost
  DB_USER = YOUR_USERNAME
  DB_PASS = YOUR_PASSWORD
  DB_NAME = next_tenant
  SUPER_SECRET=YOUR_SECRET_KEY
  ```
- Create .env in the client directory and add key for google maps APIs: [Google Maps API](https://console.cloud.google.com/google/maps-apis/api-list?project=zeta-store-394712)
```
    VITE_GOOGLE_MAPS_API_KEY = YOUR_KEY
```

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called Next Tenant: `create database next_tenant `
- Check the `.env` file has YOUR MySQL password and username.
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create five tables called 'users', 'properties', 'reviews', 'comments' and 'answers' in your database. When this command is run, dummy data is also added to the database. 

### Development

- Run `npm start` in project directory to start the Express server on port 4000.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.


### Postman / API 

- Check that migration has been successful in Postman by running the following requests:  

    GET:
        http://localhost:4000/api/properties
        http://localhost:4000/api/users
        http://localhost:4000/api/reviews
        http://localhost:4000/api/comments
        http://localhost:4000/api/answers

## Usage

1. **Create a Profile**: Sign up and create a secure profile to start contributing to the community.
2. **Add a Review**: Rate the rental property you're living in, and share insights about your experience.
3. **Explore**: Use the map feature to view all reviewed properties and find detailed information about rentals in various locations.

## Acknowledgements

We would like to thank [**CodeOp**](https://codeop.tech) for their support in developing this project.

*(Additional acknowledgements, including our names, will be added here.)*

## Contact

You can reach us through our GitHub or LinkedIn page for any inquiries or feedback:
- [Orlane Brun](https://www.linkedin.com/in/orlane-brun/)
- [Rhianwen Beint](https://www.linkedin.com/in/rhianwen-beint/)
- [Clio von Petersdorff](www.linkedin.com/in/clio-von-petersdorff)

## Screenshots


