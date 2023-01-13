import { Layout } from 'antd';
import React from 'react';
import { RouteProps, Outlet } from 'react-router-dom';
import ProductSider from './components/ProductSider';

const { Content } = Layout;

export const ProductLayout: React.FunctionComponent<RouteProps> = (props) => {
  return (
    <>
      <Layout hasSider>
        <ProductSider />
        <Layout>
          <Content style={{ minHeight: '100vh' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
