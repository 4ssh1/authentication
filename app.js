require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const hbs = require("hbs");
const { signup, login, protect, logOut} = require('./controllers/authContoller');
const noteRoute = require("./route/noteRoute");
const app = express();

app.use(express.json());

mongoose.connect(process.env.DBCONNECT)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.set("view engine", "hbs")


app.use(express.static("public"))
hbs.registerPartials(`${__dirname}/views/partials`)



app.use("/note", noteRoute );

app.get("/", protect, (req,res)=>{
  const user = req.user;
  res.render("index", {user})
})

app.post("/signup", signup)

app.post("/login", login)

app.get("/logout/:id", logOut)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
