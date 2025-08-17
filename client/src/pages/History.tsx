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
