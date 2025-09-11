import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  GraduationCap,
  ChevronRight,
  ArrowLeft,
  FileText,
  Video,
  Upload,
  Brain,
  Zap,
  Star,
  Users,
  Award,
  Code,
  Calculator,
  Database,
  Globe,
  Cpu,
  Smartphone,
  ShieldCheck,
  ChartBar
} from 'lucide-react';
import { getCurrentUser } from '@/lib/user';

const LassqatPage = () => {
  // Auto-select the current user's promotion (year) and major to skip those steps
  const user = getCurrentUser();
  const [selectedYear, setSelectedYear] = useState<string | null>(user.year);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(user.major);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null); // S1..S4
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null); // P1, P2
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [rememberedLevel, setRememberedLevel] = useState<'1A' | '2A' | '3A' | null>(null);
  const navigate = useNavigate();

  // Persist and restore last chosen level (1A/2A/3A)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lassqat.level');
      if (saved === '1A' || saved === '2A' || saved === '3A') {
        setRememberedLevel(saved);
      }
    } catch {}
  }, []);

  const chooseLevel = (lvl: '1A' | '2A' | '3A') => {
    setSelectedLevel(lvl);
  setSelectedSemester(null);
  setSelectedPeriod(null);
    setRememberedLevel(lvl);
    try { localStorage.setItem('lassqat.level', lvl); } catch {}
  };

  const promotionYears = [
    { year: '2025', studentCount: 450, status: 'active' },
    { year: '2026', studentCount: 420, status: 'active' },
    { year: '2027', studentCount: 380, status: 'active' },
    { year: '2024', studentCount: 350, status: 'graduated' }
  ];
  const orderedPromotionYears = [...promotionYears].sort((a, b) => Number(a.year) - Number(b.year));

  const majors = [
    { code: 'GL', name: 'Génie Logiciel', icon: Code, color: 'blue', studentCount: 120 },
    { code: 'GD', name: 'Génie de la Data', icon: ChartBar, color: 'green', studentCount: 95 },
    { code: 'SIDS', name: 'Systèmes d\'Information & Data Science', icon: Database, color: 'purple', studentCount: 110 },
    { code: 'RI', name: 'Réseaux & Ingénierie', icon: Globe, color: 'orange', studentCount: 85 },
    { code: 'IA', name: 'Intelligence Artificielle', icon: Brain, color: 'pink', studentCount: 40 }
  ];

  const levels = [
    { level: '1A', name: '1ère Année', moduleCount: 8 },
    { level: '2A', name: '2ème Année', moduleCount: 10 },
    { level: '3A', name: '3ème Année', moduleCount: 12 }
  ];

  const modules = {
    '1A': [
      { 
        id: 1, 
        name: 'Mathématiques I', 
        code: 'MATH101', 
        icon: Calculator, 
        elements: ['Algèbre Linéaire', 'Probabilités', 'Statistiques'],
        lassqatCount: 24,
        rating: 4.7,
        color: 'blue'
      },
      { 
        id: 2, 
        name: 'Programmation Fondamentale', 
        code: 'PROG101', 
        icon: Code, 
        elements: ['Programmation C', 'Algorithmes', 'Structures de Données'],
        lassqatCount: 31,
        rating: 4.8,
        color: 'green'
      }
    ],
    '2A': [
      { 
        id: 3, 
        name: 'Programmation Orientée Objet', 
        code: 'OOP201', 
        icon: Code, 
        elements: ['Java Basics', 'Héritage', 'Polymorphisme', 'Design Patterns'],
        lassqatCount: 42,
        rating: 4.9,
        color: 'orange'
      },
      { 
        id: 4, 
        name: 'Systèmes de Bases de Données', 
        code: 'DB201', 
        icon: Database, 
        elements: ['SQL', 'Normalisation', 'Transactions', 'NoSQL'],
        lassqatCount: 28,
        rating: 4.6,
        color: 'cyan'
      }
    ],
    '3A': [
      { 
        id: 5, 
        name: 'Intelligence Artificielle', 
        code: 'AI301', 
        icon: Brain, 
        elements: ['Machine Learning', 'Réseaux de Neurones', 'NLP', 'Computer Vision'],
        lassqatCount: 38,
        rating: 4.8,
        color: 'pink'
      },
      { 
        id: 6, 
        name: 'Développement Mobile', 
        code: 'MOB301', 
        icon: Smartphone, 
        elements: ['Android', 'iOS', 'React Native', 'Flutter'],
        lassqatCount: 22,
        rating: 4.5,
        color: 'yellow'
      }
    ]
  };

  // Semesters available per level
  const semestersByLevel: Record<'1A' | '2A' | '3A', string[]> = {
    '1A': ['S1', 'S2'],
    '2A': ['S3', 'S4'],
    '3A': ['S5'],
  };
  // Periods are P1 and P2 for any semester
  const periods = ['P1', 'P2'];

  // Compute modules for a given level/semester/period
  const getPeriodModules = (lvl: '1A' | '2A' | '3A', sem: string, per: string) => {
    const all = modules[lvl as keyof typeof modules] || [];
    // Assign semesters to sample data (demo mapping)
    let semModules = [] as typeof all;
    if (lvl === '1A') {
      semModules = sem === 'S1' ? all : [];
    } else if (lvl === '2A') {
      semModules = sem === 'S3' ? all : [];
    } else if (lvl === '3A') {
      semModules = sem === 'S5' ? all : [];
    }
    const mid = Math.ceil(semModules.length / 2);
    if (per === 'P1') return semModules.slice(0, mid);
    return semModules.slice(mid);
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const resetToYears = () => {
    setSelectedYear(null);
    setSelectedMajor(null);
    setSelectedLevel(null);
  setSelectedSemester(null);
  setSelectedPeriod(null);
    setSelectedModule(null);
  };

  const resetToMajors = () => {
    setSelectedMajor(null);
    setSelectedLevel(null);
  setSelectedSemester(null);
  setSelectedPeriod(null);
    setSelectedModule(null);
  };

  const resetToLevels = () => {
    setSelectedLevel(null);
  setSelectedSemester(null);
  setSelectedPeriod(null);
    setSelectedModule(null);
  };

  const resetToModules = () => {
    setSelectedModule(null);
  };
  const resetToSemesters = () => {
    setSelectedSemester(null);
    setSelectedPeriod(null);
    setSelectedModule(null);
  };
  const resetToPeriods = () => {
    setSelectedPeriod(null);
    setSelectedModule(null);
  };

  if (selectedModule && selectedLevel) {
    const module = modules[selectedLevel as keyof typeof modules]?.find(m => m.id.toString() === selectedModule);
    if (module) {
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <button onClick={resetToSemesters} className="hover:text-foreground">{selectedLevel}</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={resetToPeriods} className="hover:text-foreground">{selectedSemester}</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={resetToModules} className="hover:text-foreground">{selectedPeriod}</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{module.name}</span>
            </div>

            {/* Module Header */}
            <Card className="shadow-card border-0 bg-gradient-card mb-8">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${getColorClasses(module.color)}`}>
                      <module.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{module.name}</CardTitle>
                      <Badge variant="outline" className="mt-2">{module.code}</Badge>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{module.lassqatCount} Lassqat</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{module.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button onClick={resetToModules} variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Elements - Minimal cards that navigate to full details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.elements.map((element, index) => (
                <Card
                  key={index}
                  className="shadow-card hover:shadow-hover transition-all duration-200 bg-background/80 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/element/${selectedYear}/${selectedMajor}/${selectedLevel}/${encodeURIComponent(module.name)}/${encodeURIComponent(element)}`,
                    )
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(module.color)}`}>
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{element}</CardTitle>
                          <CardDescription className="text-sm">Voir les détails et les Lassqat</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button size="sm" className="w-full">
                      Voir les Détails
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      );
    }
  }

  if (selectedLevel && selectedMajor && selectedYear) {
    // If semester and period are chosen, show modules for that period
    if (selectedSemester && selectedPeriod) {
      const level = selectedLevel as '1A' | '2A' | '3A';
      const levelModules = getPeriodModules(level, selectedSemester, selectedPeriod);
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <button onClick={resetToSemesters} className="hover:text-foreground">{selectedLevel}</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={resetToPeriods} className="hover:text-foreground">{selectedSemester}</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{selectedPeriod}</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Modules — {selectedLevel} • {selectedSemester} • {selectedPeriod}
                  </h1>
                </div>
                <Button onClick={resetToPeriods} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {levelModules.map((module) => (
                <Card 
                  key={module.id} 
                  className="shadow-card hover:shadow-hover transition-all duration-200 bg-background/80 cursor-pointer"
                  onClick={() => setSelectedModule(module.id.toString())}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(module.color)}`}>
                          <module.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">{module.code}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Éléments:</h4>
                      <div className="flex flex-wrap gap-1">
                        {module.elements.slice(0, 2).map((element, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {element}
                          </Badge>
                        ))}
                        {module.elements.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            {`+${module.elements.length - 2} plus`}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{module.lassqatCount} Lassqat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-muted-foreground">{module.rating}</span>
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      Explorer le Module
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      );
    }

    // If only level chosen so far, show semesters for that level
    if (selectedSemester && !selectedPeriod) {
      const level = selectedLevel as '1A' | '2A' | '3A';
      const sems = semestersByLevel[level];
      return (
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{selectedLevel}</span>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">Périodes — {selectedLevel} • {selectedSemester}</h1>
                  <p className="text-muted-foreground">Choisissez la période</p>
                </div>
                <Button onClick={resetToSemesters} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Retour
                </Button>
              </div>
            </div>

            {/* Periods Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {periods.map((p) => (
                <Card
                  key={p}
                  className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card cursor-pointer"
                  onClick={() => setSelectedPeriod(p)}
                >
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">Période {p === 'P1' ? '1' : '2'}</CardTitle>
                    <CardDescription>{selectedSemester}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </main>
        </div>
      );
    }

    // Show semesters list for the selected level
    const level = selectedLevel as '1A' | '2A' | '3A';
    const sems = semestersByLevel[level];
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{selectedLevel}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Semestres — {selectedLevel}</h1>
                <p className="text-muted-foreground">Choisissez le semestre</p>
              </div>
              <Button onClick={resetToLevels} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>

          {/* Semesters Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {sems.map((s) => (
              <Card 
                key={s} 
                className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card cursor-pointer"
                onClick={() => setSelectedSemester(s)}
              >
                <CardHeader className="text-center">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">Semestre {s}</CardTitle>
                  <CardDescription>Choisir la période</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
    
  }

  if (selectedMajor && selectedYear) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb removed to simplify flow */}
          <div className="mb-2" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Choisissez votre niveau d'étude</h1>
                <p className="text-muted-foreground">1A, 2A ou 3A</p>
              </div>
              <div />
            </div>
          </div>

          {/* Levels Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <Card 
                key={level.level} 
                className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card cursor-pointer"
                onClick={() => chooseLevel(level.level as '1A' | '2A' | '3A')}
              >
                <CardHeader className="text-center">
                  <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <CardDescription>
                    {level.moduleCount} modules disponibles
                  </CardDescription>
                  {/* Removed 'Sélectionné' marker */}
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full">
                    Accéder aux Semestres
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (selectedYear) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <button onClick={resetToYears} className="hover:text-foreground">Années</button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{selectedYear}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Filières - Promotion {selectedYear}
                </h1>
                <p className="text-muted-foreground">
                  Choisissez votre filière d'étude pour accéder aux modules et Lassqat
                </p>
              </div>
              <Button onClick={resetToYears} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </div>
          </div>

          {/* Majors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majors.map((major) => (
              <Card 
                key={major.code} 
                className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card cursor-pointer"
                onClick={() => setSelectedMajor(major.code)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(major.color)}`}>
                      <major.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{major.code}</CardTitle>
                      <CardDescription className="text-sm">{major.name}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{major.studentCount} membres</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    Explorer la Filière
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Default view - Promotion Years
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Lassqat par Promotion
          </h1>
          <p className="text-muted-foreground">
            Explorez les Lassqat organisés par année de promotion, filière, niveau et modules.
          </p>
        </div>

        {/* Promotion Years Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderedPromotionYears.map((year) => (
            <Card 
              key={year.year} 
              className="shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card cursor-pointer"
              onClick={() => setSelectedYear(year.year)}
            >
              <CardHeader className="text-center">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Promotion {year.year}</CardTitle>
                <CardDescription>
                  {year.studentCount} inscrits
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge 
                  variant={year.status === 'active' ? 'default' : 'secondary'}
                  className="mb-4"
                >
                  {year.status === 'active' ? 'Actif' : 'Diplômé'}
                </Badge>
                <Button className="w-full">
                  Voir les Filières
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8 shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle>Navigation Hierarchique</CardTitle>
            <CardDescription>Comment naviguer dans LassqatHub</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">1. Année</h4>
                <p className="text-sm text-muted-foreground">Choisissez votre promotion</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <Code className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">2. Filière</h4>
                <p className="text-sm text-muted-foreground">Sélectionnez votre spécialité</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">3. Niveau</h4>
                <p className="text-sm text-muted-foreground">1A, 2A ou 3A</p>
              </div>
              <div className="p-4 border border-border rounded-lg bg-background/50">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">4. Modules</h4>
                <p className="text-sm text-muted-foreground">Accédez aux Lassqat</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LassqatPage;