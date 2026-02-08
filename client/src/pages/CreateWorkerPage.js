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
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
    <div>
      <h1>Create New Worker</h1>
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
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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
        <button type="submit">Create Worker</button>
      </form>
    </div>
  );
}

export default CreateWorkerPage;
