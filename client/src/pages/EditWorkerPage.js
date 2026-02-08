import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditWorkerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // Password update is optional and usually handled separately
    avatar_url: '',
    display_name: '',
    description: '',
    phone: '',
  });
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
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Only send fields that are being updated, and handle password separately
    const updatePayload = { ...formData };
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

  if (loading) return <div>Loading worker data...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Edit Worker</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>User Information</h2>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>New Password (leave blank to keep current):</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Avatar URL (optional):</label>
          <input type="text" name="avatar_url" value={formData.avatar_url} onChange={handleChange} />
        </div>

        <h2>Worker Profile Information</h2>
        <div>
          <label>Display Name:</label>
          <input type="text" name="display_name" value={formData.display_name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description (optional):</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Phone (optional):</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <button type="submit">Update Worker</button>
      </form>
    </div>
  );
}

export default EditWorkerPage;
