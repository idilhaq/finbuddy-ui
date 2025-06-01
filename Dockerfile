# Dockerfile

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest (for production builds)
COPY . .

# Build production build (only when used)
RUN npm run build

# Install serve globally for prod serve
RUN npm install -g serve

# Expose dev + prod ports
EXPOSE 5173 3000

# Default to prod mode
CMD ["serve", "-s", "dist", "-l", "3000"]
