# Using Node.js base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install OpenJDK 11
RUN apt-get update && apt-get install -y openjdk-11-jdk && apt-get clean

# Install git, Python, pip, Gradle
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git python3 python3-pip gradle && apt-get clean

# MongoDB setup for MongoDB shell and server
# RUN wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - \
#     && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
#     && apt-get update \
#     && apt-get install -y mongodb-mongosh mongodb-org-server \
#     && apt-get clean

# Npm packages installation
RUN npm install -g cors axios express create-react-app

# Install Flask using pip (optional if you need Python/Flask)
RUN pip3 install flask

# Clean up
RUN rm -rf /var/lib/apt/lists/*

