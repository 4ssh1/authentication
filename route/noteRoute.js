const express = require("express");
const { newNote, getNote, update, deleteNote } = require("../controllers/noteController");
const { protect, authorise } = require('../controllers/authContoller');

const router = express.Router();


router.post('/create-note', newNote).get("/find-note/:id", getNote).patch("/update/:id", update).delete("/delete/:id", protect, authorise, deleteNote)

module.exports = router