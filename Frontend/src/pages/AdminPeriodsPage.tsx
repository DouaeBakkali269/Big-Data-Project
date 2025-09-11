import { useEffect, useMemo, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { findOverlaps, AcademicPeriod } from '@/config/academicPeriods';
import { fetchPeriods, savePeriodsRemote } from '@/services/periodService';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Save, Plus, X } from 'lucide-react';

// Lightweight local admin page (no auth yet) for adjusting academic period windows.
// Later: protect with real role-based auth.

const emptyNew = (): AcademicPeriod => ({
  id: '',
  year: new Date().getMonth() >= 7 ? `${new Date().getFullYear()}-${new Date().getFullYear()+1}` : `${new Date().getFullYear()-1}-${new Date().getFullYear()}`,
  semester: 'S1',
  order: 1,
  start: '',
  end: '',
  label: ''
});

const AdminPeriodsPage = () => {
  const { toast } = useToast();
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchPeriods();
        setPeriods(data);
      } catch (e: any) {
        setError('Impossible de charger les périodes');
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const [draft, setDraft] = useState<AcademicPeriod | null>(null);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    // ensure sorted
    setPeriods(p => [...p].sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime()));
  }, []);

  const overlaps = useMemo(() => findOverlaps(periods), [periods]);

  const updateField = (id: string, key: keyof AcademicPeriod, value: any) => {
    setPeriods(prev => prev.map(p => p.id === id ? { ...p, [key]: key === 'order' ? Number(value) : value } : p));
  };

  const remove = (id: string) => {
    setPeriods(prev => prev.filter(p => p.id !== id));
  };

  const addNew = () => {
    if (!draft) return;
    if (!draft.id || !draft.start || !draft.end) {
      toast({ title: 'Champs requis', description: 'ID, start et end obligatoires.' });
      return;
    }
    if (periods.some(p => p.id === draft.id)) {
      toast({ title: 'Conflit ID', description: 'Un période avec cet ID existe déjà.' });
      return;
    }
    setPeriods(prev => [...prev, draft]);
    setDraft(null);
    setShowNew(false);
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const saved = await savePeriodsRemote(periods);
      setPeriods(saved);
      toast({ title: 'Périodes enregistrées', description: 'Sauvegarde terminée (remote ou fallback local).' });
    } catch (e) {
      toast({ title: 'Erreur', description: 'Échec de sauvegarde.' });
    } finally {
      setSaving(false);
    }
  };

  // Reset base feature removed per request.

  const invalids = periods.filter(p => !p.start || !p.end || new Date(p.start) > new Date(p.end));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin – Périodes Académiques</h1>
            <p className="text-muted-foreground text-sm">Gérez les fenêtres temporelles (utilisées pour filtrer les modules & la couverture).</p>
          </div>
          <div className="flex gap-2">
            <Button disabled={saving || loading} onClick={saveAll} className="flex items-center gap-1">
              <Save className="w-4 h-4" /> {saving ? 'Sauvegarde…' : 'Enregistrer'}
            </Button>
          </div>
        </div>

        {loading && <div className="text-sm text-muted-foreground mb-6">Chargement des périodes…</div>}
        {error && <div className="text-sm text-destructive mb-6">{error}</div>}

        {(overlaps.length > 0 || invalids.length > 0) && (
          <Card className="border-destructive/40 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-destructive flex items-center gap-2 text-sm"><AlertTriangle className="w-4 h-4" /> Problèmes de Configuration</CardTitle>
              <CardDescription className="text-xs">Corrigez les éléments ci-dessous avant la mise en production.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {overlaps.length > 0 && (
                <div>
                  <strong>Chevauchements:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    {overlaps.map((o,i) => (<li key={i}>{o.a.id} ({o.a.start}→{o.a.end}) ⟂ {o.b.id} ({o.b.start}→{o.b.end})</li>))}
                  </ul>
                </div>
              )}
              {invalids.length > 0 && (
                <div>
                  <strong>Dates invalides:</strong> {invalids.map(p => p.id).join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Périodes</CardTitle>
            <CardDescription className="text-xs">Éditez dans le tableau. Les changements sont locaux jusqu'à Enregistrer.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Année</th>
                    <th className="py-2 pr-4">Semestre</th>
                    <th className="py-2 pr-4">Ordre</th>
                    <th className="py-2 pr-4">Début</th>
                    <th className="py-2 pr-4">Fin</th>
                    <th className="py-2 pr-4">Label</th>
                    <th className="py-2 pr-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {periods.map(p => (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="py-1 pr-2 min-w-[120px]">
                        <Input value={p.id} onChange={e => updateField(p.id, 'id', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2">
                        <Input value={p.year} onChange={e => updateField(p.id, 'year', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2">
                        <Select value={p.semester} onValueChange={v => updateField(p.id, 'semester', v)}>
                          <SelectTrigger className="h-7 text-xs w-[90px]"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="S1">S1</SelectItem>
                            <SelectItem value="S2">S2</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-1 pr-2 w-[70px]">
                        <Input type="number" value={p.order} onChange={e => updateField(p.id, 'order', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2">
                        <Input type="date" value={p.start} onChange={e => updateField(p.id, 'start', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2">
                        <Input type="date" value={p.end} onChange={e => updateField(p.id, 'end', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2 min-w-[160px]">
                        <Input value={p.label} onChange={e => updateField(p.id, 'label', e.target.value)} className="h-7 text-xs" />
                      </td>
                      <td className="py-1 pr-2 text-right">
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-destructive" onClick={() => remove(p.id)}><X className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!showNew && (
              <Button size="sm" variant="secondary" className="mt-4 flex items-center gap-1" onClick={() => { setShowNew(true); setDraft(emptyNew()); }}>
                <Plus className="w-4 h-4" /> Nouvelle Période
              </Button>
            )}
            {showNew && draft && (
              <div className="mt-4 border rounded-md p-4 space-y-2 bg-muted/30">
                <div className="grid md:grid-cols-3 gap-3">
                  <Input placeholder="ID (ex: 2026-p1)" value={draft.id} onChange={e => setDraft(d => d && ({ ...d, id: e.target.value }))} />
                  <Input placeholder="Année (2026-2027)" value={draft.year} onChange={e => setDraft(d => d && ({ ...d, year: e.target.value }))} />
                  <Select value={draft.semester} onValueChange={v => setDraft(d => d && ({ ...d, semester: v as 'S1'|'S2' }))}>
                    <SelectTrigger><SelectValue placeholder="Semestre" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-4 gap-3">
                  <Input type="number" placeholder="Ordre" value={draft.order} onChange={e => setDraft(d => d && ({ ...d, order: Number(e.target.value) }))} />
                  <Input type="date" value={draft.start} onChange={e => setDraft(d => d && ({ ...d, start: e.target.value }))} />
                  <Input type="date" value={draft.end} onChange={e => setDraft(d => d && ({ ...d, end: e.target.value }))} />
                  <Input placeholder="Label" value={draft.label} onChange={e => setDraft(d => d && ({ ...d, label: e.target.value }))} />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => { setShowNew(false); setDraft(null); }}>Annuler</Button>
                  <Button size="sm" onClick={addNew}>Ajouter</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Aide / Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2 text-muted-foreground">
            <p>• Les périodes actives déterminent quels modules apparaissent dans la couverture et la création de session.</p>
            <p>• En production: cette page devra être protégée (auth + rôle Admin).</p>
            <p>• Les conflits et chevauchements doivent être résolus avant d'étendre la logique à un backend.</p>
            <p>• Les modifications sont stockées localement (localStorage) tant qu'aucun backend n'est branché.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPeriodsPage;
