import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Connexion impossible');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-aegis-navy flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-2 justify-center mb-8">
          <ShieldCheck className="text-aegis-teal" size={28} />
          <span className="text-2xl font-bold text-white">
            Aegis <span className="text-aegis-teal">A.G.I.</span>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-card space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">Email professionnel</label>
            <input
              type="email"
              required
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@votreclinique.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">Mot de passe</label>
            <input
              type="password"
              required
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-status-rejected">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
