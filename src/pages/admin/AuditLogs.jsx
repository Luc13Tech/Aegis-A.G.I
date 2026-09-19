import { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';

/**
 * TODO backend : exposer GET /api/admin/audit-logs (branché sur auditLog.service.js,
 * déjà présent côté backend — il ne manque que la route + le controller HTTP).
 */
export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Placeholder d'appel — à activer une fois la route backend créée
    setLoading(false);
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Journal d'audit</h1>
      <p className="text-slate-500 mb-6">Traçabilité des actions sensibles (HIPAA) — aucune donnée patient en clair.</p>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-aegis-bg text-slate-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Utilisateur</th>
              <th className="px-5 py-3 font-medium">Action</th>
              <th className="px-5 py-3 font-medium">Ressource</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">Chargement…</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                Aucun log chargé — route <code>GET /api/admin/audit-logs</code> à ajouter.
              </td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-t border-aegis-border">
                  <td className="px-5 py-3">{new Date(log.timestamp).toLocaleString('fr-FR')}</td>
                  <td className="px-5 py-3">{log.user?.name}</td>
                  <td className="px-5 py-3">{log.action}</td>
                  <td className="px-5 py-3">{log.resourceType}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
