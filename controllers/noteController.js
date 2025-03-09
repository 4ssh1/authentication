const Note = require("../model/note");
const newNote = async (req, res, next) => {
    const {title, content, author} = req.body;
    const user = req.user;
    console.log(user)
    const note = await Note.create({title, content, author, userId: user._id});
    if(!note){
        return res.status(401).json({
            status: "Error",
            message: "Note creation not successful"
        })
    }
       res.status(201).json({
            status: "Successful",
            message: "Note created successfully",
            note
        })

    next()
}

const getNote = async (req, res, next) => {
    const {id} = req.params;
    const note = await Note.findById(id).populate("userId")
    if(!note){
        return res.status(404).json({
            status: "Error",
            message: "Note not found"
        })
    }

     res.status(201).json({
        status: "successful",
        message: "Note found",
        note
    })
}

const update = async (req, res, next) => {
    const {id} = req.params;
    const {title, content, author} = req.body;
    const note = await Note.findByIdAndUpdate(id, {title, content, author}, {new: true});
    if(!note){
        return res.status(404).json({
            status: "Error",
            message: "Note not updated"
        })
    }

     res.status(201).json({
        status: "successful",
        message: "Note updated",
        note
    })
}

const deleteNote = async (req, res, next) => {
    const {id} = req.params;
    const note = await Note.findByIdAndDelete(id);
    if(!note){
        return res.status(404).json({
            status: "Error",
            message: "Note not deleted"
        })
    }

     res.status(201).json({
        status: "successful",
        message: "Note deleted successfully",
        note
    })
}

module.exports = {newNote, getNote, update, deleteNote}