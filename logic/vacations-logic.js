const vacationsDao = require("../dao/vacations-dao");
// let pushLogic = require("./push-logic");

async function getAllVacations() {

    let allVacations = await vacationsDao.getAllVacations();
    return allVacations;

}

async function removeVacation(id) {

    const vacationToDelete = await vacationsDao.removeVacation(id);
    return vacationToDelete;

}

async function getVacation(id) {

    try {

        await vacationsDao.getVacation(id);

        return true;
    }

    catch (error) {

        console.error(error);

        return false;
    }
}

async function addVacation(newVacation) {

    validateVacationForm(newVacation);

    await vacationsDao.addVacation(newVacation);

    pushLogic.broadcastExceptSender("addVacation", newVacation, senderId);
    return newVacationReturn;

    return newVacation;
}

async function editVacation(editedVacation) {

    try {
        await vacationsDao.editVacation(editedVacation);
    }

    catch (error) {
        console.error(error);
    }
    return editedVacation;
}

async function validateVacationForm(vacation) {
    if (!vacation.vacationId) {
        throw new Error();
    }
    if (!vacation.destination) {
        throw new Error();
    }
    if (!vacation.price) {
        throw new Error();
    }
    if (!vacation.startDate) {
        throw new Error();
    }
    if (!vacation.endDate) {
        throw new Error();
    }
    if (!vacation.image) {
        throw new Error();
    }
}

module.exports = {
    getAllVacations,
    getVacation,
    addVacation,
    removeVacation,
    editVacation
}