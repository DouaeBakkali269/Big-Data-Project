import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare,
  Users,
  Hash,
  PlusCircle,
  Search,
  Pin,
  ThumbsUp,
  MessageCircle,
  Clock,
  Star,
  Flame,
  BookOpen,
  HelpCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const CommunityPage = () => {
  const majors = [
    { code: 'GL', name: 'Génie Logiciel', color: 'bg-blue-100 text-blue-800', memberCount: 450, activeNow: 23 },
    { code: 'GD', name: 'Génie de la Data', color: 'bg-green-100 text-green-800', memberCount: 380, activeNow: 18 },
    { code: 'SIDS', name: 'SIDS', color: 'bg-purple-100 text-purple-800', memberCount: 420, activeNow: 21 },
    { code: 'IA', name: 'Intelligence Artificielle', color: 'bg-pink-100 text-pink-800', memberCount: 220, activeNow: 15 },
    { code: 'RI', name: 'Réseaux & Ingénierie', color: 'bg-orange-100 text-orange-800', memberCount: 340, activeNow: 12 }
  ];

  const channels = [
    { name: 'annonces-generales', type: 'announcement', memberCount: 1250, unread: 2 },
    { name: 'questions-examens', type: 'help', memberCount: 980, unread: 5 },
    { name: 'partage-ressources', type: 'resources', memberCount: 850, unread: 0 },
    { name: 'projets-collaboratifs', type: 'projects', memberCount: 650, unread: 3 },
    { name: 'discussions-libres', type: 'general', memberCount: 1100, unread: 8 }
  ];

  const recentDiscussions = [
    {
      id: 1,
      title: 'Quelqu\'un a-t-il des conseils pour l\'examen d\'IA ?',
      author: 'Ahmed Bennani',
      channel: 'questions-examens',
      major: 'IA',
      level: '3A',
      replies: 12,
      likes: 24,
      timeAgo: '2h',
      isPinned: false,
      isHot: true,
      tags: ['examen', 'ai', 'conseils']
    },
    {
      id: 2,
      title: 'Nouveau Lassqa disponible - Bases de Données Avancées',
      author: 'Sara El Amrani',
      channel: 'partage-ressources',
      major: 'GL',
      level: '2A',
      replies: 8,
      likes: 45,
      timeAgo: '4h',
      isPinned: true,
      isHot: false,
      tags: ['lassqa', 'database', 'ressources']
    },
    {
      id: 3,
      title: 'Recherche équipe pour projet de fin d\'études - Computer Vision',
      author: 'Omar Idrissi',
      channel: 'projets-collaboratifs',
      major: 'IA',
      level: '3A',
      replies: 15,
      likes: 18,
      timeAgo: '6h',
      isPinned: false,
      isHot: true,
      tags: ['projet', 'collaboration', 'computer-vision']
    },
    {
      id: 4,
      title: 'Comment optimiser les requêtes SQL complexes ?',
      author: 'Fatima Zahra',
      channel: 'questions-examens',
      major: 'GD',
      level: '2A',
      replies: 20,
      likes: 32,
      timeAgo: '8h',
      isPinned: false,
      isHot: false,
      tags: ['sql', 'optimisation', 'database']
    },
    {
      id: 5,
      title: 'Session de révision collective - Réseaux TCP/IP',
      author: 'Youssef Alami',
      channel: 'annonces-generales',
      major: 'RI',
      level: '2A',
      replies: 6,
      likes: 28,
      timeAgo: '1j',
      isPinned: true,
      isHot: false,
      tags: ['revision', 'tcp-ip', 'session']
    }
  ];

  const getChannelIcon = (type: string) => {
    switch(type) {
      case 'announcement': return AlertCircle;
      case 'help': return HelpCircle;
      case 'resources': return BookOpen;
      case 'projects': return Users;
      default: return MessageSquare;
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
                Communauté ENSIAS
              </h1>
              <p className="text-muted-foreground">
                Connectez-vous, partagez et collaborez avec vos collègues étudiants
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
              <Button variant="default">
                <PlusCircle className="w-4 h-4 mr-2" />
                Nouvelle Discussion
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="shadow-card border-0 bg-gradient-card mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Rechercher dans les discussions, canaux ou par tags..."
                  className="w-full"
                />
              </div>
              <Button>Rechercher</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filières */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Filières
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {majors.map((major) => (
                  <div key={major.code} className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Badge className={major.color} variant="outline">
                        {major.code}
                      </Badge>
                      <div>
                        <div className="text-sm font-medium">{major.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {major.memberCount} membres
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">{major.activeNow}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Canaux */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Canaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {channels.map((channel) => {
                  const IconComponent = getChannelIcon(channel.type);
                  return (
                    <div key={channel.name} className="flex items-center justify-between p-2 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                          {channel.unread}
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Statistiques Rapides */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Activité Aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-sm text-muted-foreground">Nouvelles discussions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">245</div>
                  <div className="text-sm text-muted-foreground">Messages postés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Membres actifs</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Discussions Récentes
                  </CardTitle>
                  <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Flame className="w-4 h-4 mr-1" />
                    Populaires
                  </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="w-4 h-4 mr-1" />
                      Récentes
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Les discussions les plus actives de la communauté
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDiscussions.map((discussion) => (
                  <div key={discussion.id} className="border border-border rounded-lg p-4 hover:shadow-academic transition-all duration-200 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.isPinned && <Pin className="w-4 h-4 text-primary" />}
                          {discussion.isHot && <Flame className="w-4 h-4 text-red-500" />}
                          <h3 className="font-semibold text-foreground">{discussion.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge className={getMajorColor(discussion.major)}>
                            {discussion.major}
                          </Badge>
                          <Badge variant="outline">{discussion.level}</Badge>
                          <Badge variant="secondary">#{discussion.channel}</Badge>
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Par {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Voir la Discussion
                      </Button>
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
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

export default CommunityPage;