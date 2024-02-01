# Mythcarver - Server

This repository contains the backend server for the Mythcarver world-building app. The server is built with Express, uses Mongoose for MongoDB interaction, and includes user authentication.

## Features

- **Express Server**: A robust backend server built with Express.
- **Mongoose Integration**: Utilizes Mongoose for MongoDB database interaction.
- **User Authentication**: Secure endpoints with user authentication using JSON Web Tokens (JWT).
- **Controllers**: Includes controllers for creating, updating, and deleting world creations and notes.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FunkyDunk-Z/Mythcarver-A-Worldbuilding-App
   cd Mythcarver-A-Worldbuilding-App/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `config.env` file in the root of the `server` directory with the following content:

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

   Replace the placeholder values with your actual configuration details. Refer to the [README](../README.md) for details on each configuration parameter.

2. Run the server:

   ```bash
   npm start
   ```

   The server will run on the specified port (default is 7000). Visit [http://localhost:7000/api/v1](http://localhost:7000/api/v1) to confirm the server is running.
