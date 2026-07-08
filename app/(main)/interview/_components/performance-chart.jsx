"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { TrendingUp } from "lucide-react";

import React from "react";

const PerformanceChart = ({ assessments }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      setChartData(formattedData);
    }
  }, [assessments]);

  return (
    <Card className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl backdrop-blur-md">
      <CardHeader className="border-b border-zinc-800/70 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="gradient-title text-3xl md:text-4xl">
              Performance Trend
            </CardTitle>

            <CardDescription className="mt-2 text-zinc-400">
              Track your quiz performance over time
            </CardDescription>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 15,
                right: 20,
                left: -10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="performanceGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur
                    stdDeviation="4"
                    result="coloredBlur"
                  />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid
                stroke="#27272A"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tick={{
                  fill: "#A1A1AA",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{
                  fill: "#A1A1AA",
                  fontSize: 12,
                }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#3B82F6",
                  strokeDasharray: "3 3",
                }}
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="rounded-xl border border-zinc-700 bg-zinc-900/95 px-4 py-3 shadow-2xl backdrop-blur-md">
                        <p className="text-xs uppercase tracking-wide text-zinc-400">
                          {payload[0].payload.date}
                        </p>

                        <p className="mt-1 text-xl font-bold text-blue-400">
                          {payload[0].value}%
                        </p>

                        <p className="text-xs text-zinc-500">
                          Quiz Score
                        </p>
                      </div>
                    );
                  }

                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="url(#performanceGradient)"
                strokeWidth={4}
                filter="url(#glow)"
                animationDuration={1200}
                animationEasing="ease-out"
                dot={{
                  r: 5,
                  fill: "#2563EB",
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 8,
                  fill: "#3B82F6",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;