
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const followedVacationsDao = require("../dao/followed-vacations-dao")
const connection = require("../dao/connection-wrapper");

async function getFollowedVacations(userId) {
    const followedVacations = await followedVacationsDao.getFollowedVacations(userId);
    return followedVacations;
}

async function addFollow(package) {
    // const validateFollow = await followedVacationsDao.validateFollow(package);
    const validate = await followedVacationsDao.validateFollow(package);
    if (validate.length) {
        const removeFollow = await followedVacationsDao.removeFollow(package);
        console.log("User ID " + package.userId + " unfollowed vacation ID " + package.vacationId);
        return removeFollow;
    }
    else{
    const newFollow = await followedVacationsDao.addFollow(package);
    console.log("User ID " + package.userId + " followed vacation ID " + package.vacationId);
    return newFollow;
    }

}



module.exports = {
    addFollow,
    getFollowedVacations
}





// async function addFollow(package) {
//     // const validateFollow = await followedVacationsDao.validateFollow(package);
//     const validate = await connection.executeWithParameters(`SELECT * FROM vacations.followedvacations where vacationId = ? and userId = ?`, [package.vacationId, package.userId]);
//     if (validate.length) {
//         const removeFollow = await followedVacationsDao.removeFollow(package);
//         return removeFollow;
//     }
//     else{
//     const newFollow = await followedVacationsDao.addFollow(package);
//     return newFollow;
//     }

// }