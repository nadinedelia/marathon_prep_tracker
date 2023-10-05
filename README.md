# MERN Fitness Tracker

A simple and interactive fitness tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to track their exercises and monitor their progress over time.

![Application Screenshot](frontpage.png)  

## Features

- User registration for personalized tracking
- Log various types of exercises with descriptions, duration, and date
- Interactive UI with Material-UI components
- Real-time data persistence with MongoDB

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Local Development

### Clone the repository

```sh
git clone git@github.com:nadinedelia/mern-fitnessapp.git
cd mern-fitnesstracker
```

### Install dependencies

```sh
cd backend
npm install
cd ../frontend
npm install
```

### Start the development servers

```sh
cd backend
nodemon server
cd ../frontend
npm start
```

### Deployment
The application is containerized using Docker and can be deployed on any platform that supports Docker containers. For AWS deployment, a GitHub Actions pipeline is configured for CI/CD.

### Building with Docker

```
docker-compose up
```
