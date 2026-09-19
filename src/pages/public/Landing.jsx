import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, FileCheck, MessageSquareWarning } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: "Vérification d'éligibilité instantanée",
    desc: "Confirmez la couverture assurance d'un patient avant le rendez-vous.",
  },
  {
    icon: FileCheck,
    title: 'Demandes de remboursement automatisées',
    desc: 'Génération CMS-1500 / UB-04 / X12 837, prêtes à soumettre.',
  },
  {
    icon: Zap,
    title: "Détection d'erreurs avant soumission",
    desc: 'Codes CPT/ICD-10 incohérents, champs manquants — repérés avant rejet.',
  },
  {
    icon: MessageSquareWarning,
    title: 'Lettres de contestation générées par IA',
    desc: 'En cas de rejet, une lettre d\'appel argumentée est proposée automatiquement.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-aegis-bg">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-xl font-bold text-aegis-navy">
          Aegis <span className="text-aegis-blue">A.G.I.</span>
        </span>
        <Link to="/login" className="btn-primary">Espace clinique</Link>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-aegis-navy tracking-tight"
        >
          La facturation médicale, <span className="text-aegis-blue">automatisée et fiable</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto"
        >
          Aegis vérifie l'éligibilité, génère les demandes de remboursement et réduit les rejets d'assurance
          pour les cliniques américaines — de bout en bout.
        </motion.p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card flex gap-4"
          >
            <div className="w-12 h-12 rounded-lg bg-aegis-blue/10 text-aegis-blue flex items-center justify-center shrink-0">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-aegis-navy">{title}</h3>
              <p className="text-sm text-slate-500 mt-1">{desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
