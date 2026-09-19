import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import api from '../../services/api';

/**
 * TODO backend : exposer GET /api/admin/users (liste) + PATCH /api/admin/users/:id (rôle/actif).
 */
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Utilisateurs</h1>
      <p className="text-slate-500 mb-6">Comptes staff et admin de la clinique.</p>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-aegis-bg text-slate-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Nom</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Rôle</th>
              <th className="px-5 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Chargement…</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                Aucun utilisateur chargé — endpoint <code>/api/admin/users</code> à implémenter.
              </td></tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-t border-aegis-border">
                  <td className="px-5 py-3">{u.name}</td>
                  <td className="px-5 py-3">{u.email}</td>
                  <td className="px-5 py-3 uppercase text-xs font-semibold text-aegis-blue">{u.role}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={u.active ? 'covered' : 'rejected'} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
