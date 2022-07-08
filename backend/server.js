const express = require('express');
require('dotenv').config();
const app = express();


//connection au server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`); //Variables d'environnement backend du .env
});