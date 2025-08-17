import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AssessmentResultCardProps {
  assessment: any;
  result?: any;
}

export default function AssessmentResultCard({ assessment, result }: AssessmentResultCardProps) {
  const isCompleted = assessment.isCompleted;
  const progress = assessment.progress || 0;
  
  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <Badge className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
          <CheckCircle className="mr-1" size={12} />
          Selesai
        </Badge>
      );
    } else if (progress > 0) {
      return (
        <Badge className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
          <Clock className="mr-1" size={12} />
          Berlangsung ({progress}%)
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-gray-500 dark:text-gray-400">
          Belum Dimulai
        </Badge>
      );
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch {
      return "Tanggal tidak tersedia";
    }
  };

  const renderResults = () => {
    if (!result || !result.categories) return null;

    if (assessment.type === 'dass42') {
      return (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={cn(
              "font-medium",
              result.categories.depression === 'Normal' 
                ? "text-green-600 dark:text-green-400"
                : result.categories.depression === 'Ringan'
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            )}>
              {result.categories.depression || 'N/A'}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Depresi</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={cn(
              "font-medium",
              result.categories.anxiety === 'Normal'
                ? "text-green-600 dark:text-green-400"
                : result.categories.anxiety === 'Ringan'
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            )}>
              {result.categories.anxiety || 'N/A'}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Kecemasan</div>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className={cn(
              "font-medium",
              result.categories.stress === 'Normal'
                ? "text-green-600 dark:text-green-400"
                : result.categories.stress === 'Ringan'
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-red-600 dark:text-red-400"
            )}>
              {result.categories.stress || 'N/A'}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Stres</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="font-medium text-gray-900 dark:text-white">
            Tingkat: {result.categories.level || 'N/A'}
          </div>
          {result.scores?.total && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Skor: {result.scores.total}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-sm" data-testid={`assessment-result-${assessment.id}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {assessment.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              <span>
                {isCompleted 
                  ? `Selesai pada ${formatDate(assessment.updatedAt)}`
                  : progress > 0
                  ? `Terakhir diakses ${formatDate(assessment.updatedAt)}`
                  : `Dibuat ${formatDate(assessment.createdAt)}`
                }
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge()}
          </div>
        </div>

        {isCompleted && result && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Hasil Assessment:
            </p>
            {renderResults()}
          </div>
        )}

        {!isCompleted && progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <Button
          className={cn(
            "w-full py-2 text-sm font-medium border rounded-lg transition-colors",
            isCompleted
              ? "text-primary border-primary/20 hover:bg-primary/5"
              : progress > 0
              ? "text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900"
              : "text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          )}
          variant="ghost"
          onClick={() => {
            if (isCompleted) {
              // Navigate to result details
              console.log("View result details for", assessment.id);
            } else {
              // Continue or start assessment
              window.location.href = `/assessment/${assessment.type}`;
            }
          }}
          data-testid={`action-button-${assessment.id}`}
        >
          <Eye className="mr-2" size={16} />
          {isCompleted 
            ? "Lihat Detail Hasil"
            : progress > 0
            ? "Lanjutkan Assessment"
            : "Mulai Assessment"
          }
        </Button>
      </CardContent>
    </Card>
  );
}
