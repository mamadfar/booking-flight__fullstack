# Use a Node.js base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to /app
COPY . .

# Build the application
RUN npm run build

# Set the command to run when the container starts
CMD ["npm", "start"]
