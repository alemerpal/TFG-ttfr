import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function WorkerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/worker-profiles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWorker(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this worker profile and associated user?')) {
      fetch(`/api/worker-profiles/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          navigate('/workers'); // Redirect to worker list after deletion
        })
        .catch((err) => {
          console.error('Error deleting worker profile:', err);
          alert('Failed to delete worker profile.');
        });
    }
  };

  if (loading) return <div>Loading worker details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!worker) return <div>Worker not found.</div>;

  return (
    <div>
      <h1>Worker Details</h1>
      {worker.User && (
        <>
          <p><strong>Name:</strong> {worker.User.name}</p>
          <p><strong>Email:</strong> {worker.User.email}</p>
          {worker.User.avatar_url && <img src={worker.User.avatar_url} alt="Avatar" width="100" />}
        </>
      )}
      <p><strong>Display Name:</strong> {worker.display_name}</p>
      <p><strong>Description:</strong> {worker.description}</p>
      <p><strong>Phone:</strong> {worker.phone || 'N/A'}</p>
      <br />
      <Link to={`/workers/${worker.id}/edit`}>Edit Worker</Link>
      {' | '}
      <button onClick={handleDelete}>Delete Worker</button>
      {' | '}
      <Link to="/workers">Back to Workers List</Link>
    </div>
  );
}

export default WorkerDetailsPage;
