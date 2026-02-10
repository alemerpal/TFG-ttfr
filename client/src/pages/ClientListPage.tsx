import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  email: string;
  role: string;
}

function ClientListPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
        setClients(data.filter((user: Client) => user.role === 'CLIENT'));
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-info">Loading clients...</div>;
  if (error) return <div className="text-error">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Clients</h1>
      <div className="mb-4">
        <Link to="/clients/new" className="btn btn-primary">Create New Client</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>
                  <Link to={`/clients/${client.id}`} className="btn btn-ghost btn-sm">Details</Link>
                  <Link to={`/clients/${client.id}/edit`} className="btn btn-ghost btn-sm ml-2">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientListPage;
