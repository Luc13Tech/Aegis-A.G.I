import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import api from '../../services/api';

/**
 * TODO backend : exposer GET/PUT /api/admin/content (collection SiteContent).
 * Cette page suppose une liste de blocs { key, type, value } modifiables un par un,
 * même logique que l'admin de BF IMMO.
 */
export default function ContentEditor() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState(null);

  useEffect(() => {
    api.get('/admin/content')
      .then((res) => setBlocks(res.data))
      .catch(() => setBlocks([]))
      .finally(() => setLoading(false));
  }, []);

  function updateValue(key, value) {
    setBlocks((prev) => prev.map((b) => (b.key === key ? { ...b, value } : b)));
  }

  async function save(key) {
    setSavingKey(key);
    const block = blocks.find((b) => b.key === key);
    try {
      await api.put(`/admin/content/${key}`, { value: block.value });
    } finally {
      setSavingKey(null);
    }
  }

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold text-aegis-navy mb-1">Contenu du site</h1>
      <p className="text-slate-500 mb-6">Modifie les textes de la vitrine sans toucher au code.</p>

      {loading ? (
        <p className="text-slate-400">Chargement…</p>
      ) : blocks.length === 0 ? (
        <div className="card text-slate-400">
          Aucun contenu chargé — endpoint <code>/api/admin/content</code> à implémenter côté backend
          (lecture/écriture de la collection <code>SiteContent</code>).
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.key} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-slate-500">{block.key}</span>
                <button
                  onClick={() => save(block.key)}
                  disabled={savingKey === block.key}
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Save size={14} /> {savingKey === block.key ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
              <textarea
                className="input min-h-[80px]"
                value={typeof block.value === 'string' ? block.value : JSON.stringify(block.value)}
                onChange={(e) => updateValue(block.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
