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
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
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
    <div>
      <h1>Create New Client</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
}

export default CreateClientPage;
