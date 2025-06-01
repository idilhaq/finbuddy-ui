# Makefile

APP_NAME = my-app
DOCKER_IMAGE = $(APP_NAME):latest
CONTAINER_NAME = $(APP_NAME)-container

# Local dev
dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

# Docker build
docker-build:
	docker build -t $(DOCKER_IMAGE) .

# Run production container
docker-run:
	docker run --rm -p 3000:3000 $(DOCKER_IMAGE)

# Run dev container
docker-dev:
	docker run --rm -v $$(pwd):/app -w /app -p 5173:5173 node:20-alpine sh -c "npm install && npm run dev -- --host"

# Docker compose (if you have one)
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

# Clean node_modules + build
clean:
	rm -rf node_modules dist

help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:' Makefile | awk '{print " - " $$1}'

sc-add:
	@read -p "Enter component name: " component; \
	npx shadcn@latest add $$component