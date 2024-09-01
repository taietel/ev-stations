FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Install the app dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the working directory
COPY . .

RUN npm run build

# Run the NestJS app
#CMD ["npm", "run", "start:dev"]
CMD ["node", "dist/apps/api-gateway/main"]
