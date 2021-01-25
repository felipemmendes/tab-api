# Tab API

This is the code for the Tab API.

This is a personal project.

## What is Tab?

Tab is a management app for foodies that would like to register their visits to restaurants.
With Tab users can see what they've ordered and how much they've spent everytime they go to a restaurant.

## Features

- Users management;
- Users sessions;
- Restaurant, products and orders management;

## Getting Started

To run the server you will need npm or yarn installed in your computer. Also, you need to start a Postgres and a Redis database.

1. Clone the repository
   ```sh
   git clone https://github.com/felipemmendes/tab-api.git
   ```
2. Install NPM packages

   ```sh
   npm install
   ```

   or

   ```sh
   yarn
   ```

3. Rename `.env.example` to `.env` and edit the variables with your own environment configuration (database configuration and other sensitive information).

4. Run the migrations in your database

   ```sh
   npm run typeorm migration:run
   ```

   or

   ```sh
   yarn typeorm migration:run
   ```

5. Start the server in development mode

   ```sh
   npm run dev:server
   ```

   or

   ```sh
   yarn dev:server
   ```

6. `npm run build` or `yarn build` will create a `dist` folder, which contains the compiled version (the .js version) of the code.

### Aditional notes

To manually test the routes, you can use [Insomnia](https://insomnia.rest/). Import the [workspace file](insominia-workspace.json) and have fun!
