const express = require("express");
const expressServer = express();
const http = require("http"); // More basic server than express.
const httpServer = http.createServer(expressServer);
const { default: jwtDecode } = require("jwt-decode");
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

let userIdToSocketsMap = new Map();

socketIO.on("connection", socket => {
    console.log("Connection request");
    var handshakeData = socket.request;
    let token = handshakeData._query.token;
    if (token) {
        let decoded = jwtDecode(token);
        let userId = decoded.userId;
        userIdToSocketsMap.set(userId, socket);
        console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);
    }


    // socket.on("msg-from-client", msg => {
    //     console.log("Client sent message: " + JSON.stringify(msg));

    //     let senderId = msg.senderId;
    //     let targetId = msg.targetId;
    //     let parameters = msg.parameters;

    //     let socket = userIdToSocketsMap.get(targetId);

    //     // 5. Server sending this message to all clients: 
    //     socket.emit("msg-from-server", parameters);
    // });

    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        var handshakeData = socket.request;
        let token = handshakeData._query.token;
        if (token) {
            let decoded = jwtDecode(token);
            let userId = decoded.userId;
            userIdToSocketsMap.delete(userId);
            console.log(userId + " client has been disconnected. Total clients: " +
                userIdToSocketsMap.size);
        }
    });

});

httpServer.listen(8000, () => console.log("Listening..."));

function broadcastExceptSender(actionName, data, senderId) {

    for (let [id, socket] of userIdToSocketsMap) {
        if (id !== senderId) {
            socket.emit(actionName, data);
        }
    }
}

module.exports = {
    broadcastExceptSender
};