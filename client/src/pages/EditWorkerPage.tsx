import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface WorkerFormData {
  name: string;
  email: string;
  password?: string;
  avatar_url: string;
  display_name: string;
  description: string;
  phone: string;
}

function EditWorkerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WorkerFormData>({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
    display_name: '',
    description: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/worker-profiles/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setFormData({
          name: data.User.name,
          email: data.User.email,
          password: '', // Don't pre-fill password for security
          avatar_url: data.User.avatar_url,
          display_name: data.display_name,
          description: data.description,
          phone: data.phone,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Only send fields that are being updated, and handle password separately
    const updatePayload: Partial<WorkerFormData> = { ...formData };
    if (!updatePayload.password) {
      delete updatePayload.password; // Don't send empty password
    }

    fetch(`/api/worker-profiles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePayload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error || `HTTP error! status: ${res.status}`); });
        }
        return res.json();
      })
      .then(() => {
        navigate(`/workers/${id}`); // Redirect to worker details page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div className="text-info text-center p-4">Loading worker data...</div>;
  if (error) return <div className="text-error text-center p-4">Error: {error}</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-4 text-center">Edit Worker</h1>
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
                <span className="label-text">New Password (leave blank to keep current):</span>
              </label>
              <input type="password" name="password" placeholder="Leave blank to keep current" className="input input-bordered w-full" value={formData.password} onChange={handleChange} />
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
            <button type="submit" className="btn btn-primary w-full mt-4">Update Worker</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditWorkerPage;