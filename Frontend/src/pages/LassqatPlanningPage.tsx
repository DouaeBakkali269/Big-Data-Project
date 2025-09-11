import Navigation from '@/components/Navigation';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar,
  Clock,
  Video,
  Plus,
  User,
  BookOpen,
  Share2,
  Upload,
  FileText,
  ExternalLink,
  ArrowRight,
  Pencil
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/lib/user';

const LassqatPlanningPage = () => {
  type Session = {
    id: number;
    title: string;
    organizer: string;
    collaborators: string[];
    date: string; // human
    time: string; // human
    startISO: string; // scheduling anchor
    module: string;
    element: string;
    platform: string;
    link: string;
    description?: string;
    pdfTitle?: string;
    pdfUrl?: string;
    subscribers: string[];
    maxAttendees: number;
    status: 'confirmé' | 'planifié' | 'en_preparation' | 'terminé';
    level: '1A' | '2A' | '3A';
    major?: string;
    year?: string;
  };
  // Simulated current user and default level filter
  const navigate = useNavigate();
  const currentUser = getCurrentUser()?.name || 'Moi';
  const [selectedLevel, setSelectedLevel] = useState<'1A' | '2A' | '3A'>('2A');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState<{open: boolean; sessionId?: number}>({open: false});
  const [showSubscribersDialog, setShowSubscribersDialog] = useState<{ open: boolean; session?: Session }>({ open: false });
  const [editSessionId, setEditSessionId] = useState<number | null>(null);
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
    description: string;
  }>({
    title: '',
    level: '2A',
    module: '',
    element: '',
    date: '',
    time: '',
    platform: 'Teams',
    link: '',
    description: ''
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
      maxAttendees: 30,
    subscribers: ['Sara El Amrani'],
    description: undefined,
    pdfTitle: undefined,
    pdfUrl: undefined,
    startISO: '2025-09-09T14:00:00',
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
      maxAttendees: 25,
    subscribers: ['Mohamed Ali', 'Nisrine O.'],
    description: undefined,
    pdfTitle: undefined,
    pdfUrl: undefined,
    startISO: '2025-09-10T16:30:00',
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
      maxAttendees: 20,
    subscribers: ['User X', 'User Y', 'User Z'],
    description: undefined,
    pdfTitle: undefined,
    pdfUrl: undefined,
    startISO: '2025-09-11T19:00:00',
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
      link: '',
      startISO: '2025-09-12T15:00:00',
      organizer: currentUser
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
  // live clock for countdown
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(i);
  }, []);
  const minutesUntil = (iso: string) => Math.ceil((new Date(iso).getTime() - now) / 60000);
  const isExpired = (iso: string) => now > new Date(iso).getTime() + 30 * 60000;

  const filteredUpcoming = useMemo(() => 
    upcomingSessions
      .filter(s => s.level === selectedLevel)
      .filter(s => !isExpired(s.startISO))
      .sort((a,b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime())
  , [upcomingSessions, selectedLevel, now]);

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
    setNewSession({ title: '', level: selectedLevel, module: '', element: '', date: '', time: '', platform: 'Teams', link: '', description: '' });
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
      startISO: `${newSession.date}T${newSession.time}:00`,
      module: newSession.module,
      element: newSession.element,
      platform: newSession.platform,
      link: newSession.link,
      description: newSession.description,
      pdfTitle: undefined,
      pdfUrl: undefined,
      subscribers: [],
      maxAttendees: 30,
      status: 'planifié',
      level: newSession.level,
      major: '-',
      year: '2025'
    };
    setUpcomingSessions(prev => [created, ...prev]);
  setMyPlannedSessions(prev => [{ id, title: created.title, date: created.date, time: created.time, module: created.module, element: created.element, status: 'en_preparation', registrations: 0, collaboratorRequests: 0, link: created.link, startISO: created.startISO, organizer: currentUser }, ...prev]);
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

  const toggleSubscribe = (id: number) => {
    setUpcomingSessions(prev => prev.map(s => s.id === id ? (
      s.subscribers.includes(currentUser)
        ? { ...s, subscribers: s.subscribers.filter(u => u !== currentUser) }
        : { ...s, subscribers: [...s.subscribers, currentUser] }
    ) : s));
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
                <CardDescription>Informations minimales — cliquez sur Détails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredUpcoming.map((session) => (
                  <div key={session.id} className="border border-border rounded-lg p-4 hover:shadow-academic transition-all duration-200 bg-background/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{session.level}</Badge>
                        <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                        <span className="text-sm text-foreground font-medium">{session.module} — {session.element}</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" /> Par {session.organizer}
                        <span>•</span>
                        <Calendar className="w-4 h-4" /> {session.date}
                        <span>•</span>
                        <Clock className="w-4 h-4" /> {session.time}
                      </div>
                    </div>

                    {(session.description || session.link) && (
                      <div className="text-sm text-muted-foreground mb-3">
                        {session.description && <p className="mb-1">{session.description}</p>}
                        {session.link && (
                          <a className="inline-flex items-center gap-1 text-primary hover:underline" href={session.link} target="_blank" rel="noreferrer">
                            Lien de la réunion
                          </a>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {session.pdfUrl && (
                        <a href={session.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs border border-border rounded px-2 py-1">
                          <FileText className="w-4 h-4" /> {session.pdfTitle || 'Lassqa PDF'}
                        </a>
                      )}
                      <Button size="sm" variant="secondary" onClick={() => navigate(`/element/${session.year || '2025'}/${session.major || 'GL'}/${session.level}/${encodeURIComponent(session.module)}/${encodeURIComponent(session.element)}`)}>
                        Ouvrir l’élément <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="px-3" onClick={() => toggleSubscribe(session.id)}>
                          {session.subscribers.includes(currentUser) ? "Se désinscrire" : "S'inscrire"}
                        </Button>
                        <span className="text-xs text-muted-foreground">{session.subscribers.length}/{session.maxAttendees} inscrits</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-muted-foreground">
                          {(() => {
                            const m = minutesUntil(session.startISO);
                            if (m <= 0 && !isExpired(session.startISO)) return 'En cours';
                            if (m > 0) {
                              const h = Math.floor(m / 60); const mm = m % 60;
                              return `Commence dans ${h > 0 ? h + 'h ' : ''}${mm}m`;
                            }
                            return '';
                          })()}
                        </div>
                        <Button size="sm" variant="outline" onClick={() => navigate(`/session/${session.id}`, { state: session })}>Détails</Button>
                      </div>
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
                {myPlannedSessions
                  .filter(session => session.organizer === currentUser)
                  .filter(session => !isExpired(session.startISO))
                  .map((session) => (
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
                    <div className="flex justify-end items-center mb-1">
                      <div className="text-xs text-muted-foreground">{session.registrations} inscrits</div>
                    </div>
                    <div className="mb-2">
                      {session.link ? (
                        <div className="flex items-center gap-2">
                          <a href={session.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-xs">
                            <ExternalLink className="w-3 h-3" /> Ouvrir la réunion
                          </a>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 px-2 text-[11px]"
                            onClick={() => { navigator.clipboard?.writeText(session.link); toast({ title: 'Lien copié', description: 'Le lien de la réunion a été copié.' }); }}
                          >
                            Copier
                          </Button>
                        </div>
                      ) : (
                        <div className="text-[11px] text-muted-foreground">Lien non ajouté</div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="w-full text-xs"
                        variant="secondary"
                        onClick={() => {
                          const full = upcomingSessions.find(s => s.id === session.id);
                          const fallback = full || {
                            id: session.id,
                            title: session.title,
                            organizer: currentUser,
                            date: session.date,
                            time: session.time,
                            startISO: session.startISO,
                            module: session.module,
                            element: session.element,
                            platform: 'Teams',
                            link: session.link,
                            description: undefined,
                            pdfTitle: undefined,
                            pdfUrl: undefined,
                            subscribers: [],
                            maxAttendees: 0,
                            status: session.status as any,
                            level: selectedLevel,
                          };
                          navigate(`/session/${session.id}`, { state: fallback });
                        }}
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistiques removed as requested */}

            {/* À venir (bientôt) */}
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">À venir (bientôt)</CardTitle>
                <CardDescription>Prochaines sessions selon votre niveau</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {filteredUpcoming.slice(0, 2).map(s => (
                  <div key={s.id} className="p-3 border border-border rounded-lg bg-background/50">
                    <div className="text-sm font-medium">{s.module} — {s.element}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {s.date}
                      <span>•</span>
                      <Clock className="w-3 h-3" /> {s.time}
                      <span className="ml-auto">{(() => { const m = minutesUntil(s.startISO); if (m <= 0 && !isExpired(s.startISO)) return 'En cours'; if (m > 0) { const h = Math.floor(m/60); const mm = m%60; return `${h>0? h+'h ' : ''}${mm}m`; } return ''; })()}</span>
                    </div>
                  </div>
                ))}
                {filteredUpcoming.length === 0 && (
                  <div className="text-sm text-muted-foreground">Rien à venir pour {selectedLevel}.</div>
                )}
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

  {/* Comments removed from Upcoming; to be handled in Session Details or Element tabs */}

  {/* Subscribers Dialog */}
      <Dialog open={showSubscribersDialog.open} onOpenChange={(open) => setShowSubscribersDialog(s => ({ ...s, open }))}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Inscrits</DialogTitle>
            <DialogDescription>{showSubscribersDialog.session?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {(showSubscribersDialog.session?.subscribers || []).length === 0 ? (
              <div className="text-sm text-muted-foreground">Aucun inscrit pour l’instant.</div>
            ) : (
              <ul className="text-sm list-disc pl-5">
                {showSubscribersDialog.session!.subscribers.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowSubscribersDialog({ open: false })}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Session Dialog */}
      <Dialog open={!!editSessionId} onOpenChange={(open) => setEditSessionId(open ? editSessionId : null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Modifier la Session</DialogTitle>
            <DialogDescription>Mettre à jour la date/heure, le lien ou la description.</DialogDescription>
          </DialogHeader>
          {(() => {
            const s = upcomingSessions.find(x => x.id === editSessionId) || null;
            const p = myPlannedSessions.find(x => x.id === editSessionId) || null;
            if (!s && !p) return <div className="text-sm text-muted-foreground">Aucune session sélectionnée.</div>;

            const startDate = s ? s.startISO.split('T')[0] : '';
            const timeHHMM = s ? s.startISO.split('T')[1]?.slice(0,5) || '' : (p ? (p.time?.split(' ')[0] || '') : '');

            return (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Date</label>
                    <Input type="date" defaultValue={startDate} onChange={(e) => {
                      const d = e.target.value; const t = timeHHMM;
                      if (s) {
                        setUpcomingSessions(prev => prev.map(x => x.id === s.id ? ({
                          ...x,
                          startISO: `${d}T${t || '00:00'}:00`,
                          date: d && t ? new Date(`${d}T${t}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : x.date,
                          time: t ? `${t} - ${t}` : x.time
                        }) : x));
                      } else if (p) {
                        setMyPlannedSessions(prev => prev.map(x => x.id === p.id ? ({
                          ...x,
                          // store ISO date raw for now or keep human-readable string
                          date: d || x.date
                        }) : x));
                      }
                    }} />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Heure</label>
                    <Input type="time" defaultValue={timeHHMM} onChange={(e) => {
                      const t = e.target.value; const d = startDate;
                      if (s) {
                        setUpcomingSessions(prev => prev.map(x => x.id === s.id ? ({
                          ...x,
                          startISO: `${d || x.startISO.split('T')[0]}T${t}:00`,
                          date: (d || x.startISO.split('T')[0]) ? new Date(`${d || x.startISO.split('T')[0]}T${t}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : x.date,
                          time: `${t} - ${t}`
                        }) : x));
                      } else if (p) {
                        setMyPlannedSessions(prev => prev.map(x => x.id === p.id ? ({
                          ...x,
                          time: t ? `${t} - ${t}` : x.time
                        }) : x));
                      }
                    }} />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Lien</label>
                  <Input defaultValue={s ? s.link : (p?.link || '')} onChange={(e) => {
                    const v = e.target.value;
                    if (s) setUpcomingSessions(prev => prev.map(x => x.id === s.id ? ({ ...x, link: v }) : x));
                    if (p) setMyPlannedSessions(prev => prev.map(x => x.id === p.id ? ({ ...x, link: v }) : x));
                  }} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Description</label>
                  <Textarea defaultValue={s?.description} onChange={(e) => {
                    const v = e.target.value;
                    if (s) setUpcomingSessions(prev => prev.map(x => x.id === s.id ? ({ ...x, description: v }) : x));
                  }} />
                </div>
              </div>
            );
          })()}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setEditSessionId(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
