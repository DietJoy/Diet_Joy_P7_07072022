const express = require('express');
const userRoutes = require('./routes/user_routes'); //importation du router user

require('dotenv').config();
require('./db');
const app = express();

//Middleware qui intercepte toutes les requetes qui ont un contenu Json et le met à dipo dans req.body
app.use(express.json());

//*CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // /*/ accès à API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//routes
app.use('/api/user', userRoutes);
/* app.use('/api/auth', userRoutes); */


//connection au server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`); //Variables d'environnement backend du .env
});


app.use((req, res, next) => {
    res.json({ message: 'Requête reçue !' });
    next(); 
 });


module.exports = app; // Celà permet d'utiliser les modules sur les autres fichiers