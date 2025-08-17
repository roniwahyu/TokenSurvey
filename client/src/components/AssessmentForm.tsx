import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, X, Check } from "lucide-react";
import { AssessmentType } from "@/lib/assessmentData";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AssessmentFormProps {
  assessment: AssessmentType;
  answers: (number | boolean)[];
  currentQuestion: number;
  onAnswerChange: (questionIndex: number, answer: number | boolean) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onSaveProgress: () => void;
  onComplete: () => void;
  isLoading: boolean;
}

export default function AssessmentForm({
  assessment,
  answers,
  currentQuestion,
  onAnswerChange,
  onNextQuestion,
  onPrevQuestion,
  onSaveProgress,
  onComplete,
  isLoading,
}: AssessmentFormProps) {
  const { toast } = useToast();
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;
  const isLastQuestion = currentQuestion === assessment.questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const currentQuestionData = assessment.questions[currentQuestion];

  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion] ?? null);
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (answer: number | boolean) => {
    setSelectedAnswer(answer);
    onAnswerChange(currentQuestion, answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Pilih jawaban",
        description: "Silakan pilih salah satu jawaban sebelum melanjutkan.",
        variant: "destructive",
      });
      return;
    }

    if (isLastQuestion) {
      onComplete();
    } else {
      onNextQuestion();
    }
  };

  const handleSaveProgress = () => {
    onSaveProgress();
    toast({
      title: "Progress tersimpan",
      description: "Progress assessment Anda telah disimpan.",
    });
  };

  const getOptionColor = (index: number, isSelected: boolean) => {
    if (!isSelected) return "border-gray-100 dark:border-gray-700 hover:border-primary/20 hover:bg-primary/5";
    
    const colors = {
      red: "border-red-500 bg-red-50 dark:bg-red-900/20",
      blue: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
      green: "border-green-500 bg-green-50 dark:bg-green-900/20",
      purple: "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
      orange: "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
    };
    
    return colors[assessment.color as keyof typeof colors] || colors.blue;
  };

  if (!currentQuestionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span data-testid="progress-text">{currentQuestion + 1} dari {assessment.questions.length}</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-bar" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border border-gray-100 dark:border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Pertanyaan <span data-testid="question-number">{currentQuestion + 1}</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed" data-testid="question-text">
              {currentQuestionData.question}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => {
              const answerValue = assessment.scoring.type === 'boolean' 
                ? option === 'Benar' 
                : index;
              const isSelected = selectedAnswer === answerValue;

              return (
                <label
                  key={index}
                  className={cn(
                    "flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all",
                    getOptionColor(index, isSelected)
                  )}
                  data-testid={`option-${index}`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={answerValue.toString()}
                    checked={isSelected}
                    onChange={() => handleAnswerSelect(answerValue)}
                    className="sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full mr-4 flex items-center justify-center">
                    {isSelected && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          onClick={onPrevQuestion}
          disabled={isFirstQuestion || isLoading}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium disabled:opacity-50"
          data-testid="prev-question"
        >
          <ChevronLeft className="mr-2" size={16} />
          Sebelumnya
        </Button>

        <Button
          variant="ghost"
          onClick={handleSaveProgress}
          disabled={isLoading}
          className="px-6 py-3 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-xl font-medium"
          data-testid="save-progress"
        >
          <Save className="mr-2" size={16} />
          Simpan Progress
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null || isLoading}
          className="px-6 py-3 bg-primary text-white rounded-xl font-medium disabled:opacity-50"
          data-testid="next-question"
        >
          {isLastQuestion ? (
            <>
              <Check className="mr-2" size={16} />
              Selesai
            </>
          ) : (
            <>
              Selanjutnya
              <ChevronRight className="ml-2" size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
