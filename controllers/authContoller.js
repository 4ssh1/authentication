const User = require("../model/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const signup = async (req, res, next) => {
    const {email, password} = req.body

    // const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, 10) 
    // console.log(salt)
    const user = await User.create({email, password: hashpassword })

    const token = jwt.sign({id: user._id}, "secret", {expiresIn: "24h"})
    const cookieOptions = {
        expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000), 
        httpOnly: true
    }
    if(process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.status(201).cookie("jwt", token, cookieOptions).json({
        status: "successfully created",
        data: {user}
        // token
    })
    next()
}

const login = async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({
            status: "failed",
            message: "user not found"
        })
    }
    
    const passwordCorrect = bcrypt.compare(password, user.password)
     
    if(!passwordCorrect){
        return res.status(404).json({
            status: "failed",
            message: "email or password not correct"
        })
    }

    const token = jwt.sign({id: user._id}, "secret", {expiresIn: "24h"})

    res.status(201).json({
        status: "successful login",
        data: {user}, 
        token
    })
    next()
}

const protect = async(req, res, next)=>{
    // const token = req.body.token;
    const token = req.cookies.jwt;

    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "user not logged in"
        })
    }

    const decoded = jwt.verify(token, "secret")

    if(!decoded){
        return res.status(401).json({
            status: "failed",
            message: "user not logged in"
        })
    }
    
    const user = await User.findById(decoded.id)
    if(!user){
        return res.status(401).json({
            status: "failed",
            message: "user with this id no longer exists"
        })
    }
    req.user = user
    next()
}

const authorise = async (req, res, next) => {
    const user = req.user;
    if(user.role !== "admin"){
        return res.status(401).json({
            status: "failed",
            message: "you are not authorised"
        })
    }
    next()
}

const logOut = async (req, res, next) => {
    const {id} = req.body;
    const token = req.cookies.jwt;
    // const expires = jwt.sign({id}, "secret", {expiresIn:  1000 })
    res.status(201).cookie("jwt", "ffxdx", {
        expiresIn: new Date(Date.now() + 5 * 1000), 
        httpOnly: true
    } ).json({
        status: "successful",
        message: "log out sucessful"
    }) 
}

module.exports = {signup, login, protect, authorise, logOut}