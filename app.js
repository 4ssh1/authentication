const express = require('express');
const mongoose = require('mongoose');
const { signup, login, protect, authorise, logOut} = require('./controllers/authContoller');
const noteRoute = require("./route/noteRoute");
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/noteapp')
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Could not connect to MongoDB', err));

app.use("/note", noteRoute );

app.post("/signup", signup)

app.post("/login", login)

app.get("/logout/:id", logOut)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
