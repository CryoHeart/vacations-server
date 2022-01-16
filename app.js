const express = require("express");
const expressServer = express();
const cors = require ('cors');
let fileController = require("./controllers/files-controller");
const errorHandler = require ("./errors/error-handler");
let fileupload = require("express-fileupload");
const vacationsController = require("./controllers/vacations-controller");
const usersController = require("./controllers/users-controller");
const followedVacationsController = require("./controllers/followed-vacations-controller");

const http = require("http");
const server = express();
const httpServer = http.createServer(server);
// const socketIO = require("socket.io");
// const socketServer = socketIO.listen(httpServer);

expressServer.use(express.static(__dirname));
let userIdToSocketMap = new Map();

server.use(cors({origin: "http://localhost:3000"}));
server.use(fileupload());
server.use(express.static("files"));
server.use(express.json());
server.use("/users",usersController);
server.use("/vacations", vacationsController);
server.use("/follow", followedVacationsController);
server.use("/files", fileController);
server.use(errorHandler);

server.listen(3001, () => console.log("Listening on localhost:3001"));
