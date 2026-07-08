import React from "react";
import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = ({ assessments }) => {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;

    return [...assessments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Average Score */}
      <Card className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-slate-900 to-yellow-950/30 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-[0_0_35px_rgba(250,204,21,0.18)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-yellow-500/10 blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />

        <CardHeader className="relative flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-medium text-zinc-400">
              Average Score
            </CardTitle>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-500/20">
            <Trophy className="h-5 w-5 text-yellow-400" />
          </div>
        </CardHeader>

        <CardContent className="relative">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            {getAverageScore()}%
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      {/* Questions Practiced */}
      <Card className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-slate-900 to-cyan-950/30 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />

        <CardHeader className="relative flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-medium text-zinc-400">
              Questions Practiced
            </CardTitle>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
            <Brain className="h-5 w-5 text-cyan-400" />
          </div>
        </CardHeader>

        <CardContent className="relative">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            {getTotalQuestions()}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Total questions solved
          </p>
        </CardContent>
      </Card>

      {/* Latest Score */}
      <Card className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-slate-900 to-blue-950/30 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.18)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />

        <CardHeader className="relative flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-sm font-medium text-zinc-400">
              Latest Score
            </CardTitle>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
            <Target className="h-5 w-5 text-blue-400" />
          </div>
        </CardHeader>

        <CardContent className="relative">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Most recent quiz
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;