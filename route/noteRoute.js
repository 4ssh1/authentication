const express = require("express");
const { newNote, getNote, update, deleteNote } = require("../controllers/noteController");
const { protect, authorise } = require('../controllers/authContoller');

const router = express.Router();


router.post('/create-note', protect, newNote).get("/find-note/:id", protect, getNote).patch("/update/:id",protect, update).delete("/delete/:id", protect, authorise, deleteNote)

module.exports = router