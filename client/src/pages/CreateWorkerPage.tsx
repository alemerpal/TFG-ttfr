import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateWorkerPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
    display_name: '',
    description: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    fetch('/api/worker-profiles', {
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
        navigate(`/workers/${data.workerProfile.id}`); // Redirect to new worker's details page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-4 text-center">Create New Worker</h1>
          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Error: {error}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mt-6 mb-4">User Information</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name:</span>
              </label>
              <input type="text" name="name" placeholder="Worker's Name" className="input input-bordered w-full" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email:</span>
              </label>
              <input type="email" name="email" placeholder="worker@example.com" className="input input-bordered w-full" value={formData.email} onChange={handleChange} required />
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

            <h2 className="text-2xl font-bold mt-6 mb-4">Worker Profile Information</h2>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Display Name:</span>
              </label>
              <input type="text" name="display_name" placeholder="Display Name" className="input input-bordered w-full" value={formData.display_name} onChange={handleChange} required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description (optional):</span>
              </label>
              <textarea name="description" placeholder="A brief description of the worker's services" className="textarea textarea-bordered w-full" value={formData.description} onChange={handleChange} />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Phone (optional):</span>
              </label>
              <input type="text" name="phone" placeholder="e.g., +1234567890" className="input input-bordered w-full" value={formData.phone} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">Create Worker</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkerPage;