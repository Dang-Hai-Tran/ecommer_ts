# Ecommerce TypeScript Application

- [Ecommerce TypeScript Application](#ecommerce-typescript-application)
  - [Overview](#overview)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Directory Structure](#directory-structure)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
  - [License](#license)

## Overview
This project is a TypeScript-based ecommerce application that utilizes Express.js for the backend and MongoDB for data storage. It is designed to provide a robust and scalable solution for managing shops, products, and user authentication.

## Features
- User registration and authentication
- Secure password hashing using bcrypt
- RESTful API structure
- Middleware for logging, security, and compression
- MongoDB connection management using the Singleton pattern

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure your database connection and other settings.

4. **Run the application:**
   ```bash
   npm run dev
   ```

## Directory Structure

```
src/
├── configs/ # Configuration files
├── controllers/ # Request handlers
├── dbs/ # Database connection management
├── models/ # Mongoose models
├── routes/ # API routes
├── services/ # Business logic
├── utils/ # Utility functions
└── app.ts # Main application file
server.ts # Server execution
```


## API Endpoints
- `POST /api/v1/shop/signup`: Register a new shop
- Additional endpoints can be added as the application grows.

## Testing
The project includes unit tests using Jest. To run the tests, use:
```bash
npm test
```


## License
This project is licensed under the MIT License.
