import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Star,
  FileText,
  Video,
  Users,
  ArrowRight,
  Calendar,
  Award,
  Brain,
  Zap,
  Target,
  Trophy,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const recentLassqat = [
    {
      id: 1,
      title: 'OOP Concepts Summary',
      module: 'Object Oriented Programming',
      type: 'Summary',
      rating: 4.8,
      downloads: 145,
      uploadedBy: 'Ahmed Bennani',
      uploadedAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Network Protocols Explained',
      module: 'Computer Networks',
      type: 'Explanation',
      rating: 4.9,
      downloads: 203,
      uploadedBy: 'Sara El Amrani',
      uploadedAt: '1 day ago'
    },
    {
      id: 3,
      title: 'Database Design - Final Exam 2023',
      module: 'Database Systems',
      type: 'Exam Correction',
      rating: 4.7,
      downloads: 98,
      uploadedBy: 'Omar Idrissi',
      uploadedAt: '3 days ago'
    }
  ];

  const upcomingExams = [
    {
      module: 'Artificial Intelligence',
      date: 'Dec 15, 2024',
      timeLeft: '2 weeks',
      prepared: 75
    },
    {
      module: 'Software Engineering',
      date: 'Dec 20, 2024',
      timeLeft: '3 weeks',
      prepared: 60
    },
    {
      module: 'Mobile Development',
      date: 'Jan 8, 2025',
      timeLeft: '1 month',
      prepared: 40
    }
  ];

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
          {/* Recent Lassqat */}
          <div className="lg:col-span-2">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Trending Lassqat
                  </CardTitle>
                  <CardDescription>Most popular study materials this week</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentLassqat.map((lassqa) => (
                  <div key={lassqa.id} className="border border-border rounded-lg p-4 hover:shadow-academic transition-all duration-200 bg-background/50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{lassqa.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{lassqa.module}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>by {lassqa.uploadedBy}</span>
                          <span>•</span>
                          <span>{lassqa.uploadedAt}</span>
                          <span>•</span>
                          <span>{lassqa.downloads} downloads</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">{lassqa.type}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{lassqa.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">View</Button>
                      <Button size="sm" variant="outline">Download</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Exams */}
          <div>
            <Card className="shadow-card border-0 bg-gradient-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Upcoming Exams
                </CardTitle>
                <CardDescription>Stay prepared for your exams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingExams.map((exam, index) => (
                  <div key={index} className="border border-border rounded-lg p-3 bg-background/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-foreground text-sm">{exam.module}</h4>
                      <Badge variant="outline" className="text-xs">{exam.timeLeft}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{exam.date}</p>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Preparation</span>
                        <span>{exam.prepared}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${exam.prepared}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Study Now
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  Générer Flashcards IA
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  QCM Interactif
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Planifier Session
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Rejoindre Communauté
                </Button>
              </CardContent>
            </Card>

            {/* Badges Earned */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Badges Récents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 border border-border rounded-lg bg-background/50">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Expert IA</div>
                    <div className="text-xs text-muted-foreground">50 Lassqat IA consultés</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 border border-border rounded-lg bg-background/50">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Collaborateur</div>
                    <div className="text-xs text-muted-foreground">5 sessions organisées</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;