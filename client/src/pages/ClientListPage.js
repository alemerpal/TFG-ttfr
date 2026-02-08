import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ClientListPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Filter for users with role 'CLIENT'
        setClients(data.filter(user => user.role === 'CLIENT'));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading clients...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Clients</h1>
      <Link to="/clients/new">Create New Client</Link>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link to={`/clients/${client.id}`}>{client.name} ({client.email})</Link>
            {' | '}
            <Link to={`/clients/${client.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientListPage;
