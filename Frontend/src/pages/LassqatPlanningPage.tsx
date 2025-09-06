import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  User,
  MapPin,
  BookOpen,
  Star,
  MessageSquare,
  Bell,
  Filter
} from 'lucide-react';

const LassqatPlanningPage = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: 'Révision Intelligence Artificielle - Machine Learning',
      organizer: 'Ahmed Bennani',
      collaborators: ['Sara El Amrani', 'Omar Idrissi'],
      date: 'Dim 8 Déc 2024',
      time: '14:00 - 16:00',
      module: 'Intelligence Artificielle',
      element: 'Machine Learning',
      platform: 'Teams',
      attendees: 23,
      maxAttendees: 30,
      rating: 4.8,
      status: 'confirmé',
      level: '3A',
      major: 'IA'
    },
    {
      id: 2,
      title: 'Préparation Examen - Bases de Données Avancées',
      organizer: 'Fatima Zahra',
      collaborators: [],
      date: 'Lun 9 Déc 2024',
      time: '16:30 - 18:30',
      module: 'Systèmes de Bases de Données',
      element: 'Optimisation et Performance',
      platform: 'Zoom',
      attendees: 18,
      maxAttendees: 25,
      rating: 4.9,
      status: 'confirmé',
      level: '2A',
      major: 'GL'
    },
    {
      id: 3,
      title: 'Session QCM - Réseaux et Protocoles',
      organizer: 'Youssef Alami',
      collaborators: ['Aicha Benali'],
      date: 'Mar 10 Déc 2024',
      time: '19:00 - 21:00',
      module: 'Réseaux Informatiques',
      element: 'TCP/IP et Routage',
      platform: 'Google Meet',
      attendees: 15,
      maxAttendees: 20,
      rating: 4.7,
      status: 'planifié',
      level: '2A',
      major: 'RI'
    }
  ];

  const myPlannedSessions = [
    {
      id: 4,
      title: 'Algorithmes de Tri et Complexité',
      date: 'Jeu 12 Déc 2024',
      time: '15:00 - 17:00',
      module: 'Algorithmes et Structures de Données',
      element: 'Algorithmes de Tri',
      status: 'en_preparation',
      registrations: 12,
      collaboratorRequests: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmé': return 'bg-green-100 text-green-800 border-green-200';
      case 'planifié': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en_preparation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminé': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMajorColor = (major: string) => {
    const colors = {
      'GL': 'bg-blue-100 text-blue-800',
      'GD': 'bg-green-100 text-green-800',
      'IA': 'bg-pink-100 text-pink-800',
      'RI': 'bg-orange-100 text-orange-800',
      'SIDS': 'bg-purple-100 text-purple-800'
    };
    return colors[major as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Planification des Lassqat
              </h1>
              <p className="text-muted-foreground">
                Organisez et participez à des sessions collaboratives de révision
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Organiser une Session
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Search */}
        <Card className="shadow-card border-0 bg-gradient-card mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Rechercher par module, élément ou organisateur..."
                  className="w-full"
                />
              </div>
              <Button>Rechercher</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sessions à venir */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Sessions à Venir
                </CardTitle>
                <CardDescription>
                  Sessions planifiées par la communauté
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-border rounded-lg p-4 hover:shadow-academic transition-all duration-200 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{session.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getMajorColor(session.major)}>{session.major}</Badge>
                          <Badge variant="outline">{session.level}</Badge>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>Par {session.organizer}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            <span>{session.platform}</span>
                          </div>
                        </div>
                        {session.collaborators.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm text-muted-foreground mb-1">Collaborateurs:</p>
                            <div className="flex gap-1">
                              {session.collaborators.map((collab, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {collab}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{session.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {session.attendees}/{session.maxAttendees} participants
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        S'inscrire
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mes Sessions */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Mes Sessions Planifiées</CardTitle>
                <CardDescription>Sessions que vous organisez</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myPlannedSessions.map((session) => (
                  <div key={session.id} className="border border-border rounded-lg p-3 bg-background/50">
                    <h4 className="font-medium text-foreground text-sm mb-2">{session.title}</h4>
                    <div className="text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <Badge className={getStatusColor(session.status)} variant="outline">
                        {session.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {session.registrations} inscrits
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Gérer la Session
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvelle Session
                </Button>
              </CardContent>
            </Card>

            {/* Statistiques */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Sessions Organisées</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">34</div>
                  <div className="text-sm text-muted-foreground">Sessions Suivies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted-foreground">Note Moyenne</div>
                </div>
              </CardContent>
            </Card>

            {/* Rappels */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Rappels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-border rounded-lg bg-background/50">
                  <div className="text-sm font-medium">Session dans 2h</div>
                  <div className="text-xs text-muted-foreground">Machine Learning - 14:00</div>
                </div>
                <div className="p-3 border border-border rounded-lg bg-background/50">
                  <div className="text-sm font-medium">Préparer le contenu</div>
                  <div className="text-xs text-muted-foreground">Algorithmes de Tri - Demain</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LassqatPlanningPage;