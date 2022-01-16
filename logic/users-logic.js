const usersDao = require("../dao/users-dao")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const { nextTick } = require("process");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");


const saltRight = "sdjjfjewrfkajh";
const saltLeft = "vuelwmfbaqpd";

async function addUser(newUser) {

    console.log("registration reached logic.");
    let newUserData;
    let isNotExist = await usersDao.validateUserData(newUser.username);
    
    if (isNotExist == false) {
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }
    else {
    newUser.userType = "user";
    newUser.password = crypto.createHash('md5').update(saltLeft + newUser.password + saltRight).digest('hex');

        newUserData = await usersDao.addUser(newUser);

        return newUserData;
    }
}




async function login(loggedUser) {

    loggedUser.password = crypto.createHash('md5').update(saltLeft + loggedUser.password + saltRight).digest('hex');
    let loggedUserDetails
    try {
        await usersDao.validateLogin(loggedUser);
        loggedUserDetails = await usersDao.login(loggedUser);
        let loggedUserData = loggedUserDetails;
        console.log(loggedUserData);
       
    const token = jwt.sign({
        userId: loggedUserDetails.userId,
        userType: loggedUserDetails.userType,
        username: loggedUserDetails.username
    }, config.secret);
    console.log(token);
    return { token: token };
    }
    catch (error) {
        return error;
    }


}

async function validateLogin(loggedUser) {
    try {
        loggedUser = await usersDao.validateLogin(loggedUser);
        return loggedUser;
    }
    catch (error) {
        return next(error);
    }
}



module.exports = {
    addUser,
    login,
    validateLogin
}