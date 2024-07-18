# MyContacts Backend

MyContacts Backend is a Node.js application built with Express.js and MongoDB, providing APIs for user authentication and contact management.

## Features

- **User Authentication:**
  - Register new users with username, email, and password.
  - Authenticate users with JWT tokens.
  
- **Contact Management:**
  - Create, read, update, and delete contacts.
  - Contacts are associated with authenticated users.


## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Mewankyrshan/contactManagerBackend.git
   cd mycontacts-backend

2. Install dependencies:
    ```bash
    npm install

3. Set up environment variables
    Create a .env file based on .env.example and provide values for MongoDB connection and JWT secret.

4. Start the server
    npm start

5. The server should now be running at 'http://localhost:3000'
