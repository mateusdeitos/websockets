const { initSocketEvents } = require("./initSocketEvents");

const onNewConnection = socket => {
	console.log("New connection established: ", socket.id);
	initSocketEvents(socket);
	socket.emit("connection-id", socket.id);

	socket.on("disconnect", () => {
		console.log("Connection closed: ", socket.id);
	});
}

module.exports = {
	onNewConnection
}