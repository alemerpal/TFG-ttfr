import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Client {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
}

function ClientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.role !== 'CLIENT') {
          throw new Error('User is not a client.');
        }
        setClient(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          navigate('/clients'); // Redirect to client list after deletion
        })
        .catch((err) => {
          console.error('Error deleting client:', err);
          alert('Failed to delete client.');
        });
    }
  };

  if (loading) return <div className="text-info text-center p-4">Loading client details...</div>;
  if (error) return <div className="text-error text-center p-4">Error: {error.message}</div>;
  if (!client) return <div className="text-warning text-center p-4">Client not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Details</h1>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          <h2 className="card-title">{client.name}</h2>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Role:</strong> {client.role}</p>
          {client.avatar_url && (
            <div className="avatar">
              <div className="w-24 mask mask-squircle">
                <img src={client.avatar_url} alt="Avatar" />
              </div>
            </div>
          )}
          <div className="card-actions justify-end mt-4">
            <Link to={`/clients/${client.id}/edit`} className="btn btn-secondary">Edit Client</Link>
            <button onClick={handleDelete} className="btn btn-error">Delete Client</button>
            <Link to="/clients" className="btn btn-ghost">Back to Clients List</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPage;