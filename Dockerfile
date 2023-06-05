# Use an existing docker image as a base
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Copy the rest of the code
COPY ./ ./

# Command to start the app
CMD ["npm", "start"]
