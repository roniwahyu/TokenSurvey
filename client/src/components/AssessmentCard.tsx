import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Shield, 
  BookOpen, 
  Users, 
  AlertTriangle,
  Clock,
  HelpCircle,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  questionCount: number;
  progress: number;
  isCompleted: boolean;
  color: string;
  onStart: (id: string) => void;
}

const iconMap = {
  "chart-line": TrendingUp,
  "user-shield": Shield,
  "book-medical": BookOpen,
  "users": Users,
  "shield-exclamation": AlertTriangle,
};

const colorMap = {
  red: {
    bg: "bg-red-50 dark:bg-red-900",
    text: "text-red-600 dark:text-red-400",
    button: "bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800",
    progress: "text-red-600",
    icon: "bg-red-100 dark:bg-red-900",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900",
    text: "text-blue-600 dark:text-blue-400",
    button: "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800",
    progress: "text-blue-600",
    icon: "bg-blue-100 dark:bg-blue-900",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900",
    text: "text-green-600 dark:text-green-400",
    button: "bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800",
    progress: "text-green-600",
    icon: "bg-green-100 dark:bg-green-900",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900",
    text: "text-purple-600 dark:text-purple-400",
    button: "bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800",
    progress: "text-purple-600",
    icon: "bg-purple-100 dark:bg-purple-900",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900",
    text: "text-orange-600 dark:text-orange-400",
    button: "bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-800",
    progress: "text-orange-600",
    icon: "bg-orange-100 dark:bg-orange-900",
  },
};

export default function AssessmentCard({
  id,
  title,
  description,
  duration,
  questionCount,
  progress,
  isCompleted,
  color,
  onStart,
}: AssessmentCardProps) {
  const IconComponent = iconMap[id as keyof typeof iconMap] || TrendingUp;
  const colors = colorMap[color as keyof typeof colorMap] || colorMap.red;

  return (
    <Card className="card-hover cursor-pointer border border-gray-100 dark:border-gray-700" data-testid={`assessment-card-${id}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.icon)}>
                <IconComponent className={cn("text-sm", colors.text)} size={16} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span>
                <Clock className="mr-1 inline" size={12} />
                {duration}
              </span>
              <span>
                <HelpCircle className="mr-1 inline" size={12} />
                {questionCount} pertanyaan
              </span>
            </div>
          </div>
          <div className="ml-4">
            {isCompleted ? (
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <CheckCircle className="text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="relative w-12 h-12">
                <Progress
                  value={progress}
                  className="w-12 h-12 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                  {progress}%
                </div>
              </div>
            )}
          </div>
        </div>
        <Button
          className={cn("w-full py-2 rounded-xl font-medium text-sm transition-colors", colors.button)}
          onClick={() => onStart(id)}
          data-testid={`start-assessment-${id}`}
        >
          {isCompleted
            ? "Selesai - Lihat Hasil"
            : progress > 0
            ? "Lanjutkan Assessment"
            : "Mulai Assessment"}
        </Button>
      </CardContent>
    </Card>
  );
}
