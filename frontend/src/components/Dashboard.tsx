import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';
import api from '../api';

interface Task {
  id: number;
  title: string;
  description: string;
  owner_id: number;
}

interface User {
  id: number;
  email: string;
  role: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchTasks();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      navigate('/');
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return toast.error('Title is required');
    
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, { title, description });
        toast.success('Task updated');
        setEditingId(null);
      } else {
        await api.post('/tasks/', { title, description });
        toast.success('Task created');
      }
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'Error saving task');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchTasks();
    } catch (error: any) {
      toast.error('Error deleting task');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container">
      <div className="header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Dashboard</h1>
          {user && (
            <p style={{ color: 'var(--text-secondary)' }}>
              Logged in as {user.email} <span style={{ background: 'rgba(79, 70, 229, 0.2)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', marginLeft: '8px' }}>{user.role}</span>
            </p>
          )}
        </div>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          <LogOut size={16} style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div>
          <div className="glass-panel">
            <h3 style={{ marginBottom: '1.5rem' }}>{editingId ? 'Edit Task' : 'New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Title</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea 
                  className="input-field" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={4}
                  style={{ resize: 'vertical' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary">
                  {editingId ? <Edit size={16} style={{ marginRight: '8px' }} /> : <Plus size={16} style={{ marginRight: '8px' }} />}
                  {editingId ? 'Update' : 'Add'}
                </button>
                {editingId && (
                  <button type="button" className="btn" onClick={() => { setEditingId(null); setTitle(''); setDescription(''); }} style={{ background: 'var(--border-color)', color: 'white' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="task-grid">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <h4 className="task-title">{task.title}</h4>
                <p className="task-desc">{task.description || 'No description'}</p>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="btn btn-sm" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                    <Edit size={14} />
                  </button>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
                No tasks found. Create one to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
