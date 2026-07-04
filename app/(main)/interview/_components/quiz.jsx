"use client";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import React from "react";
import { useState } from "react";
import {Card,CardContent,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  useEffect(() => {
    if(quizData){
        setAnswers(new Array(quizData.length).fill(null));
    }  
  }, [quizData]);
  

  if(generatingQuiz){
    return <BarLoader className="mt-4" width={"100%"} color="gray"/>;
  }

  if (!quizData) {
    return (
       <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and
            skills. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

//   const {
//     loading: savingResult,
//     fn: saveQuizResultFn,
//     data: resultData,
//     setData: setResultData,
//   } = useFetch(saveQuizResult);

  return <div></div>;
};

export default Quiz;
