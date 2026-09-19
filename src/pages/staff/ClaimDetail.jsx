import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Send, RefreshCw } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import api from '../../services/api';

export default function ClaimDetail() {
  const { id } = useParams();
  const [claim, setClaim] = useState(null);
  const [errors, setErrors] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function load() {
    const { data } = await api.get(`/claims/${id}`);
    setClaim(data.claim);
    setErrors(data.errors || []);
  }

  useEffect(() => { load(); }, [id]);

  async function revalidate() {
    setBusy(true);
    setMessage('');
    try {
      const { data } = await api.post(`/claims/${id}/revalidate`);
      setClaim(data.claim);
      setErrors(data.errors || []);
      setMessage('Revalidation effectuée.');
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    setBusy(true);
    setMessage('');
    try {
      const { data } = await api.post(`/claims/${id}/submit`);
      setClaim(data.claim);
      setMessage('Demande soumise avec succès.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Échec de la soumission');
    } finally {
      setBusy(false);
    }
  }

  if (!claim) return <AppLayout><p className="text-slate-500">Chargement…</p></AppLayout>;

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold text-aegis-navy">Demande {claim._id?.slice(-6)}</h1>
        <StatusBadge status={claim.status} />
      </div>
      <p className="text-slate-500 mb-6">{claim.format} · ${claim.billedAmount}</p>

      {errors.length > 0 && (
        <div className="card mb-6 border-status-partial/30">
          <div className="flex items-center gap-2 mb-3 text-status-partial font-semibold">
            <AlertTriangle size={18} />
            {errors.length} erreur(s) détectée(s)
          </div>
          <ul className="space-y-2 text-sm">
            {errors.map((e) => (
              <li key={e._id || e.field} className="flex justify-between">
                <span className="text-slate-600">{e.message}</span>
                <span className={e.severity === 'blocking' ? 'text-status-rejected' : 'text-status-partial'}>
                  {e.severity === 'blocking' ? 'Bloquant' : 'Avertissement'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3 mb-6">
        <button onClick={revalidate} disabled={busy} className="btn-secondary flex items-center gap-2">
          <RefreshCw size={16} /> Revalider
        </button>
        <button
          onClick={submit}
          disabled={busy || claim.status !== 'ready'}
          className="btn-primary flex items-center gap-2"
        >
          <Send size={16} /> Soumettre
        </button>
      </div>

      {message && <p className="text-sm text-slate-500 mb-6">{message}</p>}

      <div className="card">
        <h2 className="font-semibold text-aegis-navy mb-3">Codes</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500 mb-1">CPT</p>
            <ul className="space-y-1">
              {claim.cptCodes?.map((c, i) => <li key={i}>{c.code} × {c.units || 1}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-slate-500 mb-1">ICD-10</p>
            <ul className="space-y-1">
              {claim.icd10Codes?.map((c, i) => <li key={i}>{c.code}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
