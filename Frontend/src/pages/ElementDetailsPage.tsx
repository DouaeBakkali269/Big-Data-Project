import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Video, Upload, Zap, Award, Star, Users, ChevronRight, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ElementDetailsPage = () => {
  const { year, major, level, module, element } = useParams();
  const navigate = useNavigate();

  // Dummy data for Lassqat uploads and ratings
  const lassqatUploads = [
    { type: 'PDF', title: 'Résumé - ' + element, uploader: 'Student A', rating: 4.5 },
    { type: 'Video', title: 'Session Enregistrée', uploader: 'Student B', rating: 4.8 }
  ];
  const comments = [
    { user: 'Student C', stars: 5, text: 'Très utile !' },
    { user: 'Student D', stars: 4, text: 'Bon résumé.' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <button onClick={() => navigate(-1)} className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <ChevronRight className="w-4 h-4" />
          <span>{year}</span>
          <ChevronRight className="w-4 h-4" />
          <span>{major}</span>
          <ChevronRight className="w-4 h-4" />
          <span>{level}</span>
          <ChevronRight className="w-4 h-4" />
          <span>{module}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{element}</span>
        </div>

        {/* Header */}
        <Card className="shadow-card border-0 bg-gradient-card mb-6">
          <CardHeader>
            <CardTitle className="text-3xl">{element}</CardTitle>
            <CardDescription>Module {module} • {major} • Promotion {year} • {level}</CardDescription>
            <div className="flex gap-2 mt-2">
              <Badge className="text-xs">{year}</Badge>
              <Badge className="text-xs">{major}</Badge>
              <Badge className="text-xs">{level}</Badge>
              <Badge className="text-xs">{module}</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="lassqat" className="w-full">
          <TabsList>
            <TabsTrigger value="lassqat">Lassqat</TabsTrigger>
            <TabsTrigger value="ai">Outils IA</TabsTrigger>
            <TabsTrigger value="comments">Avis</TabsTrigger>
          </TabsList>

          <TabsContent value="lassqat">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Lassqat disponibles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lassqatUploads.map((l, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-lg bg-background/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {l.type === 'PDF' ? <FileText className="w-5 h-5 text-primary" /> : <Video className="w-5 h-5 text-primary" />}
                        <div className="flex flex-col">
                          <span className="font-medium">{l.title}</span>
                          <span className="text-xs text-muted-foreground">par {l.uploader}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{l.rating}</span>
                        </div>
                        <Button size="sm" variant="outline">Voir</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="default" className="w-full mt-6">
                  <Upload className="w-4 h-4 mr-2" />
                  Uploader un nouveau Lassqa
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Zap className="w-5 h-5 text-primary" /> Outils IA</CardTitle>
                <CardDescription>Générez des flashcards et pratiquez des QCM/Q&A basés sur ce contenu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    Générer des Flashcards
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Award className="w-4 h-4 mr-2 text-green-500" />
                    Pratiquer QCM/Q&A
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary" /> Avis des étudiants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comments.map((c, idx) => (
                    <div key={idx} className="p-3 border border-border rounded-lg bg-background/50">
                      <div className="flex items-center gap-2 mb-1">
                        {[...Array(c.stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500" />)}
                        <span className="font-medium">{c.user}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{c.text}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ElementDetailsPage;
