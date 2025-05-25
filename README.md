# FinBuddy-UI

FinBuddy-UI is the frontend React application for the FinBuddy backend, a personal finance and budgeting tool.

## 🚀 Features
- React + TypeScript + Vite setup
- Tailwind CSS for styling
- shadcn/ui components (optional)
- Axios API service layer to connect to FinBuddy backend
- Dashboard page showing monthly spending and savings progress
- Development proxy setup to bypass CORS

## 🏗 Project Setup

### Prerequisites
- Node.js (LTS recommended, use with `nvm`)
- npm (comes with Node)
- Backend server (FinBuddy) running at `http://localhost:8080`

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Access the app at `http://127.0.0.1:5173`

### Build for Production
```bash
npm run build
```

### Lint Code
```bash
npm run lint
```

## 🌐 API Configuration

Backend API base is set in `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

For local development, Vite’s proxy is set to forward `/api` calls to `http://localhost:8080` to avoid CORS issues.

## 🛠 Technologies Used
- React + Vite + TypeScript
- Tailwind CSS
- Axios
- shadcn/ui (optional components)
- Go backend (FinBuddy API)

## 📦 Git Setup
To initialize the repository:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

✅ Replace `<your-repo-url>` with your GitHub or GitLab repository link.

---

Let me know if you want me to create the `.gitignore` and push-ready setup!
