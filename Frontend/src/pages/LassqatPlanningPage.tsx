import Navigation from '@/components/Navigation';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar,
  Clock,
  Video,
  Plus,
  User,
  BookOpen,
  Star,
  MessageSquare,
  Bell,
  Share2,
  Upload
} from 'lucide-react';

const LassqatPlanningPage = () => {
  type Session = {
    id: number;
    title: string;
    organizer: string;
    collaborators: string[];
    date: string;
    time: string;
    module: string;
    element: string;
    platform: string;
    link: string;
    attendees: number;
    maxAttendees: number;
    rating: number;
    status: 'confirmé' | 'planifié' | 'en_preparation' | 'terminé';
    level: '1A' | '2A' | '3A';
    major?: string;
  };
  // Simulated current user and default level filter
  const currentUser = 'Moi';
  const [selectedLevel, setSelectedLevel] = useState<'1A' | '2A' | '3A'>('2A');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState<{open: boolean; sessionId?: number}>({open: false});
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsSession, setCommentsSession] = useState<Session | null>(null);
  const [newComment, setNewComment] = useState('');
  const [sessionComments, setSessionComments] = useState<Record<number, { author: string; text: string; date: string }[]>>({});
  const [notifiedSessions, setNotifiedSessions] = useState<number[]>([]);
  const { toast } = useToast();

  // Catalog of modules/elements by level (for selection + coverage)
  const levelCatalog: Record<'1A' | '2A' | '3A', { module: string; elements: string[] }[]> = {
    '1A': [
      { module: 'Programmation I', elements: ['Bases de Programmation', 'Structures de Contrôle'] },
      { module: 'Mathématiques', elements: ['Analyse', 'Algèbre'] },
    ],
    '2A': [
      { module: 'Systèmes de Bases de Données', elements: ['Optimisation et Performance', 'Transactions', 'NoSQL'] },
      { module: 'Algorithmes et Structures de Données', elements: ['Algorithmes de Tri', 'Complexité', 'Structures de Données'] },
    ],
    '3A': [
      { module: 'Intelligence Artificielle', elements: ['Machine Learning', 'Réseaux de Neurones', 'NLP'] },
      { module: 'Réseaux Informatiques', elements: ['TCP/IP et Routage', 'Sécurité des Réseaux'] },
    ],
  };

  const [newSession, setNewSession] = useState<{
    title: string;
    level: '1A' | '2A' | '3A';
    module: string;
    element: string;
    date: string; // ISO local date e.g., 2025-09-06
    time: string; // e.g., 14:00
    platform: string;
    link: string;
  }>({
    title: '',
    level: '2A',
    module: '',
    element: '',
    date: '',
    time: '',
    platform: 'Teams',
    link: ''
  });

  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([
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
  link: 'https://teams.microsoft.com/l/meetup-join/ai-ml-123',
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
  link: 'https://zoom.us/j/1234567890',
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
  link: 'https://meet.google.com/abcd-efgh-ijk',
      attendees: 15,
      maxAttendees: 20,
      rating: 4.7,
      status: 'planifié',
      level: '2A',
      major: 'RI'
    }
  ]);

  const [myPlannedSessions, setMyPlannedSessions] = useState([
    {
      id: 4,
      title: 'Algorithmes de Tri et Complexité',
      date: 'Jeu 12 Déc 2024',
      time: '15:00 - 17:00',
      module: 'Algorithmes et Structures de Données',
      element: 'Algorithmes de Tri',
      status: 'en_preparation',
      registrations: 12,
  collaboratorRequests: 3,
  link: ''
    }
  ]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmé': return 'bg-green-100 text-green-800 border-green-200';
      case 'planifié': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'en_preparation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'terminé': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Derived lists
  const availableModules = useMemo(() => levelCatalog[selectedLevel] || [], [levelCatalog, selectedLevel]);
  const elementOptions = useMemo(() => {
    const modules = levelCatalog[newSession.level];
    const found = modules?.find(m => m.module === newSession.module);
    return found ? found.elements : [];
  }, [levelCatalog, newSession.level, newSession.module]);
  const filteredUpcoming = useMemo(() => upcomingSessions.filter(s => s.level === selectedLevel), [upcomingSessions, selectedLevel]);

  // Coverage by element: which elements have volunteers (organizers) vs still need
  const coverage = useMemo(() => {
    const byModule: Record<string, Record<string, boolean>> = {};
    const modules = levelCatalog[selectedLevel] || [];
    modules.forEach(m => {
      byModule[m.module] = {};
      m.elements.forEach(el => { byModule[m.module][el] = false; });
    });
    filteredUpcoming.forEach(s => {
      if (!byModule[s.module]) byModule[s.module] = {} as any;
      byModule[s.module][s.element] = true;
    });
    return byModule;
  }, [levelCatalog, filteredUpcoming, selectedLevel]);

  const openCreateDialog = () => {
    setNewSession({ title: '', level: selectedLevel, module: '', element: '', date: '', time: '', platform: 'Teams', link: '' });
    setShowCreateDialog(true);
  };

  const handleCreateSession = () => {
    if (!newSession.title || !newSession.module || !newSession.element || !newSession.date || !newSession.time || !newSession.link) return;
    const id = Math.max(0, ...upcomingSessions.map(s => s.id)) + 1;
    const humanDate = new Date(`${newSession.date}T${newSession.time}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    const timeRange = `${newSession.time} - ${newSession.time}`;
    const created: Session = {
      id,
      title: newSession.title,
      organizer: currentUser,
      collaborators: [] as string[],
      date: humanDate,
      time: timeRange,
      module: newSession.module,
      element: newSession.element,
      platform: newSession.platform,
      link: newSession.link,
      attendees: 0,
      maxAttendees: 30,
      rating: 0,
      status: 'planifié',
      level: newSession.level,
      major: '-'
    };
    setUpcomingSessions(prev => [created, ...prev]);
    setMyPlannedSessions(prev => [{ id, title: created.title, date: created.date, time: created.time, module: created.module, element: created.element, status: 'en_preparation', registrations: 0, collaboratorRequests: 0, link: created.link }, ...prev]);
    setShowCreateDialog(false);
  };

  const handleCollaborate = (id: number) => {
    setUpcomingSessions(prev => prev.map(s => s.id === id && !s.collaborators.includes(currentUser) ? { ...s, collaborators: [...s.collaborators, currentUser] } : s));
  };

  const handleUpload = (id: number) => {
    setShowUploadDialog({ open: true, sessionId: id });
  };
  // Share link dialog state
  const [shareLinkDialog, setShareLinkDialog] = useState<{ open: boolean; sessionId?: number; value: string }>({ open: false, value: '' });
  const openShareLinkDialog = (sessionId: number, existing?: string) => {
    setShareLinkDialog({ open: true, sessionId, value: existing || '' });
  };
  const saveShareLink = () => {
    const url = shareLinkDialog.value.trim();
    if (!url) {
      toast({ title: 'Lien requis', description: 'Veuillez coller le lien de la réunion.' });
      return;
    }
    // naive validation
    const isUrl = /^(https?:)\/\//i.test(url);
    if (!isUrl) {
      toast({ title: 'Lien invalide', description: 'Le lien doit commencer par http:// ou https://.' });
      return;
    }
    const sid = shareLinkDialog.sessionId!;
    // update my planned sessions
    setMyPlannedSessions(prev => prev.map(s => s.id === sid ? { ...s, link: url } : s));
    // update upcoming if exists
    setUpcomingSessions(prev => prev.map(s => s.id === sid ? { ...s, link: url } : s));
    setShareLinkDialog({ open: false, value: '' });
    toast({ title: 'Lien enregistré', description: 'Le lien de la réunion a été ajouté à la session.' });
  };

  const openComments = (session: Session) => {
    setCommentsSession(session);
    setCommentsOpen(true);
  };

  const publishComment = () => {
    if (!commentsSession || !newComment.trim()) return;
    const sid = commentsSession.id;
    setSessionComments(prev => ({
      ...prev,
      [sid]: [
        { author: currentUser, text: newComment.trim(), date: new Date().toLocaleString('fr-FR') },
        ...(prev[sid] || []),
      ],
    }));
    setNewComment('');
    toast({ title: 'Commentaire publié', description: `Votre message a été ajouté à "${commentsSession.title}".` });
  };

  const toggleNotify = (session: Session) => {
    setNotifiedSessions(prev => {
      const isOn = prev.includes(session.id);
      const next = isOn ? prev.filter(id => id !== session.id) : [session.id, ...prev];
      toast({
        title: isOn ? 'Notifications désactivées' : 'Notifications activées',
        description: `${isOn ? 'Vous ne recevrez plus' : 'Vous recevrez'} des rappels pour "${session.title}".`,
      });
      return next;
    });
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
              <Button variant="default" onClick={openCreateDialog}>
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
              <div className="flex gap-2 w-full md:w-auto">
                <Select value={selectedLevel} onValueChange={(v) => setSelectedLevel(v as '1A' | '2A' | '3A')}>
                  <SelectTrigger className="w-[160px]"><SelectValue placeholder="Niveau" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1A">1A</SelectItem>
                    <SelectItem value="2A">2A</SelectItem>
                    <SelectItem value="3A">3A</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Rechercher</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coverage by Element */}
        <Card className="shadow-card border-0 bg-gradient-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /> Couverture par Élément ({selectedLevel})</CardTitle>
            <CardDescription>Éléments ayant des volontaires vs ceux qui ont encore besoin d'un volontaire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(coverage).map(([mod, elements]) => (
                <Card key={mod} className="border border-border bg-background/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{mod}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(elements).map(([el, has]) => (
                        <Badge key={el} variant={has ? 'default' : 'secondary'} className={has ? '' : ''}>
                          {has ? 'Volontaire trouvé' : 'Besoin de volontaire'} — {el}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                {filteredUpcoming.map((session) => (
                  <div key={session.id} className="border border-border rounded-lg p-4 hover:shadow-academic transition-all duration-200 bg-background/50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{session.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
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
                      <Button size="sm" className="px-3">S'inscrire</Button>
                      <Button size="sm" variant="outline" onClick={() => handleCollaborate(session.id)}>Collaborer</Button>
                      <Button size="sm" variant="outline" onClick={() => openComments(session)} aria-label="Commentaires">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={notifiedSessions.includes(session.id) ? 'default' : 'outline'}
                        onClick={() => toggleNotify(session)}
                        aria-label="Notifications"
                      >
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
                    <div className="flex justify-between items-center mb-1">
                      <Badge className={getStatusColor(session.status)} variant="outline">
                        {session.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {session.registrations} inscrits
                      </div>
                    </div>
                    {session.link && (
                      <div className="text-[11px] text-emerald-700 flex items-center gap-1 mb-2">
                        <Share2 className="w-3 h-3" /> Lien enregistré
                      </div>
                    )}
                    <div className="flex gap-2">
                      {!session.link && (
                        <Button size="sm" variant="outline" className="w-1/2 text-xs" onClick={() => openShareLinkDialog(session.id, session.link)}>
                          <Share2 className="w-3 h-3 mr-1" />
                          Partager le lien
                        </Button>
                      )}
                      <Button size="sm" className="w-1/2 text-xs" onClick={() => handleUpload(session.id)}>
                        <Upload className="w-3 h-3 mr-1" />
                        Uploader
                      </Button>
                    </div>
                  </div>
                ))}
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

      {/* Create Session Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Organiser une Session</DialogTitle>
            <DialogDescription>Sélectionnez un module et un élément, puis renseignez les détails de la session.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Niveau</label>
                <Select value={newSession.level} onValueChange={(v) => setNewSession(s => ({...s, level: v as '1A' | '2A' | '3A'}))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Niveau" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1A">1A</SelectItem>
                    <SelectItem value="2A">2A</SelectItem>
                    <SelectItem value="3A">3A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Module</label>
              <Select value={newSession.module} onValueChange={(v) => setNewSession(s => ({...s, module: v, element: ''}))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Choisir un module" /></SelectTrigger>
                <SelectContent>
                  {(levelCatalog[newSession.level as '1A' | '2A' | '3A'] || []).map(m => (
                    <SelectItem key={m.module} value={m.module}>{m.module}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Élément</label>
              <Select value={newSession.element} onValueChange={(v) => setNewSession(s => ({...s, element: v}))}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Choisir un élément" /></SelectTrigger>
                <SelectContent>
                  {elementOptions.map(el => (<SelectItem key={el} value={el}>{el}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Titre</label>
              <Input value={newSession.title} onChange={(e) => setNewSession(s => ({...s, title: e.target.value}))} placeholder="Titre de la session" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Date</label>
                <Input type="date" value={newSession.date} onChange={(e) => setNewSession(s => ({...s, date: e.target.value}))} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Heure</label>
                <Input type="time" value={newSession.time} onChange={(e) => setNewSession(s => ({...s, time: e.target.value}))} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground">Plateforme</label>
                <Select value={newSession.platform} onValueChange={(v) => setNewSession(s => ({...s, platform: v}))}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Plateforme" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teams">Teams</SelectItem>
                    <SelectItem value="Zoom">Zoom</SelectItem>
                    <SelectItem value="Google Meet">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Lien</label>
                <Input value={newSession.link} onChange={(e) => setNewSession(s => ({...s, link: e.target.value}))} placeholder="URL de la réunion" />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Annuler</Button>
            <Button onClick={handleCreateSession}>Publier la Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog after session completion */}
      <Dialog open={showUploadDialog.open} onOpenChange={(open) => setShowUploadDialog(s => ({open}))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Uploader le Lassqa</DialogTitle>
            <DialogDescription>Ajoutez le PDF ou la présentation pour l'élément correspondant.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input type="file" accept="application/pdf,.ppt,.pptx" />
            <Input placeholder="Titre / Description (optionnel)" />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowUploadDialog({open:false})}>Fermer</Button>
            <Button onClick={() => setShowUploadDialog({open:false})}>Uploader</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Comments Drawer */}
      <Drawer open={commentsOpen} onOpenChange={setCommentsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Commentaires</DrawerTitle>
            <DrawerDescription>
              {commentsSession ? commentsSession.title : 'Session'}
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-4 space-y-3 max-h-[50vh] overflow-y-auto">
            {(commentsSession && sessionComments[commentsSession.id])?.length ? (
              sessionComments[commentsSession.id].map((c, idx) => (
                <div key={idx} className="p-3 border border-border rounded-md bg-background/50">
                  <div className="text-sm font-medium">{c.author}</div>
                  <div className="text-sm text-muted-foreground">{c.date}</div>
                  <div className="text-sm mt-2">{c.text}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Aucun commentaire pour l’instant.</div>
            )}
          </div>
          <div className="px-6 pb-6">
            <Textarea
              placeholder="Écrire un commentaire…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-3"
            />
            <div className="flex justify-end">
              <Button onClick={publishComment} disabled={!newComment.trim()}>Publier</Button>
            </div>
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>

      {/* Share Link Dialog */}
      <Dialog open={shareLinkDialog.open} onOpenChange={(open) => setShareLinkDialog(s => ({ ...s, open }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Partager le lien de la réunion</DialogTitle>
            <DialogDescription>Collez l’URL (Zoom, Teams, Meet, …). Elle sera visible pour les inscrits.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="https://…"
              value={shareLinkDialog.value}
              onChange={(e) => setShareLinkDialog(s => ({ ...s, value: e.target.value }))}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShareLinkDialog({ open: false, value: '' })}>Annuler</Button>
            <Button onClick={saveShareLink}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LassqatPlanningPage;
