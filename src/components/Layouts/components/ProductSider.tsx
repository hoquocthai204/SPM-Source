import { MenuOutlined } from '@ant-design/icons';
import { Divider, Drawer, Layout } from 'antd';
import authApi from 'api/authApi';
import { useAppDispatch, useAppTranslation } from 'app/hooks';
import maxbitLogoCollapsed from 'assets/images/logo_maxbit_new.png';
import maxbitLogo from 'assets/images/maxbit_logo_2.png';
import { LogoutSiderIcon, SiderCollapseIcon } from 'components/Icons';
import { setClearStateToLogout } from 'features/auth/authSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductMenuContainer from './ProductMenuContainer';

interface ProductSiderProps {}

const { Sider } = Layout;

const LOCAL_SIDER_COLLAPSE_KEY = 'product-sider-collapse';

const ProductSider: React.FunctionComponent<ProductSiderProps> = (props) => {
  const t = useAppTranslation();
  const [screenResize, setScreenResize] = useState<number>(window.innerWidth);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(
    Boolean(localStorage.getItem(LOCAL_SIDER_COLLAPSE_KEY))
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () => setScreenResize(window.innerWidth));
    return () => window.removeEventListener('resize', () => setScreenResize(0));
  }, []);

  useEffect(() => {
    if (screenResize < 580) setCollapsed(true);
  }, [screenResize]);

  const toggleSiderCollapse = () => {
    localStorage.setItem(LOCAL_SIDER_COLLAPSE_KEY, String(!collapsed));
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    dispatch(setClearStateToLogout());
    logoutSession();
    navigate('/');
  };

  const logoutSession = useCallback(async () => {
    await authApi.logout();
  }, []);

  const handleNav = (value: string) => {
    navigate(value);
  };

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={64}
        className="product__sider"
      >
        <div className="wrapper">
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: `24px 12px`,
              width: `${collapsed ? '64px' : '240px'}`,
            }}
          >
            <div className="product-sider__main-side">
              {collapsed ? (
                <img
                  src={maxbitLogoCollapsed}
                  style={{ maxHeight: '41px', height: '41px' }}
                  alt=""
                  className="product-sider__main-logo"
                  onClick={() => handleNav('/')}
                />
              ) : (
                <img
                  src={maxbitLogo}
                  style={{ maxHeight: '35px', height: '26.14px' }}
                  alt=""
                  className="product-sider__main-logo"
                  onClick={() => handleNav('/')}
                />
              )}

              <ProductMenuContainer collapsed={collapsed} />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                alignContent: 'center',
              }}
            >
              <div
                className="product-sider__logout"
                style={{
                  padding: '11px',
                  borderRadius: '5px',
                  maxHeight: '40px',
                  display: 'flex',
                  gap: '18px',
                  alignContent: 'center',
                  fontWeight: '500',
                  color: '#5A6689',
                  cursor: 'pointer',
                }}
                onClick={handleLogout}
              >
                <LogoutSiderIcon />
                {!collapsed && <span>{t('header.logout')}</span>}
              </div>

              <div
                className="product-sider__collapse"
                style={{
                  padding: '11px',
                  borderRadius: '5px',
                  maxHeight: '40px',
                  display: 'flex',
                  gap: '18px',
                  alignContent: 'center',
                  fontWeight: '500',
                  color: '#5A6689',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={toggleSiderCollapse}
              >
                <SiderCollapseIcon collapse={collapsed} />
                {!collapsed && <span>{t('header.collapse')}</span>}
              </div>
            </div>
          </div>

          <Divider type="vertical" style={{ height: '100vh', margin: 0 }} />
        </div>
      </Sider>
      <MenuOutlined className="product-sider__menu-icon" onClick={() => setCollapsed(false)} />
      <Drawer
        className="product-sider__drawer"
        placement="right"
        onClose={() => setCollapsed(true)}
        visible={!collapsed}
        width={'240px'}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ padding: '24px 12px 0' }}
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: `24px 12px`,
          }}
        >
          <div className="product-sider__main-side">
            <img
              src={maxbitLogo}
              style={{ maxHeight: '35px', height: '26.14px' }}
              alt=""
              className="product-sider__main-logo"
              onClick={() => handleNav('/')}
            />

            <ProductMenuContainer collapsed={collapsed} />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignContent: 'center',
            }}
          >
            <div
              className="product-sider__logout"
              style={{
                padding: '11px',
                borderRadius: '5px',
                maxHeight: '40px',
                display: 'flex',
                gap: '18px',
                alignContent: 'center',
                fontWeight: '500',
                color: '#5A6689',
                cursor: 'pointer',
              }}
              onClick={handleLogout}
            >
              <LogoutSiderIcon />
              {!collapsed && <span>{t('header.logout')}</span>}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProductSider;
