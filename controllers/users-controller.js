const express = require("express");
const usersLogic = require("../logic/users-logic");
// const jwt_decode = require("jwt-decode");

const router = express.Router();

router.post("/",async(request,response, next) =>{
    let newUser = request.body;

    // let token = request.headers.authorization;
    // let decoded = jwt_decode(token);
    // let username = decoded.username;
    // let userId = decoded.userId;

    console.log("user registration request detected");
    try{
        let registrationResult = await usersLogic.addUser(newUser);
        response.json(registrationResult);
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
})

router.post("/login",async(request, response, next) => {

    let loggedUser = request.body;
    console.log("user login request detected");
    try {
        let loggedUserDetails = await usersLogic.login(loggedUser);
        console.log(loggedUserDetails);
        response.json(loggedUserDetails);
    }
    catch (error) {
        return next(error);
    }
})





module.exports = router;