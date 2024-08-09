# auth-api

Author: [@felipemattosv](https://github.com/felipemattosv)

## Description

This project is a authentication API that allows users to sign up, sign in, delete their account and update their account information. It also separates the users in two roles: admin and default.

## Technologies

- [Node.js](https://nodejs.org/en): JS runtime
- [TypeScript](https://www.typescriptlang.org): Adds syntax for types
- [Serverless](https://www.serverless.com): Simplifies development/deploy of [AWS Lambda](https://aws.amazon.com/lambda/?nc1=h_ls) apps
- [Firebase](https://firebase.google.com): Firebase Firestore is a NoSQL database
- [Nodemailer](https://nodemailer.com): Send emails using Gmail API v1

## Requirements

- Node.js 18.x

In the future, will be developed a Dockerfile to run the project in a container.

## Run guide

1. Clone the repository

```bash
git clone www.github.com/felipemattosv/auth-api
```

2. Install dependencies

```bash
yarn install
```

3. Create a `.env` file in the root of the project with the content specified in the `.env.example` file.

4. Run the project

```bash
yarn dev
```

## Routes available

### Open Routes

<span style="color: yellow;">POST</span> - `auth/Login`: Returns a JWT token if login information is correct

<span style="color: yellow;">POST</span> - `auth/VerifyEmail`: Verify Email to create an account

<span style="color: yellow;">POST</span> - `auth/CreateAccountByUser`: Create an account by user, using the verfification code sent by email

<span style="color: yellow;">POST</span> - `auth/SendRecoveryCode`: Send a recovery code to the user's email

<span style="color: blue;">PUT</span> - `auth/ChangePassword`: Change the user's password, using the recovery code sent by email

<span style="color: blue;">PUT</span> - `auth/UpdateUserInfo`: Change user's info (NEED TOKEN)

### Only-Admin Routes

<span style="color: yellow;">POST</span> - `auth/CreateAccountByAdmin`: Create an account by admin (NEED TOKEN)

<span style="color: green;">GET</span> - `auth/ListUsers`: List all users (NEED TOKEN)

<span style="color: red;">DELETE</span> - `auth/DeleteUser`: Delete user's account (NEED TOKEN)

<span style="color: green;">GET</span> - `auth/GetUserInfo`: Return user's info (NEED TOKEN)

## Folder structure explanation

```plaintext
src
├───controllers         # Contains the controllers of the routes. A controller is responsible for handling the request and returning a response.
├───entities            # Contains the entities of the project. An entity is a type that represents a table in the database.
├───enums               # Contains the enumerations of the project.
├───errors              # Contains the definition of the HTTP errors.
├───firebase            # Contains the Firebase configuration.
├───interfaces          # Contains the interfaces of the project. An interface represents a contract of a service return.
├───libs                # Contains additional libraries and modules used in the project.
├───nodemailer          # Contains the Nodemailer configuration.
├───routes              # Contains the definition of the routes of the project. A route is responsible for receiving the request and calling the controller.
├───schemas             # Contains the schemas of the project. A Schema is used to validate the request body/params.
├───services            # Contains the services of the project. A service is responsible for accessing the database and making external API calls.
└───utils               # Contains the utility functions of the project.
```

![Node.js](https://img.shields.io/badge/-Node.js-8CC84C?style=flat-square&logo=Node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) ![AWS Lambda](https://img.shields.io/badge/-AWS%20Lambda-232F3E?style=flat-square&logo=Amazon%20AWS&logoColor=white) ![Serverless](https://img.shields.io/badge/-Serverless-000000?style=flat-square&logo=Serverless&logoColor=white) ![Google Cloud Console](https://img.shields.io/badge/-Google%20Cloud%20Console-4285F4?style=flat-square&logo=Google%20Cloud&logoColor=white) ![Firebase](https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=black)
