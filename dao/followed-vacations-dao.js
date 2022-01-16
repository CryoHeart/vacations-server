const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");


async function getFollowedVacations(userId){
    let sql = "SELECT * FROM vacations.followedvacations where userId = ?";
    let parameters = [userId];

    let followedVacations = await connection.executeWithParameters(sql, parameters);

    return followedVacations;
}

async function validateFollow(package) {
    let sql = `SELECT * FROM vacations.followedvacations where vacationId = ? and userId = ?`;
    let parameters = [package.vacationId, package.userId];
    let validationResult = await connection.executeWithParameters(sql, parameters);
    return validationResult;
    // if (validationResult.length > 0) {
    //     return true;
    // }
    // return false;
}

async function addFollow(package) {

    let sql = "INSERT INTO vacations.followedvacations (`vacationId`, `userId`) VALUES (?,?);";
    let parameters = [package.vacationId, package.userId];

    const newFollow = await connection.executeWithParameters(sql, parameters);

    return newFollow;
}

async function removeFollow(package) {
    let sql = "DELETE FROM vacations.followedvacations where vacationId = ? and userId = ?;"
    let parameters = [package.vacationId, package.userId];

    const removedFollow = await connection.executeWithParameters(sql, parameters);

    return removedFollow;
}



module.exports = {
    addFollow,
    validateFollow,
    removeFollow,
    getFollowedVacations
}