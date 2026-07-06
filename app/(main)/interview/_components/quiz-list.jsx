import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';

const QuizList = ({assessments}) => {

      const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  return (
    <div>
        
    </div>
  )
}

export default QuizList