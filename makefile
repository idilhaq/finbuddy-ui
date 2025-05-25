# Makefile for FinBuddy-UI

# Variables
APP_NAME = finbuddy-ui

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Preview production build
preview:
	npm run preview

# Lint project
lint:
	npm run lint

# Clean node_modules and reinstall clean
clean:
	rm -rf node_modules package-lock.json
	npm install

# Run using Vite proxy with env
start-proxy:
	VITE_API_BASE_URL=http://localhost:8080/api npm run dev
