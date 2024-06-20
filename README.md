# Transactions Web Application

This project is a transactions web application built using ReactJS for the frontend and Spring Boot for the backend. The application includes user registration, login, transaction creation, and transaction management functionalities. It also includes role-based access control for transaction makers and approvers.

## Tech Stack

### Frontend
- ReactJS
- Material-UI (MUI) for UI components
- Axios for API requests

### Backend
- Spring Boot
- Spring Security for authentication and authorization
- JWT (JSON Web Token) for secure authentication
- PostgreSQL as the database
- JPA (Java Persistence API) for ORM

## Database Design

The application uses a PostgreSQL database. Here are the main tables and their fields:

### Users Table
- `id`: Long (Primary Key)
- `username`: String (Unique)
- `password`: String
- `email`: String
- `phone`: String
- `role`: String

### Transactions Table
- `id`: Long (Primary Key)
- `referenceNo`: String
- `toAccountNo`: String
- `toAccountName`: String
- `toAccountBank`: String
- `transferAmount`: Double
- `description`: String
- `status`: String

## Features

1. **User Registration and Login**
   - Secure registration and login with JWT-based authentication.
   
2. **Transaction Overview**
   - View summary of transactions awaiting approval, approved, and rejected.

3. **Transaction Management**
   - Create new transactions.
   - View and manage transactions as a maker or approver.
   - Approvers can approve or reject transactions.

4. **Role-Based Access Control**
   - Different interfaces and functionalities for transaction makers and approvers.

## Setup and Run Locally

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Java 11
- PostgreSQL

### Step-by-Step Guide

1. **Setup PostgreSQL Database**
- Create a new PostgreSQL database, then update application.properties with your credential or import the database from repo(transactions.sql).

2. **Run the Backend**
- Run the backend using this command: 
    ./mvnw spring-boot:run

3. **Run the Frontend**
- Install dependencies using this command:
    npm install
- Run the frontend using this command:
    npm start
