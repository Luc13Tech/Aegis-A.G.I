import { useEffect, useState } from 'react';
import { FileText, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import StatCard from '../../components/ui/StatCard';
import api from '../../services/api';

export default function Dashboard() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    api.get('/health').then((res) => setHealth(res.data)).catch(() => setHealth(null));
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Tableau de bord</h1>
      <p className="text-slate-500 mb-6">
        Vue d'ensemble de l'activité de facturation.
        {health?.status === 'ok' && <span className="text-status-covered ml-2">● Backend connecté</span>}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Éligibilités vérifiées (7j)" value="—" icon={ShieldCheck} />
        <StatCard label="Demandes en cours" value="—" icon={FileText} accent="text-aegis-teal" />
        <StatCard label="Erreurs à corriger" value="—" icon={AlertTriangle} accent="text-status-partial" />
        <StatCard label="En attente de statut" value="—" icon={Clock} accent="text-status-pending" />
      </div>

      <div className="card">
        <h2 className="font-semibold text-aegis-navy mb-2">Prochaine étape</h2>
        <p className="text-sm text-slate-500">
          Les compteurs ci-dessus se connecteront aux endpoints <code>/claims</code> et{' '}
          <code>/eligibility</code> une fois les listes paginées ajoutées côté backend.
        </p>
      </div>
    </AppLayout>
  );
}
