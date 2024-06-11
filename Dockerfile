FROM node:20

WORKDIR /app

COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run the NestJS app
CMD ["npm", "run", "start:dev"]