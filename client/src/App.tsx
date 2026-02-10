import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Client Pages
import ClientListPage from './pages/ClientListPage';
import ClientDetailsPage from './pages/ClientDetailsPage';
import CreateClientPage from './pages/CreateClientPage';
import EditClientPage from './pages/EditClientPage';

// Worker Pages
import WorkerListPage from './pages/WorkerListPage';
import WorkerDetailsPage from './pages/WorkerDetailsPage';
import CreateWorkerPage from './pages/CreateWorkerPage';
import EditWorkerPage from './pages/EditWorkerPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-base-200">
        <nav className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost normal-case text-xl">My App</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/" className="btn btn-ghost">Home</Link></li>
              <li><Link to="/clients" className="btn btn-ghost">Clients</Link></li>
              <li><Link to="/workers" className="btn btn-ghost">Workers</Link></li>
            </ul>
          </div>
        </nav>

        <header className="App-header">
          <h1>Welcome to the Full-Stack App</h1>
          <button className="btn btn-primary">DaisyUI Button</button>
        </header>

        <div className="container mx-auto p-4">
          <main>
            <Routes>
              <Route path="/" element={<h2 className="text-2xl font-bold mb-4">Home Page</h2>} /> {/* Simple Home Page */}

              {/* Client Routes */}
              <Route path="/clients" element={<ClientListPage />} />
              <Route path="/clients/new" element={<CreateClientPage />} />
              <Route path="/clients/:id" element={<ClientDetailsPage />} />
              <Route path="/clients/:id/edit" element={<EditClientPage />} />

              {/* Worker Routes */}
              <Route path="/workers" element={<WorkerListPage />} />
              <Route path="/workers/new" element={<CreateWorkerPage />} />
              <Route path="/workers/:id" element={<WorkerDetailsPage />} />
              <Route path="/workers/:id/edit" element={<EditWorkerPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;