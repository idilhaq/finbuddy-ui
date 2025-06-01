import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';

function App() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">FinBuddy</h1>
        <nav>
          <ul>
            <li className="mb-2"><Link to="/">Dashboard</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
