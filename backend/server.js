const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth.js');
const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  }));
app.use(cookieParser());

app.use('/api/auth/login', require('./api/auth/login'));
app.use('/api/auth/register', require('./api/auth/register'));



// NOTE(alex): all endpoints beyond this function call will require a user session
app.use(auth);

//NOTE(zack): fetch endpoints currently dont require user session, will update when its added
app.use('/api/fetch/recipes', require('./api/fetch/recipes.js'));
app.use('/api/fetch/user', require('./api/fetch/user.js'));

app.use('/api/create/recipe', require('./api/create/recipe'));
app.use('/api/delete/recipe', require('./api/delete/recipe.js'));
app.use('/api/update/recipe', require('./api/update/recipe.js'));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to DB');
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
})
.catch((err) => {
    console.log("mongoose connection error", err);
})

