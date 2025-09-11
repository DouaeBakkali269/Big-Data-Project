import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  FileText, 
  Video,
  Award,
  Calculator,
  Code,
  Database,
  Cpu,
  Globe,
  Brain,
  Smartphone,
  ShieldCheck,
  ChevronRight,
  Star,
  Users
} from 'lucide-react';

const ModulesPage = () => {
  const semesters = [
    {
      id: 1,
      name: 'Semester 1',
      modules: [
        {
          id: 1,
          name: 'Mathematics I',
          code: 'MATH101',
          icon: Calculator,
          elements: ['Linear Algebra', 'Probability', 'Statistics'],
          lassqatCount: 24,
          examCount: 8,
          rating: 4.7,
          color: 'blue'
        },
        {
          id: 2,
          name: 'Programming Fundamentals',
          code: 'PROG101',
          icon: Code,
          elements: ['C Programming', 'Algorithms', 'Data Structures'],
          lassqatCount: 31,
          examCount: 12,
          rating: 4.8,
          color: 'green'
        },
        {
          id: 3,
          name: 'Computer Architecture',
          code: 'ARCH101',
          icon: Cpu,
          elements: ['CPU Design', 'Memory Systems', 'Assembly'],
          lassqatCount: 18,
          examCount: 6,
          rating: 4.5,
          color: 'purple'
        }
      ]
    },
    {
      id: 2,
      name: 'Semester 2',
      modules: [
        {
          id: 4,
          name: 'Object Oriented Programming',
          code: 'OOP201',
          icon: Code,
          elements: ['Java Basics', 'Inheritance', 'Polymorphism', 'Design Patterns'],
          lassqatCount: 42,
          examCount: 15,
          rating: 4.9,
          color: 'orange'
        },
        {
          id: 5,
          name: 'Database Systems',
          code: 'DB201',
          icon: Database,
          elements: ['SQL', 'Normalization', 'Transactions', 'NoSQL'],
          lassqatCount: 28,
          examCount: 10,
          rating: 4.6,
          color: 'cyan'
        },
        {
          id: 6,
          name: 'Computer Networks',
          code: 'NET201',
          icon: Globe,
          elements: ['TCP/IP', 'Routing', 'Security', 'Protocols'],
          lassqatCount: 35,
          examCount: 11,
          rating: 4.7,
          color: 'indigo'
        }
      ]
    },
    {
      id: 3,
      name: 'Semester 3',
      modules: [
        {
          id: 7,
          name: 'Artificial Intelligence',
          code: 'AI301',
          icon: Brain,
          elements: ['Machine Learning', 'Neural Networks', 'NLP', 'Computer Vision'],
          lassqatCount: 38,
          examCount: 13,
          rating: 4.8,
          color: 'pink'
        },
        {
          id: 8,
          name: 'Mobile Development',
          code: 'MOB301',
          icon: Smartphone,
          elements: ['Android', 'iOS', 'React Native', 'Flutter'],
          lassqatCount: 22,
          examCount: 8,
          rating: 4.5,
          color: 'yellow'
        },
        {
          id: 9,
          name: 'Cybersecurity',
          code: 'SEC301',
          icon: ShieldCheck,
          elements: ['Cryptography', 'Ethical Hacking', 'Risk Assessment'],
          lassqatCount: 19,
          examCount: 7,
          rating: 4.6,
          color: 'red'
        }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      cyan: 'bg-cyan-100 text-cyan-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      pink: 'bg-pink-100 text-pink-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Modules & Elements
          </h1>
          <p className="text-muted-foreground">
            Explore all ENSIAS modules and access Lassqat organized by elements.
          </p>
        </div>

        {/* Semesters */}
        <div className="space-y-8">
          {semesters.map((semester) => (
            <Card key={semester.id} className="shadow-card border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="w-6 h-6 text-primary" />
                  {semester.name}
                </CardTitle>
                <CardDescription>
                  {semester.modules.length} modules available with comprehensive Lassqat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {semester.modules.map((module) => (
                    <Card key={module.id} className="border border-border hover:shadow-hover transition-all duration-200 bg-background/80">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(module.color)}`}>
                              <module.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{module.name}</CardTitle>
                              <Badge variant="outline" className="text-xs">{module.code}</Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {/* Elements */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Elements:</h4>
                          <div className="flex flex-wrap gap-1">
                            {module.elements.map((element, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {element}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{module.lassqatCount} Lassqat</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{module.examCount} Exams</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-muted-foreground">{module.rating}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            View Lassqat
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Video className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="mt-8 shadow-card border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle>Module Statistics</CardTitle>
            <CardDescription>Overview of all modules and content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">9</div>
                <div className="text-sm text-muted-foreground">Total Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">257</div>
                <div className="text-sm text-muted-foreground">Total Lassqat</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">89</div>
                <div className="text-sm text-muted-foreground">Past Exams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">4.7</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ModulesPage;