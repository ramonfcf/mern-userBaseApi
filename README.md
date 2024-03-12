# mern-userBaseApi

## Setting up MongoDB with Docker Compose

This project includes a Docker Compose configuration file to easily set up a MongoDB database. Follow the steps below to start the MongoDB service using Docker Compose.

### Prerequisites
- Docker installed on your machine: [Get Docker](https://docs.docker.com/get-docker/)

### Steps to run the MongoDB service
1. **Navigate to the `docker` directory**
2. **Run the following command to start the MongoDB service:**
   ```bash
   docker-compose up -d
   ```
     The `-d` flag is used to run the service in detached mode. You can remove the flag if you want to see the logs in the terminal.

3. **To stop the MongoDB service, run the following command:**
4. ```bash
   docker-compose down
   ```

## Yarn Scripts

Before running these commands, ensure you have `yarn` installed on your system. If not, you can install it by running `npm install --global yarn` (if you have NPM installed) or you can download Yarn from the official website.

1. **Install dependencies**
2. Command:
   ```bash
   yarn install
   ```

3. **Run unit tests**
- Command:
   ```bash
     yarn test
   ```

4. **Start the server in development mode**
- Command:
     ```bash
     yarn start
     ```

     (This only works if you have a .env file with the correct environment variables, and a database running, with the correct node version)

5. **Database Seed Script**
- Command:
     ```bash
     yarn db-seed
     ```

6. **Reset Database**
- Command:
     ```bash
     yarn db-reset
     ```

## Environment Variables
The following environment variables are required to run the server:

- `MONGO_URI`: The URI of the MongoDB database.
- `JWT_SECRET`: A secret key used to sign JSON Web Tokens.
- `APP_NAME`: The name of the application that will be used in the response headers.
- `CORS_ORIGIN`: The origin URL that is allowed to make requests to the server.


## API Endpoints

### User Routes

#### Create a new user
- URL: `/api/users`
- Method: `POST`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "test@test.com",
    "birthday": "1990-01-01"
   }
   ```

#### Get all users
- URL: `/api/users`
- Method: `GET`
- Request Body: None

#### Get a single user
- URL: `/api/users/:userId`
- Method: `GET`
- Request Body: None

#### Update a user
- URL: `/api/users/:userId`
- Method: `PATCH`
- Request Body:
  ```json
  {
    "name": "John Doe",
    "email": "test@test.com",
    "birthday": "1990-01-01"
   }

#### Delete a user
- URL: `/api/users/:userId`
- Method: `DELETE`
- Request Body: None


#### Login
- URL: `/auth/authenticate`
- Method: `POST`
- Request headers:
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer <JWT>",
    "username": "APP_NAME",
  }
  ```

## Api Authentication

This api has a double layer of authentication.

The first is JSON Web Tokens (JWT) to authenticate requests. To access protected routes, you need to include the JWT in the `Authorization` header of the request. The value of the `Authorization` header should be `Bearer <JWT>`.

And there is also a cors middleware to allow requests from the specified origin. It should be set in the .env file.

### To authenticate a request, follow these steps:

1. **Send a request to the `/auth/authenticate` endpoint with the application's credentials to get a JWT.**
   You can define the application's credentials in the `.env` file using the environment variable JWT_SECRET and APP_NAME.
2. **Include the JWT in the `Authorization` header of the request to access protected routes.**


## Dependencies

This project uses the following dependencies:
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://yarnpkg.com/)
- [Node.js](https://nodejs.org/)
- [Jest](https://jestjs.io/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Cors](https://www.npmjs.com/package/cors)