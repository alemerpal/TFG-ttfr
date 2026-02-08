import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WorkerListPage() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading workers...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Workers</h1>
      <Link to="/workers/new">Create New Worker</Link>
      <ul>
        {workers.map((worker) => (
          <li key={worker.id}>
            <Link to={`/workers/${worker.id}`}>
              {worker.display_name} ({worker.User.email})
            </Link>
            {' | '}
            <Link to={`/workers/${worker.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerListPage;
