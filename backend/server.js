const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { onNewConnection } = require("./websockets/onNewConnection");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "*",
	}
});

io.on("connection", onNewConnection);

const init = () => {
	server.listen(3000, () => {
		console.log("Server running on port 3000");
	})
}

global.io = io;

module.exports = {
	init,
}