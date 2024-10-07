import { FC, PropsWithChildren, Children } from 'react';

type StepperProps = object & PropsWithChildren & {
  currentStep: number;
};

const Stepper: FC<StepperProps> = ({
  children,
  currentStep = 0,
}) => {
  const steps = Children.toArray(children);

  return (
    <>
      {steps[currentStep]}
    </>
  );
}

export default Stepper;