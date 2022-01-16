const express = require("express");
const jwtDecode = require('jwt-decode');
const followedVacationsLogic = require("../logic/followed-vacations-logic");

const router = express.Router();

router.get("/:id", async(request, response, next) => {
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userId = decode.userId;
    console.log("Token is: " + decode.token + "and the User ID is: " + userId);
// const userId = request.params.id;
    try {
        console.log("Followed vacations requested by user ID " + userId);
        const followedVacations = await followedVacationsLogic.getFollowedVacations(userId);
        console.log(followedVacations);
        response.json(followedVacations);
    }
    catch (error) {
        response.json(error)
    }
})

router.post("/", async (request, response, next) => {
    console.log("Follow action received.");
    const token = request.headers.authorization;
    const decode = jwtDecode(token);
    const userId = decode.userId;

    const package = { userId: userId, vacationId: request.body.vacationId };
    let followResult;
    try {
        followResult = await followedVacationsLogic.addFollow(package);
        response.json(followResult);
    }

    catch (error) {
        response.json(error);
    }
return followResult;
    // return newFollow;

})


module.exports = router;