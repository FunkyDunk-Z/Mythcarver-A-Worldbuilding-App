# Mythcarver - World Building App

![Mythcarver Logo](./client//public/favicon.ico)

Welcome to Mythcarver! Mythcarver is a web application designed to facilitate world-building and note-making for creators working on fictional worlds. This repository contains both the client and server components of the Mythcarver world-building app.

## Getting started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/FunkyDunk-Z/Mythcarver-A-Worldbuilding-App
cd Mythcarver-A-Worldbuilding-App
```

### 2. Client Setup

#### Navigate to the Client Directory

```bash
cd client
```

#### Install Dependencies

```bash
npm install
```

#### Create a `.env` file in the client with the following content:

```env
VITE_EMAIL=your-email@example.com
VITE_PASSWORD=your-password
```

Replace `your-email@example.com` and `your-password` with the email and password required for development.

#### Start the development server:

```bash
npm run dev
```

Visit [http://localhost:4100](http://localhost:4100) to see Mythcarver in action.

### 3. Server Setup

#### Navigate to the Server Directory

```bash
cd ../server
```

#### Install Dependencies

```bash
npm install
```

#### Create `config.env` File for the Server

Create a `config.env` file in the `server` directory with the following content:

```env
PORT=8000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
DATABASE=your-mongo-database-uri
DATABASE_PASSWORD=your-mongo-database-password
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
USER_DEFAULT_AVATAR=base64-encoded-image
```

Replace the placeholder values with the appropriate configuration for your server:

- **`PORT`**: The port number on which the server will run.
- **`NODE_ENV`**: Set to `development` for development mode.
- **`JWT_SECRET`**: A secret key for JSON Web Token (JWT) encryption.
- **`DATABASE`**: The URI of your MongoDB database.
- **`DATABASE_PASSWORD`**: The password for accessing your MongoDB database.
- **`CLOUDINARY_NAME`**, **`CLOUDINARY_API_KEY`**, **`CLOUDINARY_API_SECRET`**: Credentials for Cloudinary, if applicable.
- **`USER_DEFAULT_AVATAR`**: A base64-encoded default image for user avatars.

Ensure that you replace these placeholder values with your actual configuration details.

#### Run the Server

```bash
npm run dev
```

Visit [http://localhost:7000/api/v1](http://localhost:7000/api/v1) to see the Mythcarver server.

## Contributing

We welcome contributions! The main branch is protected so please create a branch with [your-name]-[your-contributing-feature] and add @luke-dowling or @FunkyDunk-Z to review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Hat tip to anyone whose code was used.
- Inspiration from other world-building tools.
