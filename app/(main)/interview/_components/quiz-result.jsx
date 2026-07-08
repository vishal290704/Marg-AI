"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 p-4">
          <Trophy className="h-8 w-8 text-yellow-400" />
        </div>

        <div>
          <h1 className="gradient-title text-4xl font-bold">
            Quiz Results
          </h1>
          <p className="mt-1 text-zinc-400">
            Review your performance and learn from every question.
          </p>
        </div>
      </div>

      <CardContent className="space-y-8 px-0">
        {/* Score Card */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950/30 p-8 shadow-xl">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm uppercase tracking-widest text-zinc-400">
              Overall Score
            </p>

            <h2 className="mt-2 text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {result.quizScore.toFixed(1)}%
            </h2>

            <div className="mt-6 w-full">
              <Progress value={result.quizScore} className="h-3 rounded-full" />
            </div>
          </div>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950/20 p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-semibold text-blue-400">
              💡 Improvement Tip
            </h3>

            <p className="leading-7 text-zinc-300">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-white">
            Question Review
          </h2>

          {result.questions.map((q, index) => (
            <div
              key={index}
              className={`group rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                q.isCorrect
                  ? "border-green-500/20 bg-gradient-to-br from-zinc-900 via-slate-900 to-green-950/20 hover:border-green-400/40"
                  : "border-red-500/20 bg-gradient-to-br from-zinc-900 via-slate-900 to-red-950/20 hover:border-red-400/40"
              }`}
            >
              {/* Question */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold leading-7 text-white">
                  {index + 1}. {q.question}
                </h3>

                {q.isCorrect ? (
                  <div className="rounded-full bg-green-500/10 p-2">
                    <CheckCircle2 className="h-6 w-6 text-green-400" />
                  </div>
                ) : (
                  <div className="rounded-full bg-red-500/10 p-2">
                    <XCircle className="h-6 w-6 text-red-400" />
                  </div>
                )}
              </div>

              {/* Answers */}
              <div className="space-y-3 rounded-xl border border-zinc-800 bg-black/20 p-4">
                <div>
                  <span className="text-sm font-medium text-zinc-400">
                    Your Answer
                  </span>

                  <p className="mt-1 text-white">
                    {q.userAnswer}
                  </p>
                </div>

                {!q.isCorrect && (
                  <div>
                    <span className="text-sm font-medium text-green-400">
                      Correct Answer
                    </span>

                    <p className="mt-1 text-green-300">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>

              {/* Explanation */}
              <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                <p className="mb-2 font-semibold text-blue-400">
                  Explanation
                </p>

                <p className="leading-7 text-zinc-300">
                  {q.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter className="px-0">
          <Button
            onClick={onStartNew}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}