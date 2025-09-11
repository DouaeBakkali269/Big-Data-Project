import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Calendar, Target, Trophy, MessageSquare } from 'lucide-react';
import { getCurrentUser } from '@/lib/user';
import { useNavigate } from 'react-router-dom';
import useCommunityHighlights from '@/hooks/useCommunityHighlights';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  // Lassqat où l'étudiant est INSCRIT (abonné)
  const subscribedLassqat = [
    {
      id: 101,
      title: 'POO — Patterns de Conception (Résumé PDF)',
      module: 'Programmation Orientée Objet',
      element: 'Patterns de Conception',
      year: '2025',
      major: 'GL',
      level: '2A',
      when: 'Demain, 18:00',
    },
    {
      id: 102,
      title: 'BD — Transactions & Verrous (Vidéo)',
      module: 'Systèmes de BD',
      element: 'Transactions et Verrous',
      year: '2025',
      major: 'GL',
      level: '2A',
      when: 'Lun 14:00',
    },
    {
      id: 103,
      title: 'IA — Métriques de ML (Flashcards)',
      module: 'Intelligence Artificielle',
      element: 'Métriques de Machine Learning',
      year: '2025',
      major: 'GL',
      level: '2A',
      when: 'Mer 10:00',
    },
  ];
  const filteredSubscribed = subscribedLassqat.filter(i => i.major === user.major && i.level === user.level);
  const highlights = useCommunityHighlights();
  const RECENTS_KEY = 'recentlyViewed';
  type RecentItem = { id: string; title: string; module: string; element: string; when: string; to: string };
  let recentItems: RecentItem[] = [];
  try {
    const raw = localStorage.getItem(RECENTS_KEY);
    if (raw) recentItems = JSON.parse(raw);
  } catch {}

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Bienvenue, Ahmed! 👋
              </h1>
              <p className="text-muted-foreground">
                Votre tableau de bord de préparation aux examens ENSIAS. Restez organisé et excellez dans vos études.
              </p>
            </div>
            {/* Gamification + Modules Couverts */}
            <div className="bg-gradient-card rounded-xl p-4 border border-border shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="min-w-[10rem]">
                  <div className="text-sm text-muted-foreground">Niveau 7</div>
                  <div className="text-lg font-bold text-foreground">1,245 XP</div>
                  <div className="w-24 bg-muted rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div className="ml-6 pl-6 border-l border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Modules Couverts</div>
                      <div className="text-base font-semibold">8/12</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mb-8">
          <Card className="shadow-card border-0 bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Recently Viewed</CardTitle>
              <CardDescription>Vos derniers éléments consultés</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentItems.length === 0 && (
                <div className="text-sm text-muted-foreground">Aucun élément vu récemment.</div>
              )}
              {recentItems.slice(0, 6).map((r) => (
                <div key={r.id} className="p-3 border border-border rounded-lg bg-background/50 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.module} • {r.element}</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(r.to)}>Ouvrir</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mes Lassqat — Inscrits (Home) */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  À venir — Mes Lassqat (Inscrits)
                </CardTitle>
                <CardDescription>Vos prochains contenus à réviser</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredSubscribed.length === 0 && (
                  <div className="border border-dashed border-border rounded-lg p-6 text-center text-sm text-muted-foreground">
                    Aucun Lassqat correspondant à votre filière/niveau pour le moment.
                    <div className="mt-3">
                      <Button size="sm" variant="outline" onClick={() => navigate('/lassqat')}>Explorer Lassqat</Button>
                    </div>
                  </div>
                )}
                {filteredSubscribed.map((item) => (
                  <div key={item.id} className="border border-border rounded-lg p-4 bg-background/50">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-medium text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground">{item.module}</div>
                      </div>
                      <Badge variant="outline">{item.when}</Badge>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(
                            `/element/${item.year}/${item.major}/${item.level}/${encodeURIComponent(item.module)}/${encodeURIComponent(item.element)}`
                          )
                        }
                      >
                        Ouvrir
                      </Button>
                      {/* Collaborer removed */}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Community Highlights (unique to Home) */}
          <div>
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Community Highlights
                </CardTitle>
                <CardDescription>Dernières activités dans votre filière</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {highlights.map((h) => (
                  <div key={h.id} className="p-2 border border-border rounded-lg bg-background/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {h.type === 'resource' && <BookOpen className="w-4 h-4 text-muted-foreground" />}
                        {h.type === 'session' && <Calendar className="w-4 h-4 text-muted-foreground" />}
                        {h.type === 'thread' && <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                        {h.type === 'question' && <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                        {h.type === 'announcement' && <Calendar className="w-4 h-4 text-muted-foreground" />}
                        <div>
                          <div className="text-sm font-medium">{h.title}</div>
                          {h.subtitle && (
                            <div className="text-xs text-muted-foreground">{h.subtitle}</div>
                          )}
                        </div>
                      </div>
                      {h.channel && <Badge variant="outline" className="text-xs">#{h.channel}</Badge>}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">{h.time}</div>
                      <div className="flex gap-2">
                        {h.actions.map((a, idx) => (
                          <Button key={idx} size="sm" variant={a.variant ?? 'default'} onClick={() => navigate(a.to)}>
                            {a.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {highlights.length === 0 && (
                  <div className="text-xs text-muted-foreground">Aucune activité récente.</div>
                )}
              </CardContent>
            </Card>
          </div>
  </div>
      </main>
    </div>
  );
};

export default Dashboard;