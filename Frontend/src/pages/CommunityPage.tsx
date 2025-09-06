import Navigation from '@/components/Navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Search, Send, Paperclip, MoreVertical, ArrowLeft } from 'lucide-react';

const CommunityPage = () => {
  const { toast } = useToast();
  const currentUser = { name: 'Moi', major: 'GL' as 'GL' | 'GD' | 'SIDS' | 'IA' | 'RI', level: '2A' as '1A' | '2A' | '3A' };

  type Message = { id: number; author: string; text: string; time: string; mine?: boolean };
  type Thread = { id: number; title: string; channel: string; major: 'GL' | 'GD' | 'SIDS' | 'IA' | 'RI'; level: '1A' | '2A' | '3A'; avatar?: string; unread: number; pinned?: boolean; messages: Message[] };

  const channels = [
    { name: 'annonces-generales', type: 'announcement' },
    { name: 'questions-examens', type: 'help' },
    { name: 'partage-ressources', type: 'resources' },
    { name: 'projets-collaboratifs', type: 'projects' },
    { name: 'discussions-libres', type: 'general' },
  ];

  const [query, setQuery] = useState('');
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newChat, setNewChat] = useState({ title: '', channel: 'discussions-libres' });

  const [threads, setThreads] = useState<Thread[]>([
    { id: 1, title: 'Bases de Données Avancées', channel: 'partage-ressources', major: 'GL', level: '2A', avatar: '/placeholder.svg', unread: 2, pinned: true, messages: [
      { id: 1, author: 'Sara', text: 'Nouveau Lassqa partagé (PDF) 👍', time: '09:14' },
      { id: 2, author: 'Moi', text: 'Merci ! Je révise ça aujourd’hui.', time: '09:20', mine: true },
    ] },
    { id: 2, title: 'Questions Examens — IA', channel: 'questions-examens', major: 'GL', level: '2A', avatar: '/placeholder.svg', unread: 0, messages: [
      { id: 1, author: 'Ahmed', text: 'Des conseils pour l’exo de ML ?', time: '08:02' },
      { id: 2, author: 'Moi', text: 'Travailler les métriques + régularisation.', time: '08:10', mine: true },
    ] },
    { id: 3, title: 'Rappels Annonces', channel: 'annonces-generales', major: 'GL', level: '2A', avatar: '/placeholder.svg', unread: 1, messages: [
      { id: 1, author: 'Admin', text: 'Réunion GL demain 10h (Amphi C).', time: '07:30' },
    ] },
    { id: 4, title: 'GL 2A — POO', channel: 'discussions-libres', major: 'GL', level: '2A', avatar: '/placeholder.svg', unread: 0, messages: [
      { id: 1, author: 'Nadia', text: 'Bienvenue sur le groupe POO !', time: '09:00' },
    ] },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [composer, setComposer] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = ((): [URLSearchParams] => {
    try {
      const sp = new URLSearchParams(window.location.search);
      return [sp];
    } catch {
      return [new URLSearchParams()];
    }
  })();

  // On mount: if URL params have title/channel, try select existing or prefill create dialog
  useEffect(() => {
    const threadId = searchParams.get('threadId');
    if (threadId) {
      const idNum = Number(threadId);
      if (!Number.isNaN(idNum)) {
        const exists = threads.find(t => t.id === idNum);
        if (exists) {
          setSelectedId(exists.id);
          return;
        }
      }
    }
    const title = searchParams.get('title');
    const channel = searchParams.get('channel');
    if (!title && !channel) return;
    const byTitle = title ? threads.find(t => t.title.toLowerCase() === title.toLowerCase()) : undefined;
    if (byTitle) {
      setSelectedId(byTitle.id);
      return;
    }
    if (title) {
      setShowNewDialog(true);
      setNewChat({ title, channel: channel || 'discussions-libres' });
    }
  // we intentionally run only once on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredThreads = useMemo(() => {
    const scoped = threads.filter(t => t.major === currentUser.major);
    const q = query.trim().toLowerCase();
    const base = q ? scoped.filter(t => t.title.toLowerCase().includes(q) || t.channel.toLowerCase().includes(q) || t.messages.some(m => m.text.toLowerCase().includes(q))) : scoped;
    return base.slice().sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.unread - a.unread || b.id - a.id);
  }, [threads, currentUser.major, query]);

  const selectedThread = useMemo(() => filteredThreads.find(t => t.id === selectedId) ?? null, [filteredThreads, selectedId]);

  const sendMessage = () => {
    const text = composer.trim();
    if (!text || !selectedThread) return;
    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setThreads(prev => prev.map(t => t.id === selectedThread.id ? { ...t, messages: [...t.messages, { id: t.messages.length + 1, author: currentUser.name, text, time, mine: true }] } : t));
    setComposer('');
  };
  // Auto-scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThread?.messages.length]);
  const markAsRead = (id: number) => setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: 0 } : t));

  const createChat = () => {
    if (!newChat.title.trim()) return;
    const id = Math.max(0, ...threads.map(t => t.id)) + 1;
    setThreads(prev => [{ id, title: newChat.title.trim(), channel: newChat.channel, major: currentUser.major, level: currentUser.level, avatar: '/placeholder.svg', unread: 0, messages: [ { id: 1, author: currentUser.name, text: 'Chat créé 🎉', time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }), mine: true } ] }, ...prev]);
    setShowNewDialog(false);
    setNewChat({ title: '', channel: 'discussions-libres' });
    toast({ title: 'Nouveau chat', description: 'Discussion créée.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Communauté ENSIAS</h1>
            <p className="text-muted-foreground">WhatsApp-like chats par filière (majeure) et niveau.</p>
          </div>
          <Button onClick={() => setShowNewDialog(true)} className="rounded-full">
            <PlusCircle className="w-4 h-4 mr-2" /> Nouveau chat
          </Button>
        </div>

        {/* Top filters */}
    <Card className="shadow-card border-0 bg-gradient-card mb-6 elevate-hover">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-muted-foreground" />
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher un chat ou un message" className="rounded-full" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {channels.map(c => (<Badge key={c.name} variant="outline">#{c.name}</Badge>))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-[360px_1fr] gap-4">
          {/* Chat list */}
          <Card className="shadow-card border-0 bg-gradient-card h-[75vh] flex flex-col elevate-hover">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Chats</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex-1">
              <ScrollArea className="h-full pr-2">
                <div className="space-y-1">
                  {filteredThreads.map(thread => {
                    const last = thread.messages[thread.messages.length - 1];
                    const isActive = thread.id === selectedId;
                    return (
                      <div key={thread.id} onClick={() => { setSelectedId(thread.id); markAsRead(thread.id); }} className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-colors ${isActive ? 'bg-accent' : 'hover:bg-accent'}`}>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={thread.avatar} />
                          <AvatarFallback>{thread.title.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <div className="truncate font-medium">{thread.title}</div>
                            <div className="text-xs text-muted-foreground">{last?.time}</div>
                          </div>
                          <div className="truncate text-sm text-muted-foreground">{last?.text}</div>
                        </div>
                        {thread.unread > 0 && (<Badge className="ml-auto h-5 px-2 rounded-full">{thread.unread}</Badge>)}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Thread view */}
          <Card className="shadow-card border-0 bg-gradient-card h-[75vh] flex flex-col elevate-hover">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gradient-hero rounded-t-xl">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedThread?.avatar} />
                  <AvatarFallback>{selectedThread?.title ? selectedThread.title.substring(0,2).toUpperCase() : 'CH'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{selectedThread?.title ?? 'Sélectionnez un chat'}</div>
                  {selectedThread && (<div className="text-xs text-muted-foreground">#{selectedThread.channel} • {selectedThread.level}</div>)}
                </div>
              </div>
              <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-6 py-4">
                <div className="space-y-2">
                  {selectedThread?.messages.map(m => (
                    <div key={m.id} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow-sm ${m.mine ? 'bg-primary text-primary-foreground' : 'bg-muted'} animate-in fade-in-0 slide-in-from-bottom-1`}> 
                        <div>{m.text}</div>
                        <div className={`text-[10px] mt-1 ${m.mine ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Composer */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 bg-background border border-border rounded-2xl p-2 elevate">
                <Button variant="ghost" size="icon"><Paperclip className="w-5 h-5" /></Button>
                <Input value={composer} onChange={(e) => setComposer(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder="Écrire un message" className="border-0 focus-visible:ring-0" />
                <Button onClick={sendMessage} disabled={!composer.trim()} className="rounded-full">
                  <Send className="w-4 h-4 mr-1" />
                  Envoyer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Nouveau chat */}
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Nouveau chat</DialogTitle>
            <DialogDescription>Créez une discussion pour votre filière et niveau.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Titre du chat"
              value={newChat.title}
              onChange={(e) => setNewChat(s => ({ ...s, title: e.target.value }))}
            />
            <Select value={newChat.channel} onValueChange={(v) => setNewChat(s => ({ ...s, channel: v }))}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Canal" /></SelectTrigger>
              <SelectContent>
                {channels.map(c => (
                  <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewDialog(false)}>Annuler</Button>
            <Button onClick={createChat}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;