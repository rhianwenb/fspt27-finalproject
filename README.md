# fspt27-finalproject

### RentReview
- 

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).


### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database next_tenant `
- Check the `.env` file has YOUR MySQL password.
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables called 'users', 'properties' and 'reviews' in your database.



### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.


### Postman / API 

- The currently available database routes are as follows:  

    GET:
        http://localhost:5000/api/index



