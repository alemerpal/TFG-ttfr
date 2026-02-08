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
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/clients">Clients</Link>
            </li>
            <li>
              <Link to="/workers">Workers</Link>
            </li>
          </ul>
        </nav>

        <header className="App-header">
          <h1>Welcome to the Full-Stack App</h1>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} /> {/* Simple Home Page */}

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
    </Router>
  );
}

export default App;
