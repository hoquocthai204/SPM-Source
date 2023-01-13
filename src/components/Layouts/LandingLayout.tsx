import { Divider, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
// import { NewsBanner } from 'components/AlertBanners';
import React from 'react';
import { Outlet, RouteProps } from 'react-router-dom';
import LandingHeader from './components/LandingHeader';

export const LandingLayout: React.FunctionComponent<RouteProps> = (props) => {
  return (
    <>
      <Layout>
        <LandingHeader />
        <Divider style={{ margin: 0 }} />
        {/* <NewsBanner /> */}
        <Content style={{ padding: '40px' }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
};
