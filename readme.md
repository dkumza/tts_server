## Tech Trade Swap DB

Express server that handles APIs requests from SQL (CRUD). With JWT, bcrypt, yup and more. Client can be found **[HERE](https://github.com/dkumza/tts_client)**

### ENV file

-  Copy .env.example to .env and fill with your data.

### SERVER SIDE

The server is built with Express.js, SQL and provides the following endpoints:

-  `GET /api/products`: Fetches all products from the database.
-  `POST /api/products`: Adds a new product to the database.
-  `GET /api/products/:id`: GET a single product with the specified ID from the database.
-  `DELETE /api/products/:id`: Deletes a product with the specified ID from the database.
-  `PUT /api/products/:id`: Updates the product with the specified ID in the database.
-  `GET /api/products/category/:cat_id`: GET all products by specified category ID from the database.
-  `GET /api/search/:item`: GET all products by specified word from the database.
-  And many more...

You need to import "ads.sql" file from "./server/src/db" to your database and test it locally.

### Installation

You need local setup of SQL DB <br>

To install the application, follow these steps:

1. Clone the repository.
2. Navigate to the `tts_server` folder and run `npm install` to install the server dependencies.
3. Import "ads.sql" to your local SQL server.
