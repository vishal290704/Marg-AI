"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CoverLetterPreview = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none rounded-lg border p-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default CoverLetterPreview;