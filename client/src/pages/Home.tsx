import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp } from "lucide-react";
import AssessmentCard from "@/components/AssessmentCard";
import { assessmentTypes } from "@/lib/assessmentData";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";

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
    completed: userProgress?.assessmentsCompleted || 0,
    progress: userProgress?.assessmentsInProgress || 0,
    videos: userProgress?.videosWatched || 0,
  };

  return (
    <div className="min-h-full">
      {/* Hero Section with Glassmorphism */}
      <section className="relative px-4 py-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>

        <div className="relative z-10">
          <div className="glassmorphism rounded-2xl p-6 text-center text-white">
            <div className="mb-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Heart className="text-2xl text-white" size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Kesehatan Mental Santri</h2>
            <p className="text-white text-opacity-90 text-sm leading-relaxed mb-6">
              Platform assessment dan edukasi kesehatan mental yang dirancang khusus untuk mendukung kesejahteraan psikologis santri
            </p>
            <Button
              onClick={() => setLocation("/assessment")}
              className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              data-testid="start-assessment-hero"
            >
              Mulai Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1" data-testid="stats-completed">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Assessment Selesai</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent mb-1" data-testid="stats-progress">
                {stats.progress}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Sedang Berjalan</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary mb-1" data-testid="stats-videos">
                {stats.videos}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Video Edukasi</div>
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
            const userAssessment = assessments.find(
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
