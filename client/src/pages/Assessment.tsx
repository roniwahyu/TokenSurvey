import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import AssessmentForm from "@/components/AssessmentForm";
import ExitModal from "@/components/ExitModal";
import { assessmentTypes, getAssessmentById, calculateScore } from "@/lib/assessmentData";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import AssessmentCard from "@/components/AssessmentCard";
import { calculateAssessmentScore } from "@/lib/assessmentLogic";

// Mock user ID for demo purposes
const MOCK_USER_ID = "demo-user";

export default function Assessment() {
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute("/assessment/:id");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Get assessment type from URL params or query string
  const urlParams = new URLSearchParams(window.location.search);
  const assessmentType = params?.id || urlParams.get('type');
  const assessmentData = assessmentType ? getAssessmentById(assessmentType) : null;

  const [answers, setAnswers] = useState<(number | boolean)[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  // Fetch existing assessment if available
  const { data: existingAssessments } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "assessments"],
    enabled: !!assessmentType,
  });

  const existingAssessment = existingAssessments?.find(
    (a: any) => a.type === assessmentType && !a.isCompleted
  );

  // Initialize form data
  useEffect(() => {
    if (existingAssessment && assessmentData) {
      setAnswers(existingAssessment.questions?.map((q: any) => q.answer).filter((a: any) => a !== undefined) || []);
      setCurrentQuestion(existingAssessment.currentQuestion || 0);
    } else if (assessmentData) {
      setAnswers(new Array(assessmentData.questions.length).fill(null));
      setCurrentQuestion(0);
    }
  }, [existingAssessment, assessmentData]);

  // Create or update assessment mutation
  const saveAssessmentMutation = useMutation({
    mutationFn: async (data: any) => {
      if (existingAssessment) {
        return await apiRequest("PUT", `/api/assessments/${existingAssessment.id}`, data);
      } else {
        return await apiRequest("POST", "/api/assessments", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", MOCK_USER_ID] });
    },
  });

  // Complete assessment mutation with scoring
  const completeAssessmentMutation = useMutation({
    mutationFn: async (data: { answers: { [key: string]: number | boolean }, type: string, assessmentId: string }) => {
      return await apiRequest("POST", `/api/users/${MOCK_USER_ID}/assessments/${data.assessmentId}/complete`, {
        answers: data.answers,
        type: data.type
      });
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", MOCK_USER_ID] });
      toast({
        title: "Assessment selesai!",
        description: `Hasil assessment telah disimpan. Tingkat: ${response.scores?.severity || 'Normal'}`,
      });
      // Navigate to results or history page
      setTimeout(() => {
        setLocation("/history");
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Gagal menyelesaikan assessment. Coba lagi.",
        variant: "destructive",
      });
    }
  });

  const handleAnswerChange = (questionIndex: number, answer: number | boolean) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (assessmentData?.questions.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSaveProgress = () => {
    if (!assessmentData) return;

    const progress = ((currentQuestion + 1) / assessmentData.questions.length) * 100;
    const questionsWithAnswers = assessmentData.questions.map((q, index) => ({
      question: q.question,
      answer: answers[index],
      options: q.options,
      category: q.category,
    }));

    const assessmentPayload = {
      userId: MOCK_USER_ID,
      type: assessmentData.id,
      title: assessmentData.title,
      questions: questionsWithAnswers,
      currentQuestion,
      progress: Math.round(progress),
      isCompleted: false,
    };

    saveAssessmentMutation.mutate(assessmentPayload);
  };

  const handleComplete = () => {
    if (!assessmentData || !assessmentType) return;

    const validAnswers = answers.filter(answer => answer !== null && answer !== undefined);
    if (validAnswers.length !== assessmentData.questions.length) {
      toast({
        title: "Assessment belum lengkap",
        description: "Mohon jawab semua pertanyaan sebelum menyelesaikan assessment.",
        variant: "destructive",
      });
      return;
    }

    // Convert answers to object format for new scoring system
    const answersMap: { [key: string]: number | boolean } = {};
    answers.forEach((answer, index) => {
      if (answer !== null && answer !== undefined) {
        answersMap[index + 1] = answer; // 1-based indexing
      }
    });

    if (existingAssessment?.id) {
      // Complete existing assessment with comprehensive scoring
      completeAssessmentMutation.mutate({
        answers: answersMap,
        type: assessmentType,
        assessmentId: existingAssessment.id
      });
    } else {
      // Create new assessment and complete it
      const questionsWithAnswers = assessmentData.questions.map((q, index) => ({
        question: q.question,
        answer: answers[index],
        options: q.options,
        category: q.category,
      }));

      const assessmentPayload = {
        userId: MOCK_USER_ID,
        type: assessmentType,
        title: assessmentData.title,
        questions: questionsWithAnswers,
        currentQuestion: assessmentData.questions.length - 1,
        progress: 100,
        isCompleted: false, // Will be set to true by complete endpoint
      };

      saveAssessmentMutation.mutate(assessmentPayload, {
        onSuccess: (assessment) => {
          // Complete the assessment with scoring
          completeAssessmentMutation.mutate({
            answers: answersMap,
            type: assessmentType,
            assessmentId: assessment.id
          });
        },
      });
    }
  };

  const handleStartAssessment = (type: string) => {
    setLocation(`/assessment/${type}`);
  };

  const handleExit = () => {
    handleSaveProgress();
    setLocation("/");
  };

  // Show assessment list if no specific assessment is selected
  if (!assessmentType || !assessmentData) {
    return (
      <div className="px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pilih Assessment
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Pilih salah satu assessment untuk memulai evaluasi kesehatan mental Anda.
          </p>
        </div>

        <div className="space-y-4">
          {assessmentTypes.map((assessment) => {
            const userAssessment = existingAssessments?.find(
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
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/assessment")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
            data-testid="back-to-assessment-list"
          >
            <ChevronLeft className="text-gray-600 dark:text-gray-300" size={20} />
          </Button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {assessmentData.title} Assessment
          </h2>
          <Button
            variant="ghost"
            onClick={() => setShowExitModal(true)}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
            data-testid="exit-assessment"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      {/* Assessment Form */}
      <AssessmentForm
        assessment={assessmentData}
        answers={answers}
        currentQuestion={currentQuestion}
        onAnswerChange={handleAnswerChange}
        onNextQuestion={handleNextQuestion}
        onPrevQuestion={handlePrevQuestion}
        onSaveProgress={handleSaveProgress}
        onComplete={handleComplete}
        isLoading={saveAssessmentMutation.isPending || completeAssessmentMutation.isPending}
      />

      {/* Exit Modal */}
      <ExitModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleExit}
      />
    </div>
  );
}
