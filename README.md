# FinBuddy-UI

FinBuddy-UI is the frontend React application for the [FinBuddy backend](https://github.com/idilhaq/finbuddy), a personal finance and budgeting tool.

## 🚀 Features
- React + TypeScript + Vite setup
- Tailwind CSS for styling
- shadcn/ui components (optional)
- Axios API service layer to connect to [FinBuddy backend](https://github.com/idilhaq/finbuddy)
- Dashboard page showing monthly spending and savings progress
- Docker setup for containerized frontend builds
- Support for CORS configuration on backend and frontend separation

## 🏗 Project Setup

### Prerequisites
- Node.js (LTS recommended, use with `nvm`)
- npm (comes with Node)
- Docker & Docker Compose (for containerized setup)
- Backend server (FinBuddy) running and accessible (can be external or Dockerized)

### Install Dependencies (Local Dev)
```bash
npm install
```

### Run Development Server (with Vite Proxy)
```bash
npm run dev
```
Access the app at `http://127.0.0.1:5173`

### Build for Production
```bash
npm run build
```

### Run with Docker (Frontend Only)
```bash
docker build --build-arg VITE_API_BASE_URL=http://host.docker.internal:3000/api -t finbuddy-ui-frontend .
docker run -p 8081:80 finbuddy-ui-frontend
```
Access the app at `http://localhost:8081`

### Run with Docker Compose (Frontend Only)
```bash
docker-compose up --build
```

### Lint Code
```bash
npm run lint
```

## 🌐 API Configuration

Backend API base is set in `.env` (for local dev):
```
VITE_API_BASE_URL=/api
```

For production builds (Docker), it is passed as a build argument:
```
docker build --build-arg VITE_API_BASE_URL=http://host.docker.internal:3000/api ...
```

✅ Ensure your backend has proper CORS headers set (for example, using Gin’s CORS middleware) when accessed from the frontend container.

## 🛠 Technologies Used
- React + Vite + TypeScript
- Tailwind CSS
- Axios
- shadcn/ui (optional components)
- [Go backend (FinBuddy API)](https://github.com/idilhaq/finbuddy)
- Docker & Docker Compose