"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TredingDown,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-green-500" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500" };
      default:
        return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const OutlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  //   Formatting date using date-fns(npm i date-fns)
  const lastUpdatedDate = format(new Date(insights.lastupdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true },
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated:{lastUpdatedDate}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Market Outlook Card  */}
        <Card
          className={
            "bg-gradient-to-r from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background"
          }
        >
          <CardHeader className=" flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={"text-sm font-medium"}>
              Market Outlook
            </CardTitle>
            <OutlookIcon className={`h-4 w-4 ${OutlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        {/* Industry Growth Card  */}
        <Card
          className={
            "bg-gradient-to-l from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background"
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Industry Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress value={insights.growthRate} className="mt-2" />
          </CardContent>
        </Card>

        {/* Demand Level Card  */}
        <Card
          className={
            "bg-gradient-to-r from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background"
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={"text-sm font-medium"}>
              Demand Level
            </CardTitle>
            <BriefcaseIcon className={"h-4 w-4 text-muted-foreground"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <div
              className={`h-1 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel,
              )}`}
            />
          </CardContent>
        </Card>

        {/* Top Skills Card  */}
        <Card
          className={
            "bg-gradient-to-l from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background"
          }
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Chart */}
      <Card className="bg-gradient-to-t from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg">
        <CardHeader className="border-b ">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Salary Ranges by Role
          </CardTitle>

          <CardDescription>
            Compare minimum, median, and maximum annual salaries across
            different roles.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="h-[430px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{
                    top: 30,
                    right: 20,
                    left: 10,
                    bottom: 10,
                  }}
                  barGap={4}
                  barCategoryGap="22%"
                >
                  <defs>
                    <linearGradient
                      id="minGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#E2E8F0" />
                      <stop offset="100%" stopColor="#CBD5E1" />
                    </linearGradient>

                    <linearGradient
                      id="medianGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#64748B" />
                    </linearGradient>

                    <linearGradient
                      id="maxGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 5"
                    stroke="hsl(var(--border))"
                    opacity={0.25}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 13,
                      fill: "#64748b",
                      fontWeight: 500,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}K`}
                    tick={{
                      fontSize: 12,
                      fill: "#64748b",
                    }}
                  />

                  <Tooltip
                    cursor={{
                      fill: "rgba(148,163,184,0.08)",
                    }}
                    content={({ active, payload, label }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="rounded-2xl border bg-background/95 backdrop-blur-md shadow-xl px-5 py-4">
                            <p className="mb-3 font-semibold text-foreground">
                              {label}
                            </p>

                            {payload.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between gap-8 py-1"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                      backgroundColor: item.color,
                                    }}
                                  />

                                  <span className="text-sm text-muted-foreground">
                                    {item.name}
                                  </span>
                                </div>

                                <span className="text-sm font-semibold">
                                  ${item.value}K
                                </span>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      return null;
                    }}
                  />

                  <Legend
                    verticalAlign="top"
                    height={40}
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "13px",
                      paddingBottom: "10px",
                    }}
                  />

                  <Bar
                    dataKey="min"
                    name="Minimum"
                    fill="url(#minGradient)"
                    radius={[10, 10, 0, 0]}
                    maxBarSize={40}
                    activeBar={{
                      stroke: "#CBD5E1",
                      strokeWidth: 1,
                    }}
                  />

                  <Bar
                    dataKey="median"
                    name="Median"
                    fill="url(#medianGradient)"
                    radius={[10, 10, 0, 0]}
                    maxBarSize={40}
                    activeBar={{
                      stroke: "#64748B",
                      strokeWidth: 1,
                    }}
                  />

                  <Bar
                    dataKey="max"
                    name="Maximum"
                    fill="url(#maxGradient)"
                    radius={[10, 10, 0, 0]}
                    maxBarSize={40}
                    activeBar={{
                      stroke: "#0F172A",
                      strokeWidth: 1,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Insights */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Industry Trends */}
        <Card className="overflow-hidden rounded-2xl bg-gradient-to-r from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-lg font-semibold text-white">
              Key Industry Trends
            </CardTitle>

            <CardDescription className="text-slate-300">
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <ul className="space-y-5">
              {insights.keyTrends.map((trend, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-xl p-2 transition-all duration-200 hover:bg-slate-800/40"
                >
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                  </div>

                  <p className="leading-7 text-slate-300 transition-colors hover:text-white">
                    {trend}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Recommended Skills */}
        <Card className="overflow-hidden rounded-2xl bg-gradient-to-l from-slate-500 to-slate-500 dark:from-slate-800 dark:to-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-lg font-semibold text-white">
              Recommended Skills
            </CardTitle>

            <CardDescription className="text-slate-300">
              Skills to consider developing
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="
              rounded-full
              border
              border-slate-600
              bg-slate-800
              px-4
              py-1.5
              text-sm
              font-medium
              text-slate-200
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-slate-700
              hover:text-white
              hover:shadow-md
            "
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default DashboardView;
