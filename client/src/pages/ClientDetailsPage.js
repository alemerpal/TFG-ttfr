import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ClientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading client details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!client) return <div>Client not found.</div>;

  return (
    <div>
      <h1>Client Details</h1>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Role:</strong> {client.role}</p>
      {client.avatar_url && <img src={client.avatar_url} alt="Avatar" width="100" />}
      <br />
      <Link to={`/clients/${client.id}/edit`}>Edit Client</Link>
      {' | '}
      <button onClick={handleDelete}>Delete Client</button>
      {' | '}
      <Link to="/clients">Back to Clients List</Link>
    </div>
  );
}

export default ClientDetailsPage;
