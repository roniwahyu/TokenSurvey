import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  TrendingUp,
  BookOpen,
  Video,
  Shield,
  Users,
  Star,
  Award,
  BarChart3,
  User,
} from "lucide-react";
import AssessmentCard from "@/components/AssessmentCard";
import { assessmentTypes } from "@/lib/assessmentData";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import tokenPediaLogo from "@assets/logo_tokenpedia_nobg.png";

// Mock user ID for demo purposes
const MOCK_USER_ID = "demo-user";

export default function Home() {
  const [, setLocation] = useLocation();

  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "progress"],
  });

  const { data: assessments = [] } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "assessments"],
  });

  const handleStartAssessment = (assessmentType: string) => {
    setLocation(`/assessment?type=${assessmentType}`);
  };

  const stats = {
    completed: (userProgress as any)?.assessmentsCompleted || 0,
    progress: (userProgress as any)?.assessmentsInProgress || 0,
    videos: (userProgress as any)?.videosWatched || 0,
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* TOKEN PEDIA Hero Section */}
      <section className="relative px-4 py-16 overflow-hidden">
        {/* Background System */}
        <div className="absolute inset-0">
          {/* Primary Gradient - Teal to Blue */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, #00BFA5 0%, #2196F3 100%)'
          }}></div>
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"></div>
          {/* Islamic Geometric Pattern */}
          <div className="absolute inset-0 islamic-pattern opacity-20"></div>
          {/* Hexagonal Pattern */}
          <div className="absolute inset-0 geometric-hexagon opacity-30"></div>
        </div>

        {/* Floating Particles - Islamic Stars */}
        <div className="absolute top-20 right-12 w-8 h-8 text-white/40 animate-particles text-2xl">✦</div>
        <div
          className="absolute bottom-32 left-8 w-6 h-6 text-white/30 animate-particles text-xl"
          style={{ animationDelay: "1.5s" }}
        >✧</div>
        <div
          className="absolute top-40 left-16 w-4 h-4 text-white/50 animate-particles text-lg"
          style={{ animationDelay: "0.5s" }}
        >✦</div>
        <div
          className="absolute bottom-40 right-20 w-5 h-5 text-white/40 animate-particles text-lg"
          style={{ animationDelay: "2s" }}
        >✧</div>
        
        {/* Additional floating geometric elements */}
        <div className="absolute top-32 right-24 w-16 h-16 border border-white/20 rounded-full animate-float blur-sm"></div>
        <div
          className="absolute bottom-48 left-16 w-12 h-12 border border-white/15 rounded-lg rotate-45 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Main Content with TOKEN PEDIA Design */}
        <div className="relative z-10 animate-slide-up">
          <div className="max-w-lg mx-auto">
            {/* Glassmorphism Card */}
            <div className="glassmorphism-enhanced rounded-3xl p-10 text-center text-white shadow-2xl">
              {/* Logo Section */}
              <div className="mb-8 animate-fade-scale">
                <div className="relative">
                  <img
                    src={tokenPediaLogo}
                    alt="TokenPedia Logo - Platform Kesehatan Mental Santri"
                    className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl filter brightness-110 scale-on-tap"
                    style={{ width: '128px', height: '128px' }}
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute -inset-6 bg-white/10 rounded-full blur-2xl"></div>
                </div>
              </div>

              {/* Typography - Following TOKEN PEDIA specs */}
              <div className="spacing-content">
                <h1 className="heading-display mb-4 text-white drop-shadow-lg">
                  Selamat Datang di TOKEN PEDIA
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-white/70 to-white/30 rounded-full mx-auto mb-6"></div>
                <h2 className="heading-title mb-6 text-white/95 drop-shadow-md">
                  Jaga Kesehatan Mentalmu sebagai Santri
                </h2>
              </div>

              <p className="body-text text-white/90 leading-relaxed mb-10 px-2 drop-shadow-sm">
                Platform{" "}
                <span className="font-medium text-white">
                  assessment dan edukasi
                </span>{" "}
                kesehatan mental yang dirancang khusus untuk mendukung
                kesejahteraan psikologis santri dengan{" "}
                <span className="font-medium text-white">
                  pendekatan islami
                </span>{" "}
                dan modern
              </p>

              {/* Action Buttons with Ripple Effects */}
              <div className="space-y-6">
                <Button
                  onClick={() => setLocation("/assessment")}
                  className="w-full ripple-effect scale-on-tap rounded-xl shadow-2xl transition-all duration-300 transform focus-ring"
                  style={{
                    background: '#00BFA5',
                    color: 'white',
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    fontSize: '16px',
                    padding: '16px 40px'
                  }}
                  data-testid="start-assessment-hero"
                >
                  <Shield className="mr-3" size={24} />
                  Mulai Assessment
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setLocation("/education")}
                    variant="outline"
                    className="glassmorphism-card text-white hover:bg-white/25 px-6 py-4 rounded-xl font-semibold scale-on-tap transition-all duration-300"
                    style={{ fontFamily: 'Poppins', fontWeight: '500' }}
                    data-testid="education-hero"
                  >
                    <BookOpen className="mr-2" size={20} />
                    Edukasi
                  </Button>

                  <Button
                    onClick={() => setLocation("/profile")}
                    variant="outline"
                    className="glassmorphism-card text-white hover:bg-white/25 px-6 py-4 rounded-xl font-semibold scale-on-tap transition-all duration-300"
                    style={{ fontFamily: 'Poppins', fontWeight: '500' }}
                    data-testid="profile-hero"
                  >
                    <User className="mr-2" size={20} />
                    Profil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards with TOKEN PEDIA Design */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #4CAF50, #00BFA5)' }}>
                <Award className="text-white" size={24} />
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: '#4CAF50', fontFamily: 'Poppins' }}
                data-testid="stats-completed"
              >
                {stats.completed}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300" 
                   style={{ fontFamily: 'Roboto' }}>
                Assessment Selesai
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #2196F3, #00BFA5)' }}>
                <TrendingUp className="text-white" size={24} />
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: '#2196F3', fontFamily: 'Poppins' }}
                data-testid="stats-progress"
              >
                {stats.progress}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                Sedang Berjalan
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-xl rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #00BFA5, #4CAF50)' }}>
                <Video className="text-white" size={24} />
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: '#00BFA5', fontFamily: 'Poppins' }}
                data-testid="stats-videos"
              >
                {stats.videos}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                Video Ditonton
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section - Horizontal Scrollable as per specs */}
      <section className="px-4 mb-8">
        <h3 className="heading-title mb-6 text-center text-gray-900 dark:text-white" 
            style={{ fontFamily: 'Poppins' }}>
          Fitur Unggulan TOKEN PEDIA
        </h3>
        <div className="flex overflow-x-auto space-x-4 pb-4 mb-8 scrollbar-hide">
          {/* Horizontal Scrollable Cards - 150x200px as specified */}
          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-lg flex-shrink-0"
            style={{ 
              animationDelay: "0.4s",
              width: '150px',
              height: '200px'
            }}
          >
            <CardContent className="p-4 text-center h-full flex flex-col justify-between">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, #4CAF50, #00BFA5)' }}>
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: 'Poppins' }}>
                  Assessment Terpercaya
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                  5 skala psikologi tervalidasi
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-lg flex-shrink-0"
            style={{ 
              animationDelay: "0.5s",
              width: '150px',
              height: '200px'
            }}
          >
            <CardContent className="p-4 text-center h-full flex flex-col justify-between">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, #2196F3, #00BFA5)' }}>
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: 'Poppins' }}>
                  Edukasi Islami
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                  Materi kesehatan mental dengan perspektif Islam
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-lg flex-shrink-0"
            style={{ 
              animationDelay: "0.6s",
              width: '150px',
              height: '200px'
            }}
          >
            <CardContent className="p-4 text-center h-full flex flex-col justify-between">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, #00BFA5, #4CAF50)' }}>
                <Users className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: 'Poppins' }}>
                  Komunitas Santri
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                  Platform khusus untuk santri Indonesia
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-lg flex-shrink-0"
            style={{ 
              animationDelay: "0.7s",
              width: '150px',
              height: '200px'
            }}
          >
            <CardContent className="p-4 text-center h-full flex flex-col justify-between">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, #4CAF50, #2196F3)' }}>
                <Star className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: 'Poppins' }}>
                  Progres Tracking
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                  Pantau perkembangan kesehatan mental Anda
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="card-hover-lift animate-slide-up border-0 shadow-lg flex-shrink-0"
            style={{ 
              animationDelay: "0.8s",
              width: '150px',
              height: '200px'
            }}
          >
            <CardContent className="p-4 text-center h-full flex flex-col justify-between">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-2xl"
                   style={{ background: 'linear-gradient(135deg, #2196F3, #4CAF50)' }}>
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm"
                    style={{ fontFamily: 'Poppins' }}>
                  Tips Harian
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300"
                   style={{ fontFamily: 'Roboto' }}>
                  Tips kesehatan mental harian untuk santri
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Assessment Cards */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Assessment Tersedia
          </h3>
          <Button
            variant="ghost"
            onClick={() => setLocation("/assessment")}
            className="text-primary text-sm font-medium"
            data-testid="view-all-assessments"
          >
            Lihat Semua
          </Button>
        </div>

        <div className="space-y-4">
          {assessmentTypes.slice(0, 3).map((assessment) => {
            const userAssessment = (assessments as any[]).find(
              (a: any) => a.type === assessment.id,
            );
            const progress = userAssessment?.progress || 0;
            const isCompleted = userAssessment?.isCompleted || false;

            return (
              <AssessmentCard
                key={assessment.id}
                id={assessment.id}
                title={assessment.title}
                description={assessment.description}
                duration={assessment.duration}
                questionCount={assessment.questionCount}
                progress={progress}
                isCompleted={isCompleted}
                color={assessment.color}
                onStart={handleStartAssessment}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
