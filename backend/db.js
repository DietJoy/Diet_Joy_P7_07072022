const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.v9ywjaz.mongodb.net/Groupomania',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.log('Echec de connection à MongoDB', err));
