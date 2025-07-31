
# Policy Insurance - Backend API

This is the backend for the AI Avatar application, built with Node.js, Express, and Sequelize ORM. It provides APIs for generating and managing AI-powered avatar functionalities. This README provides detailed, step-by-step instructions to set up and run the application locally on an Ubuntu system.

## Prerequisites

Before setting up the project, ensure you have the following installed:

* **Node.js** : Version 18.x or higher (LTS recommended)
* **npm** : Comes bundled with Node.js
* **Database** : MySQL (this guide uses MySQL on Ubuntu)
* **Git** : For cloning the repository

## Setup Instructions

Follow these steps to set up and run the AI Avatar backend application on your Ubuntu machine.

### 1. Clone the Repository

Clone the project repository from GitHub to your local machine.

```bash
git clone https://github.com/Amit-4582/policy-backend.git
cd policy-backend
```

### 2. Install Node.js

Ensure you have Node.js installed. This project requires Node.js version 18.x or higher.

1. **Check Node.js Version** :
   Run the following command to verify your Node.js version:

```bash
   node -v
```

   If Node.js is not installed or the version is lower than 18.x, proceed to install it.

1. **Install Node.js** :

* Update the package index:
  ```bash
  sudo apt update
  ```
* Install Node.js and npm:
  ```bash
  sudo apt install nodejs npm
  ```
* If the installed version is outdated, use the NodeSource PPA for Node.js 18.x:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  ```
* Verify the installation:
  ```bash
  node -v
  npm -v
  ```
* Alternatively, use `nvm` (Node Version Manager):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  nvm install 18
  nvm use 18
  ```

### 3. Install Project Dependencies

Install the required Node.js dependencies listed in `package.json`.

```bash
npm install
```

This will install dependencies such as `express`, `sequelize`, `mysql2`, `dotenv`, `nodemon`, `cross-env`, and others. If you encounter issues, ensure `package-lock.json` is present, or delete it and rerun `npm install`.


### 4. Create and Configure Environment Files

The project uses two environment files, `.env.development` and `.env.production`, to manage configuration settings for different environments. The application loads the appropriate file based on the `NODE_ENV` variable.

#### 4.1 Install `dotenv` Package

The `dotenv` package is already included in the dependencies. Ensure it is installed:

```bash
npm install dotenv
```

#### 4.2 Create Environment Files

Create `.env` files in the project root.

1. **Create `.env`** :

```bash
   touch .env
```

   Open the file in a text editor (e.g., `nano`):

```bash
   nano .env
```

   Add the following configuration (adjust `MYSQL_PASSWORD` to match the password set in step 4.2):

```
   # -----------------------
   # SERVER CONFIGURATION
   # -----------------------
   NODE_ENV=development
   PORT=8080
   BASE_URL=/api/v1

   # -----------------------
   # DATABASE CONFIGURATION
   # -----------------------
   MYSQL_DIALECT=mysql
   MYSQL_HOST=localhost
   MYSQL_DBPORT=3306
   MYSQL_DATABASE=policy_insurance
   MYSQL_USERNAME=root
   MYSQL_PASSWORD=root (As per your)
   MYSQL_LOGGING=true

   # -----------------------
   # LOGGING CONFIGURATION
   # -----------------------
   LOG_LEVEL=info

   # -----------------------
   # JWT CONFIGURATION
   # -----------------------
   JWT_SECRET=policy_secret
   JWT_REFRESH_TOKEN_SECRET=policy_refresh_secret
   JWT_ACCESS_TOKEN_EXPIRY=4h
   JWT_REFRESH_TOKEN_EXPIRY=7d
```

   Save and close the file (e.g., in `nano`, press `Ctrl+O`, `Enter`, then `Ctrl+X`).

1. **Secure Environment Files** :
   Restrict access to the environment files:

```bash
   chmod 600 .env
```

#### 5.3 Configure Application to Use Environment Files

The application uses `dotenv` to load the correct `.env` file based on `NODE_ENV`. Ensure the following is in your main application file (e.g., `app.js`):

```javascript
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
```

If this is not already in the codebase, check the repository's documentation for how environment variables are loaded.

### 5. Set Up Sequelize

Sequelize uses the environment variables to connect to the database.

#### 5.1 Install Sequelize CLI

The `sequelize-cli` is included as a dev dependency. Ensure it is installed:

```bash
npm install
```

#### 5.2 Run Migrations and Seeds

Run Sequelize migrations and seeds using the scripts defined in `package.json`.

* **Development Environment** :

```bash
  export NODE_ENV=development
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```

  Update `package.json` if necessary or consult the repository's documentation.

### 6. Start the Application

Start the Node.js server using the scripts defined in `package.json`.

* **Development Environment** :

```bash
  npm run dev
```

The server should start on the port specified in the environment file (default: 8080). You should see:

```
Server running on http://localhost:8080
```

### 7. Test the API

Use a tool like [Postman](https://www.postman.com/) or `curl` to test the API endpoints:

```bash
curl http://localhost:8080/api/v1/health
```

Check the repository's documentation or `routes` folder for available endpoints.

### 8. Troubleshooting

* **Node Version Issues** : Use `nvm` to switch to Node.js 18.x:

```bash
  nvm install 18
  nvm use 18
```

* **MySQL Connection Errors** : Verify the `MYSQL_*` variables in `.env.development` or `.env.production` match your MySQL setup. Ensure MySQL is running:

```bash
  sudo systemctl status mysql.service
```

* **Dependency Errors** : Delete `node_modules` and `package-lock.json`, then rerun `npm install`.
* **Sequelize Errors** : Ensure the `mysql2` driver is installed:

```bash
  npm install mysql2
```

* **Environment Variable Errors** : Ensure the correct `.env` file is loaded based on `NODE_ENV`. Verify all required variables are set and there are no typos (e.g., `FLASK_FILE_PATH`).

### 9. Project Structure

A typical project structure may look like:

```
ai_avatar_backend/
├── config/
│   └── config.js
├── models/
│   └── index.js
├── routes/
│   └── api.js
├── migrations/
├── seeders/
├── .env
├── package.json
├── app.js
└── README.md
```

* `config/`: Database configuration
* `models/`: Sequelize models
* `routes/`: API routes
* `migrations/`: Database migration files
* `seeders/`: Seed data for the database
* `app.js`: Main application entry point

