import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsDetailPage from '../components/NewsDetailPage';
import NewsMainPage from '../components/NewsMainPage';
import LandingFooter from 'features/landing/components/LandingFooter';

interface NewsPageProps {}

const NewsPage: React.FunctionComponent<NewsPageProps> = (props) => {
  return (
    <>
      <Routes>
        <Route path="" element={<NewsMainPage />} />
        <Route path="/*" element={<NewsDetailPage />} />
      </Routes>

      <LandingFooter />
    </>
  );
};

export default NewsPage;
