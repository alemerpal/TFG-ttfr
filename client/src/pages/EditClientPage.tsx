import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ClientFormData {
  name: string;
  email: string;
  password?: string; // Password update is optional and usually handled separately
  avatar_url: string;
  role: string;
}

function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    password: '',
    avatar_url: '',
    role: 'CLIENT',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setFormData({
          name: data.name,
          email: data.email,
          password: '', // Don't pre-fill password for security
          avatar_url: data.avatar_url,
          role: data.role,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Only send fields that are being updated, and handle password separately
    const updatePayload: Partial<ClientFormData> = { ...formData };
    if (!updatePayload.password) {
      delete updatePayload.password; // Don't send empty password
    }

    fetch(`/api/users/${id}`, {
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
        navigate(`/clients/${id}`); // Redirect to client details page
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (loading) return <div className="text-info text-center p-4">Loading client data...</div>;
  if (error) return <div className="text-error text-center p-4">Error: {error}</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-4 text-center">Edit Client</h1>
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
            <button type="submit" className="btn btn-primary w-full mt-4">Update Client</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditClientPage;