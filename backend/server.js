const express = require('express');
const userRoutes = require('./routes/user_routes'); //importation du router user

require('dotenv').config();
require('./db');
const app = express();


//routes
app.use('/api/user', userRoutes);


//connection au server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`); //Variables d'environnement backend du .env
});