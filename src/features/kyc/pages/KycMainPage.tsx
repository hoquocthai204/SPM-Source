import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ThaiKyc from '../components/thai/ThaiKyc';
import KycPage from './KycPage';

interface KycMainPageProps {}

const KycMainPage: React.FunctionComponent<KycMainPageProps> = (props) => {
  return (
    <Routes>
      <Route path="" element={<KycPage />} />;
      <Route path="thai" element={<ThaiKyc />} />;
    </Routes>
  );
};

export default KycMainPage;
