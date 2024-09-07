const socket = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const userList = document.getElementById('user-list');
const username = prompt('Enter your username:');

document.getElementById('username').textContent = username;
document.getElementById('profile-name').textContent = username;

// Replace the random key generation with the pre-shared key
const secretKey = "mA1+adYTsyu5knV469mUEA=="; // Replace with the key you generated

function encryptMessage(message) {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
}

function decryptMessage(encryptedMessage) {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

socket.emit('register', username);

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    if (messageInput.value) {
        const encryptedMessage = encryptMessage(messageInput.value);
        socket.emit('chat message', encryptedMessage);
        messageInput.value = '';
    }
}

socket.on('chat message', (data) => {
    const decryptedMsg = decryptMessage(data.message);
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (data.user === username) messageElement.classList.add('sent');
    
    messageElement.innerHTML = `
        <img src="assets/untitled.png" alt="${data.user} Avatar" class="message-avatar" style="width: 30px; height: 30px;">
        <div class="message-content">
            <strong>${data.user}:</strong> ${decryptedMsg}
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('user list', (users) => {
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
});