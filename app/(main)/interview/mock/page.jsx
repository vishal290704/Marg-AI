import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

const MockInterviewPage = () => {
  return (
    <div>
      <div>
        <Link href={'/interview'}>
           <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default MockInterviewPage