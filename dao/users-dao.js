const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function addUser(newUser) {

    console.log("reached Dao with: ", newUser);

    let sql = "INSERT INTO users (`userId`, `username`, `password`, `email`, `firstName`, `lastName`, `userType`) VALUES (?,?,?,?,?,?,?)";
    let parameters = [
        newUser.userId,
        newUser.username,
        newUser.password,
        newUser.email,
        newUser.firstName,
        newUser.lastName,
        newUser.userType
    ];
    try {
        let addedUserResult = await connection.executeWithParameters(sql, parameters);
        return addedUserResult;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(newUser), error);
    }

}

async function login(loggedUser) {

    let sql = "SELECT * FROM users WHERE username=? AND password=?";
    let parameters = [loggedUser.username, loggedUser.password];

    try {
        let loggedUserDetails = await connection.executeWithParameters(sql, parameters);

        console.log(loggedUser.username + " connected");

        // loggedIn = { userId: loggedUser[0].userId, username: loggedUser[0].username, userType: loggedUser[0].userType };
console.log(loggedUserDetails);
        return loggedUserDetails[0];
    }
    catch (error) {

        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(loggedUser), error);
    }

}

async function validateUserData(newUsername) {

    console.log("validating user's data...")
    let sql = "SELECT * FROM users WHERE username=?";
    let parameters = [newUsername];
    let validatedNewUser = await connection.executeWithParameters(sql, parameters);
    console.log(validatedNewUser);
    if (validatedNewUser.length == 0) {
        return true;
    }
    else {
        return false;
    }
}

async function validateLogin(loggedUser) {

    let sql = "SELECT * FROM users WHERE username=? AND password=?";
    let parameters = [loggedUser.username, loggedUser.password];
    let loggedInUser;

    try {
        loggedInUser = await connection.executeWithParameters(sql, parameters);
        return loggedInUser;
    }

    catch (error) {
        console.error(error);
    }

    if (loggedInUser == null || loggedInUser.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

}

module.exports = {
    validateUserData,
    login,
    addUser,
    validateLogin
}