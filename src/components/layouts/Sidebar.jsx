import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, ShieldCheck, FileText, Settings, Users, ScrollText, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const staffLinks = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/eligibility', label: 'Éligibilité', icon: ShieldCheck },
  { to: '/claims', label: 'Demandes', icon: FileText },
];

const adminLinks = [
  { to: '/admin', label: 'Vue admin', icon: LayoutDashboard },
  { to: '/admin/content', label: 'Contenu du site', icon: Settings },
  { to: '/admin/users', label: 'Utilisateurs', icon: Users },
  { to: '/admin/audit-logs', label: "Journal d'audit", icon: ScrollText },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const links = user?.role === 'admin' ? [...staffLinks, ...adminLinks] : staffLinks;

  return (
    <aside className="w-64 min-h-screen bg-aegis-navy text-white flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <span className="text-xl font-bold tracking-tight">Aegis <span className="text-aegis-teal">A.G.I.</span></span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-aegis-blue text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-3 pb-3 text-xs text-slate-400">
          {user?.name} · <span className="uppercase">{user?.role}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium w-full text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
