const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const hostname = '0.0.0.0';
const port = 3002;

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

server.use(cors(corsOptions));
server.use(express.urlencoded());
server.use(express.json());
server.use(cookieParser())

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

const uploadBirthdayRoute = require('./api/routes/uploadBirthdayRoute');
uploadBirthdayRoute(server);

const uploadQuoteRoute = require('./api/routes/uploadQuoteRoute');
uploadQuoteRoute(server);

const authRoute = require('./api/routes/authRoute');
authRoute(server);


server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
