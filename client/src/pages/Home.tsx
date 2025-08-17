import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, BookOpen, Video, Shield, Users, Star, Award, BarChart3, User } from "lucide-react";
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
    <div className="min-h-full bg-gradient-to-br from-green-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Ultra-Enhanced Hero Section with High Impact */}
      <section className="relative px-4 py-16 overflow-hidden">
        {/* Multi-layered Background System */}
        <div className="absolute inset-0">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-500 to-teal-600"></div>
          {/* Secondary Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-emerald-500/20"></div>
          {/* Islamic Pattern */}
          <div className="absolute inset-0 islamic-pattern opacity-30"></div>
          {/* Animated Mesh */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-green-400/10 animate-pulse-soft"></div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 right-12 w-32 h-32 bg-gradient-to-br from-white/20 to-yellow-300/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-24 left-8 w-24 h-24 bg-gradient-to-br from-emerald-300/40 to-white/20 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-40 left-16 w-16 h-16 bg-white/25 rounded-full animate-pulse-soft"></div>
        <div className="absolute bottom-40 right-20 w-20 h-20 bg-yellow-300/30 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

        {/* Main Content with Enhanced Design */}
        <div className="relative z-10 animate-slide-up">
          <div className="max-w-lg mx-auto">
            {/* Enhanced Glassmorphism Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 text-center text-white border border-white/20 shadow-2xl">
              {/* Logo Section */}
              <div className="mb-8 animate-fade-scale">
                <div className="relative">
                  <img
                    src={tokenPediaLogo}
                    alt="TokenPedia Logo - Digitalisasi Pesantren"
                    className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl filter brightness-110"
                  />
                  {/* Glowing effect behind logo */}
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                </div>
                
                {/* Heart Icon with Enhanced Design */}
                <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-3xl mx-auto mb-6 flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
                  <Heart className="text-white animate-pulse-soft drop-shadow-lg" size={32} />
                </div>
              </div>

              {/* Enhanced Typography */}
              <div className="spacing-content">
                <h1 className="heading-display text-4xl mb-4 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-lg">
                  TokenPedia
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full mx-auto mb-4"></div>
                <h2 className="heading-title text-2xl mb-6 text-white/95 drop-shadow-md">
                  Mental Health Santri
                </h2>
              </div>

              <p className="body-text text-white/90 text-lg leading-relaxed mb-10 px-4 drop-shadow-sm">
                Platform <span className="font-semibold text-yellow-200">assessment dan edukasi</span> kesehatan mental yang dirancang khusus untuk mendukung kesejahteraan psikologis santri dengan <span className="font-semibold text-emerald-200">pendekatan islami</span> dan modern
              </p>

            {/* Enhanced Action Buttons */}
              <div className="space-y-6">
                <Button
                  onClick={() => setLocation("/assessment")}
                  className="w-full bg-gradient-to-r from-white to-yellow-50 text-emerald-700 hover:from-yellow-50 hover:to-white hover:text-emerald-800 px-10 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 transform touch-target focus-ring text-lg"
                  data-testid="start-assessment-hero"
                >
                  <Shield className="mr-3" size={24} />
                  Mulai Assessment Kesehatan Mental
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setLocation("/education")}
                    variant="outline"
                    className="bg-white/15 border-white/60 text-white hover:bg-white/25 px-6 py-4 rounded-xl font-semibold backdrop-blur-md touch-target focus-ring shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    data-testid="education-hero"
                  >
                    <BookOpen className="mr-2" size={20} />
                    Edukasi
                  </Button>

                  <Button
                    onClick={() => setLocation("/profile")}
                    variant="outline"
                    className="bg-white/15 border-white/60 text-white hover:bg-white/25 px-6 py-4 rounded-xl font-semibold backdrop-blur-md touch-target focus-ring shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          </div>
        </div>
      </section>

      {/* Enhanced Stats Cards */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="modern-card animate-slide-up border-0 shadow-xl" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Award className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="stats-completed">
                {stats.completed}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Assessment Selesai</div>
            </CardContent>
          </Card>

          <Card className="modern-card animate-slide-up border-0 shadow-xl" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" data-testid="stats-progress">
                {stats.progress}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Sedang Berjalan</div>
            </CardContent>
          </Card>

          <Card className="modern-card animate-slide-up border-0 shadow-xl" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                <Video className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400" data-testid="stats-videos">
                {stats.videos}
              </div>
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Video Ditonton</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Fitur Unggulan TokenPedia
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="modern-card animate-slide-up border-0 shadow-lg" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="text-green-600 dark:text-green-400" size={28} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Assessment Terpercaya</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">5 skala psikologi tervalidasi untuk evaluasi komprehensif</p>
            </CardContent>
          </Card>

          <Card className="modern-card animate-slide-up border-0 shadow-lg" style={{animationDelay: '0.5s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={28} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Edukasi Islami</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Materi kesehatan mental dengan perspektif Islam</p>
            </CardContent>
          </Card>

          <Card className="modern-card animate-slide-up border-0 shadow-lg" style={{animationDelay: '0.6s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <Users className="text-yellow-600 dark:text-yellow-400" size={28} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Komunitas Santri</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Platform khusus untuk santri Indonesia</p>
            </CardContent>
          </Card>

          <Card className="modern-card animate-slide-up border-0 shadow-lg" style={{animationDelay: '0.7s'}}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <Star className="text-purple-600 dark:text-purple-400" size={28} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Progres Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Pantau perkembangan kesehatan mental Anda</p>
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
              (a: any) => a.type === assessment.id
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