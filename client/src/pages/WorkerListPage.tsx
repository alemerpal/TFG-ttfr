import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  email: string;
}

interface Worker {
  id: number;
  display_name: string;
  User: User;
}

function WorkerListPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/api/worker-profiles')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWorkers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-info">Loading workers...</div>;
  if (error) return <div className="text-error">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Workers</h1>
      <div className="mb-4">
        <Link to="/workers/new" className="btn btn-primary">Create New Worker</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Display Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.display_name}</td>
                <td>{worker.User.email}</td>
                <td>
                  <Link to={`/workers/${worker.id}`} className="btn btn-ghost btn-sm">Details</Link>
                  <Link to={`/workers/${worker.id}/edit`} className="btn btn-ghost btn-sm ml-2">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WorkerListPage;