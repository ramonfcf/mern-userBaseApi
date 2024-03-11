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
