import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateClientPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
    role: 'CLIENT', // Default role for client creation
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error || `HTTP error! status: ${res.status}`); });
        }
        return res.json();
      })
      .then((data) => {
        navigate(`/clients/${data.id}`); // Redirect to new client's details page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-4 text-center">Create New Client</h1>
          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error: {error}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input type="text" name="name" placeholder="Client Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input type="email" name="email" placeholder="client@example.com" className="input input-bordered w-full" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input type="password" name="password" placeholder="********" className="input input-bordered w-full" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Avatar URL (optional):</span>
              </label>
              <input type="text" name="avatar_url" placeholder="https://example.com/avatar.jpg" className="input input-bordered w-full" value={formData.avatar_url} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">Create Client</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateClientPage;