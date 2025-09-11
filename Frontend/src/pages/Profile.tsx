import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Trophy, Users, Star, GraduationCap, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  // Mocked user profile; replace with real auth/user store later
  const user = {
    name: 'Ahmed Bennani',
    major: 'GL',
    majorLabel: 'Génie Logiciel',
    level: '2A',
    avatarUrl: '/placeholder.svg',
    xp: 1245,
    rank: 'Niveau 7',
    badges: [
      { id: 1, name: 'Expert IA', desc: '50 Lassqat IA consultés', color: 'yellow' },
  { id: 2, name: 'Organisateur', desc: '5 sessions publiées', color: 'blue' },
    ],
  };

  // Lassqat où l'étudiant s'est porté volontaire (à produire/animer)
  const volunteerLassqat = [
    { id: 201, title: 'Préparer Résumé — POO: Patterns de Conception', module: 'Programmation Orientée Objet', element: 'Patterns de Conception', when: 'Demain, 18:00', year: '2025', major: 'GL', level: '2A' },
    { id: 202, title: 'Enregistrer Vidéo — BD: Transactions & Verrous', module: 'Systèmes de BD', element: 'Transactions et Verrous', when: 'Mar 11:00', year: '2025', major: 'GL', level: '2A' },
    { id: 203, title: 'Corrigé — Maths: Probabilités (Série 2)', module: 'Mathématiques II', element: 'Probabilités — Série 2', when: 'Jeu 09:00', year: '2025', major: 'GL', level: '2A' },
  ];

  const myGroups = [
    { id: 1, name: 'GL 2A — POO', channel: '#discussions-libres', members: 34, threadId: 4 },
    { id: 2, name: 'GL 2A — Bases de Données', channel: '#partage-ressources', members: 28, threadId: 1 },
    { id: 3, name: 'IA — Questions Examens', channel: '#questions-examens', members: 41, threadId: 2 },
  ];

  const majorColor = 'bg-blue-100 text-blue-800';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header: Profile summary */}
        <Card className="shadow-card border-0 bg-gradient-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline" className={majorColor}>{user.major}</Badge>
                    <Badge variant="secondary">{user.majorLabel}</Badge>
                    <Badge variant="outline"><GraduationCap className="w-3 h-3 mr-1" /> {user.level}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Rang</div>
                  <div className="text-lg font-semibold">{user.rank}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">XP</div>
                  <div className="text-lg font-semibold">{user.xp}</div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-1" />
                  Éditer le Profil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mes Lassqat — Volontariats (Profile) */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  À venir — Mes Lassqat (Volontaire)
                </CardTitle>
                <CardDescription>Vos contributions à livrer ou animer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {volunteerLassqat.map((item) => (
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
                        Gérer
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right side: Badges and Groups */}
          <div className="space-y-6">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Mes Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {user.badges.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 p-2 border border-border rounded-lg bg-background/50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${b.color === 'yellow' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                      <Star className={`w-4 h-4 ${b.color === 'yellow' ? 'text-yellow-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{b.name}</div>
                      <div className="text-xs text-muted-foreground">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Mes Groupes
                </CardTitle>
                <CardDescription>Vos espaces d’échange et de révision</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {myGroups.map((g) => (
                  <div key={g.id} className="p-2 border border-border rounded-lg bg-background/50 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{g.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{g.channel}</span>
                        <span>•</span>
                        <span>{g.members} membres</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (g.threadId) {
                          navigate(`/community?threadId=${g.threadId}`);
                        } else {
                          const channel = g.channel.startsWith('#') ? g.channel.slice(1) : g.channel;
                          navigate(`/community?title=${encodeURIComponent(g.name)}&channel=${encodeURIComponent(channel)}`);
                        }
                      }}
                    >
                      Ouvrir
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
