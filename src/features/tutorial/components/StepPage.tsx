import React from "react";

interface StepPageProps {
  title: string;
  content: React.ReactNode;
}

export const StepPage: React.FC<StepPageProps> = ({ title, content }) => {
  return (
    <div className="bg-gray-50 sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl font-semibold leading-6 text-gray-900">{title}</h3>
        <div className="mt-5 text-md text-gray-600">{content}</div>
      </div>
    </div>
  );
};
