import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import api from '../api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);

        const res = await api.post('/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        localStorage.setItem('token', res.data.access_token);
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      } else {
        await api.post('/auth/register', { email, password, role });

        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        const loginRes = await api.post('/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        localStorage.setItem('token', loginRes.data.access_token);
        toast.success('Account created! Welcome to Primetrade AI.');
        navigate('/dashboard');
      }
    } catch (error: any) {
      const detail = error.response?.data?.detail;
      let message = 'An error occurred';
      if (Array.isArray(detail)) {
        message = detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(', ') || message;
      } else if (typeof detail === 'string') {
        message = detail;
      } else if (!error.response) {
        message = 'Cannot reach API. Check VITE_API_URL and backend CORS (FRONTEND_URL on Render).';
      }
      toast.error(message);
    }
  };

  return (
    <div className="auth-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel auth-card"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="auth-title"
        >
          Primetrade AI
        </motion.h2>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="input-group"
          >
            <label className="input-label">Email</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="input-group"
          >
            <label className="input-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingRight: '2.5rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                className="input-group"
              >
                <label className="input-label">Role</label>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: `1px solid ${role === 'user' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: role === 'user' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(3, 7, 18, 0.4)',
                      color: role === 'user' ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: role === 'user' ? 600 : 400,
                      boxShadow: role === 'user' ? 'inset 0 0 0 1px rgba(139, 92, 246, 0.3)' : 'none'
                    }}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: `1px solid ${role === 'admin' ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: role === 'admin' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(3, 7, 18, 0.4)',
                      color: role === 'admin' ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: role === 'admin' ? 600 : 400,
                      boxShadow: role === 'admin' ? 'inset 0 0 0 1px rgba(139, 92, 246, 0.3)' : 'none'
                    }}
                  >
                    Admin
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1.5rem', marginTop: '0.5rem' }}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail('');
                setPassword('');
                setShowPassword(false);
                setRole('user');
              }} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, transition: 'color 0.2s' }}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
}
