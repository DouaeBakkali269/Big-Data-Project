import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award,
  FileText,
  Video,
  Star,
  ArrowRight
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import heroImage from '@/assets/hero-students.jpg';

const LandingPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Organized Modules',
      description: 'Access all your course materials organized by modules and elements for easy navigation.'
    },
    {
      icon: FileText,
      title: 'Quality Lassqat',
      description: 'Get summaries, explanations, and corrected past exams from top students.'
    },
    {
      icon: Video,
      title: 'Live Sessions',
      description: 'Join live study sessions and collaborative learning with your peers.'
    },
    {
      icon: Users,
      title: 'Active Community',
      description: 'Connect with fellow ENSIAS students, ask questions, and share knowledge.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Students' },
    { number: '1000+', label: 'Lassqat Shared' },
    { number: '50+', label: 'Modules Covered' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-academic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LassqatHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="hero">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative text-center lg:text-left">
                {/* Watermark logo behind hero copy */}
                <img
                  src="/ensias-logo.svg"
                  aria-hidden
                  className="hidden md:block pointer-events-none select-none absolute -top-10 -left-6 w-40 md:w-60 opacity-10 blur-[1px] rotate-[-6deg]"
                />
                {/* ENSIAS Logo with animated shine badge */}
                <BrandLogo variant="shine" size="md" className="mb-4" />
                <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                  Smart way to prepare for{' '}
                  <span className="text-primary-foreground/90">ENSIAS exams</span>
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                  Accédez à des Lassqat de qualité, collaborez avec vos pairs, et excellez dans vos examens avec la plateforme d'étude la plus complète pour les étudiants ENSIAS.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/dashboard">
                    <Button variant="hero" size="lg" className="w-full sm:w-auto">
                      Join LassqatHub
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground hover:text-primary">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="ENSIAS students collaborating" 
                  className="rounded-2xl shadow-hover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and resources ENSIAS students need to excel in their studies.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-card hover:shadow-hover transition-all duration-200 bg-gradient-card">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Award className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to boost your academic performance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of ENSIAS students who are already using LassqatHub to excel in their studies.
          </p>
          <Link to="/dashboard">
            <Button variant="hero" size="lg">
              Start Learning Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LassqatHub</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 LassqatHub. Made for ENSIAS students.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;