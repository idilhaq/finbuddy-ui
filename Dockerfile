# Dockerfile

FROM node:20-alpine

# Accept build-time environment variable from Render
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the source
COPY . .

# Inject the Render env var into a .env.production file for Vite to use
RUN echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}" > .env.production

# Build the Vite app
RUN npm run build

# Install lightweight static file server
RUN npm install -g serve

EXPOSE 5173 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
