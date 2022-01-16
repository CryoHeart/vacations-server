let ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
        isShowStackTrace: true
    },
    USER_NAME_ALREADY_EXIST: { id: 2, httpCode: 601, message: "User name already exist", isShowStackTrace: false },
    UNAUTHORIZED: {
        id: 3,
        httpCode: 401,
        message: "Login failed, invalid user name or password",
        isShowStackTrace: false
    },
    USER_NAME_DOESNT_EXIST: {id: 3, httpCode: 602, message: "User not found", isShowStackTrace: false },
    INCORRECT_PASSWORD: {id: 4, httpCode: 603, message: "Incorrect password", isShowStackTrace: false},
    

}

module.exports = ErrorType;