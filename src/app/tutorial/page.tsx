"use client";

import { Stepper, Step, Button } from "@material-tailwind/react";
import { useState } from "react";
import { Step1 } from "@/features/tutorial/components/Step1";
import { Step2 } from "@/features/tutorial/components/Step2";
import { Step3 } from "@/features/tutorial/components/Step3";
import { Step4 } from "@/features/tutorial/components/Step4";

export default function Tutorial() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true); // Set isFirstStep to true for the initial step

  const stepsContent = [
    <Step1 key={0} />,
    <Step2 key={1} />,
    <Step3 key={2} />,
    <Step4 key={3} />,
  ];

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((cur) => cur + 1);
      setIsFirstStep(false);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((cur) => cur - 1);
      setIsLastStep(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-md my-10">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
        <Step onClick={() => setActiveStep(3)}>4</Step>
      </Stepper>
      <div className="mt-12 text-white">
        {stepsContent[activeStep]}
      </div>
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          前へ
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          次へ
        </Button>
      </div>
    </div>
  );
};
