FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Reinstall bcrypt in the production container
RUN npm uninstall bcrypt && npm install bcrypt

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Entrypoint of the application
COPY start.sh start.sh

# Make start.sh executable
RUN chmod +x start.sh

# Set the entrypoint to use shell to run start.sh
ENTRYPOINT ["sh", "./start.sh"]

# Command to run the application
CMD ["node", "dist/main"]
