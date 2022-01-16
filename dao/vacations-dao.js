const ErrorType = require("../errors/error-type");
const connection = require("./connection-wrapper");
const ServerError = require("../errors/server-error");

async function getAllVacations() {

    let sql = "select * from vacations";
    let allVacations;

    try {
        allVacations = await connection.execute(sql);
    }

    catch (error) {

        throw new Error();

    }

    return allVacations;

}

async function removeVacation(id) {

    let sql = "DELETE FROM vacations WHERE vacationId = ? ";
    let parameters = [id];

    let deletedVacation = await connection.executeWithParameters(sql, parameters);
    console.log(deletedVacation);
    return deletedVacation;

}

async function getVacation(id) {
    let sql = "SELECT FROM vacations WHERE vacationId = ?";
    let parameters = [id];

    try {
        let showedVacation = await connection.executeWithParameters(sql, parameters);
        return showedVacation;
    }
    catch (error) {
        console.error(error);
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

}

async function addVacation(newVacation) {
    let sql = "INSERT INTO vacations (vacationId, destination, price, startDate, endDate, image) VALUES (?,?,?,?,?,?)";
    let parameters = [newVacation.vacationId,
    newVacation.destination,
    newVacation.price, newVacation.startDate,
    newVacation.endDate,
    newVacation.image];

    try {
        let addedVacation = await connection.executeWithParameters(sql, parameters);
        return addedVacation;
    }
    catch (error) {
        console.error(error);
        throw new Error();
    }
}

async function editVacation(editedVacation) {

    let sql = "UPDATE `vacations`.`vacations` SET `destination` = ?, `price` = ?, `startDate` = ?, `endDate` = ?, `image` = ? WHERE (`vacationId` = ?);"

    let parameters = [
        editedVacation.destination,
        editedVacation.price,
        editedVacation.startDate,
        editedVacation.endDate,
        editedVacation.image,
        editedVacation.vacationId
    ];

    try {
        editedVacationDetails = await connection.executeWithParameters(sql, parameters);
        return editedVacationDetails;
    }

    catch (error) {
        console.error(error);
    }

}

module.exports = {
    getVacation,
    getAllVacations,
    removeVacation,
    addVacation,
    editVacation
}