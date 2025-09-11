import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Video, Upload, Zap, Award, Star, ChevronRight, ArrowLeft, MessageSquare, Clock, User as UserIcon, Calendar, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

const ElementDetailsPage = () => {
  const { year, major, level, module, element } = useParams();
  const navigate = useNavigate();

  // Dummy data for Lassqat uploads and ratings
  type PdfItem = { type: 'PDF'; title: string; uploader: string; year: number; rating?: number };
  type VideoItem = { type: 'Video'; title: string; uploader: string; year: number; length: string; rating?: number };
  const rawUploads: Array<PdfItem | VideoItem> = [
    { type: 'PDF', title: 'Résumé - ' + element, uploader: 'Student A', year: 2025, rating: 4.5 },
    { type: 'Video', title: 'Session Enregistrée', uploader: 'Student B', year: 2024, length: '1h 12m', rating: 4.8 },
    { type: 'PDF', title: 'Formulaire d’examens corrigés', uploader: 'Student E', year: 2023, rating: 4.6 },
    { type: 'Video', title: 'Explication Chapitre 2', uploader: 'Prof. Karim', year: 2025, length: '36m', rating: 4.9 }
  ];
  const uploads = useMemo(() => [...rawUploads].sort((a, b) => b.year - a.year), [element]);
  const pdfs = useMemo(() => uploads.filter(u => u.type === 'PDF') as PdfItem[], [uploads]);
  const videos = useMemo(() => uploads.filter(u => u.type === 'Video') as VideoItem[], [uploads]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [element]);

  // Track recently viewed elements
  useEffect(() => {
    try {
      const key = 'recentlyViewed';
      const to = `/element/${year}/${major}/${level}/${module}/${element}`;
      const title = `${module}`;
      const entry = { id: `${year}-${major}-${level}-${module}-${element}`, title, module: String(module), element: String(element), when: new Date().toISOString(), to };
      const raw = localStorage.getItem(key);
      const arr = raw ? (JSON.parse(raw) as typeof entry[]) : [];
      const dedup = [entry, ...arr.filter(e => e.id !== entry.id)].slice(0, 20);
      localStorage.setItem(key, JSON.stringify(dedup));
    } catch {}
  }, [year, major, level, module, element]);

  // AI-generated flashcards and QCM/Q&A (placeholder until backend integration)
  type Deck = { id: string; title: string; cardCount: number; difficulty: 'Facile' | 'Intermédiaire' | 'Difficile'; updated: string };
  type Quiz = { id: string; title: string; questions: number; difficulty: 'Facile' | 'Intermédiaire' | 'Difficile'; estTime: string; updated: string };
  const flashcardDecks: Deck[] = useMemo(() => ([
    { id: 'd1', title: `Concepts clés — ${element}`, cardCount: 24, difficulty: 'Intermédiaire', updated: '2025' },
    { id: 'd2', title: `Définitions & Formules`, cardCount: 18, difficulty: 'Facile', updated: '2025' },
  ]), [element]);
  const qcmSets: Quiz[] = useMemo(() => ([
    { id: 'q1', title: `QCM — ${element}: Chapitre 1`, questions: 12, difficulty: 'Facile', estTime: '10 min', updated: '2025' },
    { id: 'q2', title: `Q&A — Problèmes fréquents`, questions: 8, difficulty: 'Intermédiaire', estTime: '12 min', updated: '2024' },
  ]), [element]);
  const [videoComments, setVideoComments] = useState<{ user: string; text: string; at: string }[]>([
    { user: 'Member C', text: 'Très utile !', at: '2025-06-01' },
    { user: 'Member D', text: 'Bon résumé.', at: '2025-06-02' }
  ]);
  const [newVideoComment, setNewVideoComment] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb (remove promo & major) */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background/60 border border-border px-3 py-2 rounded-full backdrop-blur-sm">
            <button onClick={() => navigate(-1)} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-foreground cursor-default">{level}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-foreground cursor-default">{module}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{element}</span>
          </div>
        </div>

  {/* Header removed as requested */}

        {/* Tabs */}
        <Tabs defaultValue="summaries" className="w-full">
          <TabsList className="flex flex-nowrap overflow-x-auto no-scrollbar gap-2 bg-background/60 border border-border p-1.5 rounded-xl sticky top-20 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/50 shadow-sm">
            <TabsTrigger value="summaries" className="rounded-lg px-3 py-2 transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground inline-flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Résumés</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-primary/15 text-foreground/80">{pdfs.length}</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="rounded-lg px-3 py-2 transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground inline-flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Vidéos</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-primary/15 text-foreground/80">{videos.length}</span>
            </TabsTrigger>
            <TabsTrigger value="flashcards" className="rounded-lg px-3 py-2 transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground inline-flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Flashcards</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-primary/15 text-foreground/80">{flashcardDecks.length}</span>
            </TabsTrigger>
            <TabsTrigger value="qcm" className="rounded-lg px-3 py-2 transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 data-[state=active]:bg-primary/10 data-[state=active]:text-foreground inline-flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>pratiquez des QCM/Q&A</span>
              <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded-full bg-primary/15 text-foreground/80">{qcmSets.length}</span>
            </TabsTrigger>
          </TabsList>

          {/* Summaries (PDFs) */}
          <TabsContent value="summaries">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Résumés</CardTitle>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" /> Uploader un PDF
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-16 h-16 rounded-md" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-2 w-1/2" />
                          </div>
                          <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {pdfs.map((l, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 transition flex gap-3">
                        <div className="w-20 h-16 rounded-md bg-gradient-to-br from-primary/20 to-rose-500/20 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium leading-snug">{l.title}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                <span className="inline-flex items-center gap-1"><UserIcon className="w-3.5 h-3.5" /> {l.uploader}</span>
                                <Badge variant="secondary" className="h-5 px-1.5 inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {l.year}</Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="secondary" className="shrink-0">
                              Voir <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                          <div className="mt-3">
                            <Progress value={70} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos */}
          <TabsContent value="videos">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl flex items-center gap-2"><Video className="w-5 h-5 text-primary" /> Vidéos</CardTitle>
                <Button size="sm" variant="outline">
                  <Upload className="w-4 h-4 mr-2" /> Uploader une Vidéo
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-28 h-16 rounded-md" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-1/3" />
                            <Skeleton className="h-2 w-1/2" />
                          </div>
                          <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {videos.map((l, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 transition flex gap-3">
                        <div className="w-28 h-16 rounded-md bg-black/10 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-rose-500/20" />
                          <Play className="absolute w-6 h-6 text-white/90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-medium leading-snug">{l.title}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                                <span className="inline-flex items-center gap-1"><UserIcon className="w-3.5 h-3.5" /> {l.uploader}</span>
                                <Badge variant="secondary" className="h-5 px-1.5 inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {l.year}</Badge>
                                <Badge variant="secondary" className="h-5 px-1.5 inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {l.length}</Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="secondary" className="shrink-0">
                              Lire <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                          <div className="mt-3">
                            <Progress value={45} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {!loading && (
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Commentaires</h4>
                      <Badge variant="secondary">{videoComments.length}</Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      {videoComments.length === 0 && (
                        <div className="text-sm text-muted-foreground">Aucun commentaire pour l’instant.</div>
                      )}
                      {videoComments.map((c, i) => (
                        <div key={i} className="p-3 rounded-md border border-border bg-background/50">
                          <div className="text-sm font-medium">{c.user}</div>
                          <div className="text-xs text-muted-foreground">{c.at}</div>
                          <div className="text-sm mt-1">{c.text}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Textarea value={newVideoComment} onChange={(e) => setNewVideoComment(e.target.value)} placeholder="Écrire un commentaire…" className="mb-2" />
                      <div className="flex justify-end">
                        <Button size="sm" onClick={() => { if (!newVideoComment.trim()) return; setVideoComments([{ user: 'Moi', text: newVideoComment.trim(), at: new Date().toLocaleDateString('fr-FR') }, ...videoComments]); setNewVideoComment(''); }}>Publier</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Flashcards (IA generation entry) */}
          <TabsContent value="flashcards">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Flashcards</CardTitle>
                <CardDescription>Jeux de cartes générés par IA pour {element}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {flashcardDecks.map(deck => (
                    <div key={deck.id} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{deck.title}</span>
                        <Badge variant="secondary">{deck.updated}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <Badge variant="secondary" className="h-5 px-1.5">{deck.cardCount} cartes</Badge>
                        <Badge variant="secondary" className="h-5 px-1.5">{deck.difficulty}</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm">Étudier</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QCM/Q&A practice */}
          <TabsContent value="qcm">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Award className="w-5 h-5 text-primary" /> QCM / Q&A</CardTitle>
                <CardDescription>Séries de questions générées par IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {qcmSets.map(set => (
                    <div key={set.id} className="p-4 border border-border rounded-xl bg-background/60 backdrop-blur-sm hover:shadow-md transition flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{set.title}</span>
                          <Badge variant="secondary">{set.updated}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <Badge variant="secondary" className="h-5 px-1.5">{set.questions} questions</Badge>
                          <Badge variant="secondary" className="h-5 px-1.5">{set.difficulty}</Badge>
                          <Badge variant="secondary" className="h-5 px-1.5">{set.estTime}</Badge>
                        </div>
                      </div>
                      <Button size="sm">Commencer</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ElementDetailsPage;
