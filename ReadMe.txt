# Encrypted Chat Application

A real-time chat application with end-to-end encryption using Socket.IO and CryptoJS.

## Features

- Real-time messaging
- End-to-end encryption
- User list display
- Simple UI with avatars

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies

## Usage

1. Start the server: `node server.js`
2. Open `http://localhost:3000` in your browser
3. Enter a username when prompted

## Libraries Used

- Socket.IO: Real-time, bidirectional communication
- CryptoJS: Message encryption and decryption

## Design Choices

- Client-side encryption for enhanced security
- Pre-shared key for simplicity (Note: In production, use a more secure key exchange method)
- Simple UI with message bubbles and avatars for better user experience
- Server-side user management for displaying active users

## Security Note

The current implementation uses a hardcoded encryption key. For production use, implement a secure key exchange mechanism.

## License

[MIT License](LICENSE)