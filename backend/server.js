require('dotenv').config();

//creating express server connecting 
const express = require('express');
const cors = require('cors');

//require mongoose
const mongoose = require('mongoose');



//attaching cors and express json middleware
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//connecting database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//tells server to use the files in the route folder
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
//added as middleware
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);




//server listening on port 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});