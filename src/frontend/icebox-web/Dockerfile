# Stage 1: Build the Angular app using Node.js
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build for production
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the compiled app using a lightweight Nginx web server
FROM nginx:alpine AS runtime

# Copy the built files from Stage 1 to Nginx's serving directory
# (Note: Angular 17+ outputs to dist/<project-name>/browser by default)
COPY --from=build /app/dist/icebox-web/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]