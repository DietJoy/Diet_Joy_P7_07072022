const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://' + process.env.DB_USER_PASS + process.env.DB_CLUSTER + '.mongodb.net/Groupomania', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.log('Echec de connection à MongoDB', err));
