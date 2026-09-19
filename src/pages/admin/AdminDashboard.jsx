import { Users, ScrollText, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppLayout from '../../components/layout/AppLayout';

const shortcuts = [
  { to: '/admin/content', label: 'Contenu du site', desc: 'Éditer les textes et sections de la vitrine', icon: Settings },
  { to: '/admin/users', label: 'Utilisateurs', desc: 'Gérer les comptes staff et admin', icon: Users },
  { to: '/admin/audit-logs', label: "Journal d'audit", desc: 'Historique des actions sensibles', icon: ScrollText },
];

export default function AdminDashboard() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Administration</h1>
      <p className="text-slate-500 mb-6">Gestion de la plateforme Aegis A.G.I.</p>

      <div className="grid sm:grid-cols-3 gap-4">
        {shortcuts.map(({ to, label, desc, icon: Icon }) => (
          <Link key={to} to={to} className="card hover:border-aegis-blue/40 transition-colors">
            <Icon className="text-aegis-blue mb-3" size={24} />
            <h3 className="font-semibold text-aegis-navy">{label}</h3>
            <p className="text-sm text-slate-500 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
