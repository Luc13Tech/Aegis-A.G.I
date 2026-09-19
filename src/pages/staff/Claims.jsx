import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';

/**
 * TODO backend : ajouter GET /api/claims (liste paginée, filtrable par statut/patient)
 * pour remplacer ce tableau statique par de vraies données.
 */
export default function Claims() {
  const [claims] = useState([]);

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-aegis-navy">Demandes de remboursement</h1>
          <p className="text-slate-500">Suivi des claims en cours et de leur statut.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Nouvelle demande
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-aegis-bg text-slate-500 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Format</th>
              <th className="px-5 py-3 font-medium">Montant</th>
              <th className="px-5 py-3 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody>
            {claims.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  Aucune demande pour l'instant — endpoint de liste à connecter côté backend.
                </td>
              </tr>
            ) : (
              claims.map((c) => (
                <tr key={c._id} className="border-t border-aegis-border hover:bg-aegis-bg">
                  <td className="px-5 py-3">
                    <Link to={`/claims/${c._id}`} className="text-aegis-blue font-medium">
                      {c._id.slice(-6)}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{c.format}</td>
                  <td className="px-5 py-3">${c.billedAmount}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
