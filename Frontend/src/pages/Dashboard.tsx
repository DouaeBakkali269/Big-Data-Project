import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, FileText, Calendar, Target, Trophy, MessageSquare } from 'lucide-react';
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

  const quickStats = [
    { label: 'XP Gagné', value: '1,245', icon: Trophy, change: '+45' },
    { label: 'Lassqat Téléchargés', value: '24', icon: FileText, change: '+3' },
    { label: 'Heures d\'étude', value: '42h', icon: Clock, change: '+5h' },
    { label: 'Modules Couverts', value: '8/12', icon: Target, change: '+1' }
  ];

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
            {/* Gamification Progress */}
            <div className="bg-gradient-card rounded-xl p-4 border border-border shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Niveau 7</div>
                  <div className="text-lg font-bold text-foreground">1,245 XP</div>
                  <div className="w-24 bg-muted rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-green-600">{stat.change}</span>
                      <span className="text-sm text-muted-foreground ml-1">this week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/lassqat-planning?level=${encodeURIComponent(item.level)}&module=${encodeURIComponent(item.module)}&element=${encodeURIComponent(item.element)}`
                          )
                        }
                      >
                        Collaborer
                      </Button>
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