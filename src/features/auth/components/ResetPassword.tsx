import React, { useState } from 'react';
import {
  StepOneComponent,
  StepTwoComponent,
  StepThreeComponent,
} from '../components/ResetPasswordStep';

interface ResetPasswordProps {}

const ResetPassword: React.FunctionComponent<ResetPasswordProps> = (props) => {

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      {/* STEP - 1: Enter Form */}
      {step === 1 ? <StepOneComponent setStep={setStep} setEmail={setEmail} /> : null}
      {step == 2 ? (
        <StepTwoComponent email={email} setStep={setStep} setPassword={setPassword} />
      ) : null}
      {/* STEP - 3: Send OTP */}
      {step === 3 ? <StepThreeComponent email={email} password={password} /> : null}
    </>
  );
};

export default ResetPassword;
