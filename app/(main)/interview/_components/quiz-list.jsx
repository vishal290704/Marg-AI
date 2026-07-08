"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Calendar, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import QuizResult from "./quiz-result";

const QuizList = ({ assessments }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-sm">
        <CardHeader className="border-b border-zinc-800">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>

              <CardDescription className="mt-2 text-zinc-400">
                Review your previous quiz attempts and track your progress.
              </CardDescription>
            </div>

            <Button
              onClick={() => router.push("/interview/mock")}
              className="rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            >
              Start New Quiz
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                onClick={() => setSelectedQuiz(assessment)}
                className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:border-blue-500/30 hover:bg-zinc-900/80"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <CardTitle className="text-xl font-semibold text-white">
                        Quiz {assessments.length - i}
                      </CardTitle>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm font-medium text-zinc-200">
                          Score: {assessment.quizScore.toFixed(1)}%
                        </span>

                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <Calendar className="h-4 w-4" />
                          {format(
                            new Date(assessment.createdAt),
                            "MMMM dd, yyyy • HH:mm"
                          )}
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="h-5 w-5 text-zinc-500 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardHeader>

                {assessment.improvementTip && (
                  <CardContent className="pt-0">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                      <p className="mb-2 text-sm font-medium text-zinc-300">
                        Improvement Tip
                      </p>

                      <p className="text-sm leading-6 text-zinc-400">
                        {assessment.improvementTip}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>

          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizList;