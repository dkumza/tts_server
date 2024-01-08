## AD Portal

Express server that handles APIs requests from SQL (CRUD)

### SERVER SIDE

The server is built with Express.js, SQL and provides the following endpoints:

-  `GET /api/ads`: Fetches all ads from the database.
-  `DELETE /api/ads/:id`: Deletes a ad with the specified ID from the database.
-  `POST /api/ads`: Adds a new ad to the database.
-  `PUT /api/ads/:adID`: Updates the ad with the specified ID in the database.

~~You can import "ads.sql" file from "./server/src/db" to your database and test it locally.~~

### Installation

You need local setup of SQL DB <br>

To install the application, follow these steps:

1. Clone the repository.
2. Navigate to the `ADS_SERVER` folder and run `npm install` to install the server dependencies.
3. ~~Import "exp_DB.sql" to your local SQL server.~~
