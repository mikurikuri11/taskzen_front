"use client";

import { FC } from 'react'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useSetState } from 'react-use';
import { StyledButton } from '@/components/ui-elements/Button/StyledButton'
import { Sidebar } from '@/features/todo/components/Sidebar'
import { TodoMatrix } from '@/features/todo/components/TodoMatrix'
import { useTodoManagement } from '@/features/todo/hooks/useTodoManagement'

export const TodoManagement: FC = () => {
  const {
    open,
    setOpen,
    todosByOne,
    todosByTwo,
    todosByThree,
    todosByFour,
    openSidebar,
  } = useTodoManagement()

  interface State {
    run: boolean;
    steps: Step[];
  }

  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: [
      {
        content: <h2>Let&apos; s begin our journey!</h2>,
        locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
        placement: 'center',
        target: 'body',
      },
      {
        content: <h2>Sticky elements</h2>,
        floaterProps: {
          disableAnimation: true,
        },
        spotlightPadding: 20,
        target: '.star-burst',
      },
      {
        content: 'These are our super awesome projects!',
        placement: 'bottom',
        styles: {
          options: {
            width: 300,
          },
        },
        target: '.demo__projects h2',
        title: 'Our projects',
      },
      {
        content: (
          <div>
            You can render anything!
            <br />
            <h3>Like this H3 title</h3>
          </div>
        ),
        placement: 'top',
        target: '.demo__how-it-works h2',
        title: 'Our Mission',
      },
      {
        content: (
          <div>
            <h3>All about us</h3>
            <svg
              height="50px"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 96 96"
              width="50px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
                  fill="#000000"
                />
              </g>
            </svg>
          </div>
        ),
        placement: 'left',
        target: '.demo__about h2',
      },
    ],
  });

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setState({
      run: true,
    });
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
  };

  return (
    <div className='mt-12 mb-24'>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <div className='mx-auto max-w-screen-md flex justify-between my-10'>
        <h1 className='text-white text-2xl font-bold mt-4'>Todo Matrix</h1>
        <div>
          <StyledButton buttonStyle='bg-indigo-500' onClick={openSidebar}>
            Todoを作成する
          </StyledButton>
        </div>
        {/* <button className='bg-pink-500 p-3' onClick={handleClickStart}>
          使い方を見る
        </button> */}
      </div>
      <div className='mx-auto max-w-screen-md flex justify-evenly mt-16'>
        <div className='text-white star-burst'>緊急</div>
        <div className='text-white'>緊急でない</div>
      </div>
      <div className='mx-auto max-w-screen-md flex justify-between'>
        <div className='mx-auto max-w-screen-md flex flex-col justify-evenly my-8'>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要
          </div>
          <div
            className='text-white mx-6'
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            重要でない
          </div>
        </div>
        <TodoMatrix
          todosByOne={todosByOne}
          todosByTwo={todosByTwo}
          todosByThree={todosByThree}
          todosByFour={todosByFour}
        />
      </div>
      <Sidebar open={open} setOpen={setOpen} />
    </div>
  )
}