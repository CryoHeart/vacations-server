const { request } = require("express");
const express = require("express");
const vacationsLogic = require("../logic/vacations-logic");
const router = express.Router();
// const jwt_decode = require("jwt-decode");

router.get("/", async (request, response, next) => {
    console.log("Request detected. Getting all vacations...");
    try {
        let allVacations = await vacationsLogic.getAllVacations();
        response.json(allVacations);
    }

    catch (error) {
        console.error(error);
        return next(error);
    }

});

router.delete("/:id", async (request, response, next) => {

    const id = request.params.id;

    try {
        const isDeleted = await vacationsLogic.removeVacation(id);
        response.json(isDeleted);
    }

    catch (error) {
        console.error(error);
        return next(error);
    }

});

router.get("/:id", async (request, response, next) => {

    const { id } = request.params;

    try {
        const isFound = await vacationsLogic.getAllVacations(Number(id));
        response.json(isFound);
    }

    catch (error) {
        console.error(error);
        return next(error);
    }

})

router.post("/addVacation", async (request, response, next) => {
    console.log("THIS IS CONTROLLER ADD FUNCTION");
    let newVacation = request.body;
    let token = request.headers;
    // let decoded = jwt_decode(token);
    console.log("=============================="+token);
    // console.log("++++++++++++++++++++++++++++++"+decoded);


    try {
  
        // let userId = decoded.userId;
        // console.log("THIS IS THE TOKEN ==========>>>>>>>> " + decoded + " and the user ID is " + userId);
        let successfullyAdded = await vacationsLogic.addVacation(newVacation);
        response.json(successfullyAdded);
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
})

router.put("/editVacation", async (request, response, next) => {
    let editedVacation = request.body;

    try {
        await vacationsLogic.editVacation(editedVacation);
        response.json();
    }
    catch (error) {
        console.error(error);
        return next(error);
    }

    return editedVacation;
})

module.exports = router;