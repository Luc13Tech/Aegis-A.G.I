import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import api from '../../services/api';

export default function Eligibility() {
  const [patientId, setPatientId] = useState('');
  const [policyId, setPolicyId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCheck(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const { data } = await api.post('/eligibility/check', { patientId, policyId });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la vérification');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Vérification d'éligibilité</h1>
      <p className="text-slate-500 mb-6">Confirmez la couverture assurance d'un patient avant le rendez-vous.</p>

      <div className="grid lg:grid-cols-2 gap-6">
        <form onSubmit={handleCheck} className="card space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">ID Patient</label>
            <input className="input" value={patientId} onChange={(e) => setPatientId(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 mb-1 block">ID Police d'assurance</label>
            <input className="input" value={policyId} onChange={(e) => setPolicyId(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-status-rejected">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
            <ShieldCheck size={18} />
            {loading ? 'Vérification…' : 'Vérifier'}
          </button>
        </form>

        {result && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-aegis-navy">Résultat</h2>
              <StatusBadge status={result.status} />
            </div>
            <dl className="space-y-2 text-sm">
              {result.copay !== undefined && (
                <div className="flex justify-between"><dt className="text-slate-500">Copay</dt><dd>${result.copay}</dd></div>
              )}
              {result.coinsurance !== undefined && (
                <div className="flex justify-between"><dt className="text-slate-500">Coassurance</dt><dd>{result.coinsurance}%</dd></div>
              )}
              {result.deductibleRemaining !== undefined && (
                <div className="flex justify-between"><dt className="text-slate-500">Franchise restante</dt><dd>${result.deductibleRemaining}</dd></div>
              )}
              {result.notes && (
                <div className="pt-2 border-t border-aegis-border text-slate-500">{result.notes}</div>
              )}
            </dl>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
