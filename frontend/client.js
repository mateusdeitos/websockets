const socket = io("http://localhost:3000");
let socketId;
socket.connect();

const init = () => {
	initDOMEvents();
	initSocketEvents();
}

const initDOMEvents = () => {
	const input = getMessageInput();
	const button = getSendMessageButton();
	input.addEventListener("keypress", triggerOnEnter(sendMessage));
	button.addEventListener("keypress", triggerOnEnter(sendMessage));
	button.addEventListener("click", sendMessage);
}

const initSocketEvents = () => {
	socket.on("message", data => {
		appendMessageElement(createMessage(data.message, data.sender));
	})

	socket.on("connection-id", (id) => {
		socketId = id;
	})
}

const getMessageInput = () => document.getElementById("message");
const getSendMessageButton = () => document.getElementById("sendMessage");
const getMessagesContainer = () => document.querySelectorAll(".messages")[0];
const createMessage = (text, sender) => {
	const message = document.createElement("div");
	message.classList.add("message");
	message.classList.add(sender == socketId ? "sent" : "received");
	message.textContent = text;
	return message;
}

const triggerOnEnter = (callback) => (event) => {
	if (event.key === "Enter") {
		callback();
	}
}

const sendMessage = () => {
	const message = getMessageInput().value;
	socket.emit("message", { message });
	input.value = "";
};

const appendMessageElement = (message) => {
	const container = getMessagesContainer();
	container.appendChild(message);
	message.scrollIntoView({ behavior: "smooth" });
}

init();