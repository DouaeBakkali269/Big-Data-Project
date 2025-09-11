import React from 'react';
import Navigation from '@/components/Navigation';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, FileText, Link as LinkIcon, Users, ArrowLeft, Pencil, Upload as UploadIcon } from 'lucide-react';
import { getCurrentUser } from '@/lib/user';

type Session = {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  startISO: string;
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
};

const SessionDetailsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: Session };
  const user = getCurrentUser();
  const [session, setSession] = React.useState(state as Session | undefined);

  if (!session) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto p-6">
          <Button variant="outline" onClick={() => navigate(-1)} className="mb-4"><ArrowLeft className="w-4 h-4 mr-1" /> Retour</Button>
          <Card>
            <CardHeader>
              <CardTitle>Session introuvable</CardTitle>
              <CardDescription>Revenez à la planification et réessayez.</CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    );
  }

  const isOwner = user?.name === session.organizer;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}><ArrowLeft className="w-4 h-4 mr-1" /> Retour</Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {session.title}
              <Badge variant="outline">{session.level}</Badge>
              {session.status !== 'en_preparation' && <Badge>{session.status}</Badge>}
            </CardTitle>
            <CardDescription>{session.module} — {session.element}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {session.date}</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {session.time}</div>
            {session.description && <p className="text-foreground">{session.description}</p>}
            {session.link && (
              <a href={session.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary">
                <LinkIcon className="w-4 h-4" /> Rejoindre la réunion
              </a>
            )}
            {session.pdfUrl && (
              <a href={session.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" /> {session.pdfTitle || 'Lassqa PDF'}
              </a>
            )}
          </CardContent>
        </Card>

        {isOwner && session && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Pencil className="w-5 h-5" /> Modifier</CardTitle>
                <CardDescription>Mettez à jour date/heure, description et lien.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Date</label>
                    <Input type="date" defaultValue={session.startISO.split('T')[0]} onChange={(e) => {
                      const d = e.target.value; const t = session.startISO.split('T')[1]?.slice(0,5) || '00:00';
                      setSession({ ...session, startISO: `${d}T${t}:00`, date: new Date(`${d}T${t}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }), time: `${t} - ${t}` });
                    }} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Heure</label>
                    <Input type="time" defaultValue={session.startISO.split('T')[1]?.slice(0,5) || ''} onChange={(e) => {
                      const t = e.target.value; const d = session.startISO.split('T')[0];
                      setSession({ ...session, startISO: `${d}T${t}:00`, date: new Date(`${d}T${t}`).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }), time: `${t} - ${t}` });
                    }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Lien</label>
                  <Input defaultValue={session.link} onChange={(e) => setSession({ ...session, link: e.target.value })} placeholder="https://…" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Description</label>
                  <Textarea defaultValue={session.description} onChange={(e) => setSession({ ...session, description: e.target.value })} />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => navigate(-1)}>Enregistrer</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Inscrits</CardTitle>
                <CardDescription>Visible uniquement par l’organisateur</CardDescription>
              </CardHeader>
              <CardContent>
                {session.subscribers.length === 0 ? (
                  <div className="text-sm text-muted-foreground">Aucun inscrit pour l’instant.</div>
                ) : (
                  <ul className="list-disc pl-5 text-sm">
                    {session.subscribers.map((u, i) => (<li key={i}>{u}</li>))}
                  </ul>
                )}
                <div className="mt-3">
                  <Button size="sm" variant="outline" className="mr-2"><UploadIcon className="w-4 h-4 mr-1" /> Uploader PDF</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Comments could live here in the future */}
      </main>
    </div>
  );
};

export default SessionDetailsPage;
