const STYLES = {
  covered: 'bg-status-covered/10 text-status-covered',
  not_covered: 'bg-status-rejected/10 text-status-rejected',
  partial: 'bg-status-partial/10 text-status-partial',
  pending: 'bg-status-pending/10 text-status-pending',
  draft: 'bg-status-pending/10 text-status-pending',
  ready: 'bg-aegis-blue/10 text-aegis-blue',
  submitted: 'bg-aegis-teal/10 text-aegis-teal',
  accepted: 'bg-status-covered/10 text-status-covered',
  rejected: 'bg-status-rejected/10 text-status-rejected',
  appealed: 'bg-status-partial/10 text-status-partial',
  paid: 'bg-status-covered/10 text-status-covered',
};

const LABELS = {
  covered: 'Couvert',
  not_covered: 'Non couvert',
  partial: 'Partiel',
  pending: 'En attente',
  draft: 'Brouillon',
  ready: 'Prêt',
  submitted: 'Soumis',
  accepted: 'Accepté',
  rejected: 'Rejeté',
  appealed: 'Contesté',
  paid: 'Payé',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STYLES[status] || STYLES.pending}`}>
      {LABELS[status] || status}
    </span>
  );
}
