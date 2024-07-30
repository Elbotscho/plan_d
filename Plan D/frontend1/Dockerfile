# Stage 1: Build the Angular application
FROM node:20.15.1 AS build 

# Set the working directory
WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.8.2

RUN npm install

COPY . .

# Build the Angular application

RUN npm run build 

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf 

# Copy the build output to replace the default Nginx contents
COPY --from=build /app/dist/frontend1 /usr/share/nginx/html

COPY --from=build /app/dist/frontend1/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]