# #selecting a base image
# FROM node:14-alpine

# #setting up working directory for further instruction execution.
# WORKDIR /c/Users/ahmad.zafar1/Desktop/JAZZER-UI

# #copying files from local dir to image directory
# COPY . .     

# #exposing application port 4200
# EXPOSE 4200

# #execute command when container is running
# # CMD ["ng" , "s"]
# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Selecting a base image
FROM node:16-alpine

# Setting up the working directory within the container
WORKDIR /app

# Copying files from the local directory to the image directory
COPY . /app/

# Exposing application port 4200
EXPOSE 4200

# Execute the command when the container is running

# RUN npm install

# Execute the command when the container is running
# CMD ["npm", "run", "start"]
# CMD ["npm", "run", "start", "-H", "0.0.0.0"]
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

