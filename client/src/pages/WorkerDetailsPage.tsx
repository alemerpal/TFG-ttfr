import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  avatar_url?: string;
}

interface Worker {
  id: number;
  display_name: string;
  description: string;
  phone?: string;
  User: User;
}

function WorkerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

  if (loading) return <div className="text-info text-center p-4">Loading worker details...</div>;
  if (error) return <div className="text-error text-center p-4">Error: {error.message}</div>;
  if (!worker) return <div className="text-warning text-center p-4">Worker not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Worker Details</h1>
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          {worker.User && (
            <>
              <h2 className="card-title">{worker.User.name}</h2>
              <p><strong>Email:</strong> {worker.User.email}</p>
              {worker.User.avatar_url && (
                <div className="avatar">
                  <div className="w-24 mask mask-squircle">
                    <img src={worker.User.avatar_url} alt="Avatar" />
                  </div>
                </div>
              )}
            </>
          )}
          <p><strong>Display Name:</strong> {worker.display_name}</p>
          <p><strong>Description:</strong> {worker.description}</p>
          <p><strong>Phone:</strong> {worker.phone || 'N/A'}</p>
          <div className="card-actions justify-end mt-4">
            <Link to={`/workers/${worker.id}/edit`} className="btn btn-secondary">Edit Worker</Link>
            <button onClick={handleDelete} className="btn btn-error">Delete Worker</button>
            <Link to="/workers" className="btn btn-ghost">Back to Workers List</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerDetailsPage;