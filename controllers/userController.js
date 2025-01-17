const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const newUser = await User.create({
        username, email, password: hashedPassword,
    })
    console.log(`User ${username} created`);
    if(user){
        res.status(201).json({__id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register this User",
    });
});

//@desc Login User
//@route GET /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    //compare password with hashed Password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "1m"},
    );
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
    
    res.json({message: "Login User",
    });
});

//@desc Current User Info
//@route GET /api/users/current
//@access private
const currentUserInfo = asyncHandler(async (req, res) => {
    res.json({message: "Current User",
    });
});


module.exports = { registerUser, loginUser, currentUserInfo };