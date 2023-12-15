"use client";

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

const steps = [
  {
    label: 'Taskzenとは？',
    description: (
      <p>
        Taskzenは、7つの習慣の第3の習慣を実践するためのタスク管理アプリです。<br />
        簡単に言えば、自分にとって今最も重要なことが何かを認識し、それに集中できるアプリです。<br />
        ただし、7つの習慣について知らない方も多いと思いますので、次のSTEPに説明します。<br />
      </p>
    ),
  },
  {
    label: '7つの習慣とは？',
    description: (
      <p>
        「7つの習慣」は、スティーブン・コヴィーによる自己啓発の名著で、個人と組織の効果的なリーダーシップを提唱しています。<br />
        主要な概念は、自己成長と成功に焦点を当てた7つの習慣に基づいています。初めの3つは「自己主導性」であり、個人の責任感、目標の明確化、優先順位付けを強調します。残りの4つは「相互依存性」で、協力、コミュニケーション、効果的なチームワークに焦点を当てています。<br />
        この手法を実践することで、個人や組織はより持続可能で意味のある成功を収めることができるとされています。<br />
        次のSTEPでは、第3の習慣について説明します。
      </p>
    ),
  },
  {
    label: '第3の習慣とは？',
    description: (
      <p>
        第3の習慣は、「最優先事項を優先する」ことです。<br />
        ここでいう「最優先事項」とは、なんでしょうか？<br />
        それは、自分にとって<span className="text-red-500 font-bold">最も重要だが、緊急ではない</span>ことです。<br />
        例えば、健康管理は重要ですが、緊急ではありません。<br />
        しかし、健康は一生のうちに最も重要なことの一つです。健康でなければ、仕事もできませんし、家族との時間も楽しめません。
      </p>
    ),
  },
  {
    label: '実際にTaskzenを使ってみよう',
    description: (
      <p>
        それでは実際にアプリを使ってみましょう。<br />
        アプリを使う前に、ログインする必要があります。<br />
        <span className="font-bold">右上のログインをクリック</span>して、ログインしてください。<br />
        ログインが完了したら、タスクを追加してみましょう。<br />
        タスクを追加する際には、領域を選択しましょう。普段のタスク管理アプリでは、あまり意識しないことだと思います。<br />
        しかし、領域を選択することで、自分の人生の中で最も重要なことを意識することができます。<br />
        また、Taskzenではタスクの1週間ごとの達成率を可視化する機能や通知する機能もあります。<br />
      </p>
    ),
  },
];

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        flexGrow: 1,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        my: 6,
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography variant='h5' fontWeight="bold" mt={3}>{steps[activeStep].label}</Typography>
      </Paper>
      <Box
        sx={{
          height: 300,
          width: '100%',
          p: 2,
          bgcolor: 'background.default',
        }}
      >
        {steps[activeStep].description}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            次へ
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            前へ
          </Button>
        }
      />
    </Box>
  );
}
