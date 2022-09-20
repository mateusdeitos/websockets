const initSocketEvents = socket => {
	socket.on("message", data => {
		global.io.emit("message", {
			...data,
			sender: socket.id
		});
	})
}

module.exports = {
	initSocketEvents
}