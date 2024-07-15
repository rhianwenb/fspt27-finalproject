# fspt27-finalproject

### RentReview
- 

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- Delete the line reach/combobox on package.json (client)
- `cd client` and run `npm install`. This will install client dependencies (React).
- Run these two commands separately : `npm config set legacy-peer-deps true` and then `npm i @reach/combobox`

### .env file(s)
- Create .env in your project directory and add info for your MySQL database:
  ```
  DB_HOST=localhost
  DB_USER=YOUR_USERNAME
  DB_PASS=YOUR_PASSWORD
  DB_NAME=next_tenant
  SUPER_SECRET=YOUR_SECRET_KEY
  ```
- Create .env in the client directory and add key for google maps APIs:
```
    VITE_GOOGLE_MAPS_API_KEY = YOUR_KEY
```

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called Next Tenant: `create database next_tenant `
- Check the `.env` file has YOUR MySQL password.
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables called 'users', 'properties' and 'reviews' in your database.



### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.


### Postman / API 

- Available database routes are as follows:  

    GET:
        http://localhost:5000/api/properties
        http://localhost:5000/api/users
        http://localhost:5000/api/reviews



