import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Eye, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import AssessmentResultCard from "@/components/AssessmentResultCard";
import { format } from "date-fns";

// Mock user ID for demo purposes
const MOCK_USER_ID = "demo-user";

type FilterType = "all" | "completed" | "in_progress";

export default function History() {
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: assessments = [], isLoading } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "assessments"],
  });

  const { data: results = [] } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "results"],
  });

  const filteredAssessments = assessments.filter((assessment: any) => {
    if (filter === "completed") return assessment.isCompleted;
    if (filter === "in_progress") return !assessment.isCompleted && assessment.progress > 0;
    return true;
  });

  const getFilterButtonStyle = (currentFilter: FilterType, buttonFilter: FilterType) => {
    return currentFilter === buttonFilter
      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300";
  };

  const getResultForAssessment = (assessmentId: string) => {
    return results.find((result: any) => result.assessmentId === assessmentId);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-5">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Riwayat Assessment
      </h2>
      
      {/* Filter tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        <Button
          variant="ghost"
          onClick={() => setFilter("all")}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all",
            getFilterButtonStyle(filter, "all")
          )}
          data-testid="filter-all"
        >
          Semua
        </Button>
        <Button
          variant="ghost"
          onClick={() => setFilter("completed")}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all",
            getFilterButtonStyle(filter, "completed")
          )}
          data-testid="filter-completed"
        >
          Selesai
        </Button>
        <Button
          variant="ghost"
          onClick={() => setFilter("in_progress")}
          className={cn(
            "flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all",
            getFilterButtonStyle(filter, "in_progress")
          )}
          data-testid="filter-in-progress"
        >
          Berlangsung
        </Button>
      </div>

      {/* History Items */}
      <div className="space-y-4">
        {filteredAssessments.length === 0 ? (
          <Card className="border border-gray-100 dark:border-gray-700">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CalendarDays className="text-gray-400" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Belum ada riwayat
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {filter === "completed"
                  ? "Anda belum menyelesaikan assessment apapun."
                  : filter === "in_progress"
                  ? "Tidak ada assessment yang sedang berlangsung."
                  : "Mulai assessment pertama Anda untuk melihat riwayat."}
              </p>
              <Button
                onClick={() => window.location.href = "/assessment"}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="start-first-assessment"
              >
                Mulai Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAssessments.map((assessment: any) => {
            const result = getResultForAssessment(assessment.id);
            return (
              <AssessmentResultCard
                key={assessment.id}
                assessment={assessment}
                result={result}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

// Mock user ID for demo purposes
const MOCK_USER_ID = "demo-user";

const severityColors = {
  "Minimal": "bg-green-100 text-green-800 border-green-200",
  "Ringan": "bg-yellow-100 text-yellow-800 border-yellow-200", 
  "Sedang": "bg-orange-100 text-orange-800 border-orange-200",
  "Berat": "bg-red-100 text-red-800 border-red-200",
  "Sangat Berat": "bg-purple-100 text-purple-800 border-purple-200",
  "Normal": "bg-blue-100 text-blue-800 border-blue-200"
};

export default function History() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("all");

  const { data: assessments = [] } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "assessments"],
  });

  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "progress"],
  });

  const completedAssessments = assessments.filter((a: any) => a.isCompleted);
  const inProgressAssessments = assessments.filter((a: any) => !a.isCompleted);

  const filteredAssessments = filter === "completed" 
    ? completedAssessments 
    : filter === "progress" 
    ? inProgressAssessments 
    : assessments;

  const stats = {
    total: assessments.length,
    completed: completedAssessments.length,
    inProgress: inProgressAssessments.length,
    averageScore: completedAssessments.length > 0 
      ? Math.round(completedAssessments.reduce((sum: number, a: any) => sum + (a.totalScore || 0), 0) / completedAssessments.length)
      : 0
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-md hover:shadow-lg transition-all"
              data-testid="back-to-home"
            >
              <ChevronLeft className="text-gray-600 dark:text-gray-300" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Riwayat Assessment
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pantau perkembangan kesehatan mental Anda
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              data-testid="share-results"
            >
              <Share2 size={16} />
              <span>Bagikan</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2"
              data-testid="download-report"
            >
              <Download size={16} />
              <span>Unduh</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <FileText className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.total}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Total Assessment
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.completed}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Selesai
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Clock className="text-yellow-600 dark:text-yellow-400" size={20} />
              </div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.inProgress}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Berlangsung
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <BarChart3 className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.averageScore}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Rata-rata Skor
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="whitespace-nowrap"
            data-testid="filter-all"
          >
            <Filter size={16} className="mr-2" />
            Semua
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className="whitespace-nowrap"
            data-testid="filter-completed"
          >
            <CheckCircle size={16} className="mr-2" />
            Selesai
          </Button>
          <Button
            variant={filter === "progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("progress")}
            className="whitespace-nowrap"
            data-testid="filter-progress"
          >
            <Clock size={16} className="mr-2" />
            Berlangsung
          </Button>
        </div>
      </div>

      {/* Assessment List */}
      <div className="px-4 pb-20">
        {filteredAssessments.length === 0 ? (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Belum Ada Assessment
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Mulai assessment pertama Anda untuk melihat riwayat di sini
              </p>
              <Button
                onClick={() => setLocation("/assessment")}
                className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
                data-testid="start-first-assessment"
              >
                Mulai Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredAssessments.map((assessment: any) => (
              <AssessmentResultCard
                key={assessment.id}
                assessment={assessment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
