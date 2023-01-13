import { MenuOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Popover, Select } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { useAppTranslation, useI18n } from 'app/hooks';
import downloadAppQRCode from 'assets/images/download_app_qrcode.png';
import logo from 'assets/images/landing_logo.png';
import { IMG_ALT } from 'consts';
import { useUserDetail } from 'hooks/useUserDetail';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

interface LandingHeaderProps {}

const LandingHeader: React.FunctionComponent<LandingHeaderProps> = (props) => {
  const t = useAppTranslation();
  const i18n = useI18n();
  const [openCollapseMenu, setOpenCollapseMenu] = useState(false);
  const { isUserLoggedIn } = useUserDetail();
  const navigate = useNavigate();
  const [screenResize, setScreenResize] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => setScreenResize(window.innerWidth));
    return () => window.removeEventListener('resize', () => setScreenResize(0));
  }, []);

  const onOpenCollapseMenu = () => {
    setOpenCollapseMenu(true);
  };

  const onCloseCollapseMenu = () => {
    setOpenCollapseMenu(false);
  };

  const handleNav = (value: string) => {
    navigate(value);
  };

  const handleChangeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      <Header>
        <div className="landing__header noselect">
          <div className="logo">
            <Link to="">
              <img src={logo} alt="Maxbit" />
            </Link>
          </div>

          <div className="menu__wrapper">
            <div className="menu">
              {isUserLoggedIn && <Link to="/my/market">{t('header.market')}</Link>}
              {isUserLoggedIn && (
                <Link to="/my/trade?orderSide=buy&coinBase=BTC&coinQuote=THB">
                  {t('header.trade')}
                </Link>
              )}
              {isUserLoggedIn && <Link to="/my/wallet">{t('header.wallet')}</Link>}
              {!isUserLoggedIn && <Link to="/market">{t('header.market')}</Link>}
              <Link to="/news">{t('header.news')}</Link>
              <Link to="/news">{t('header.blog')}</Link>
            </div>
            <div className="menu">
              {!isUserLoggedIn && <Link to="/login">{t('header.login')}</Link>}
              {!isUserLoggedIn && (
                <Link to="/register" className="menu__register">
                  {t('header.register')}
                </Link>
              )}

              <div>
                <Popover
                  placement="bottom"
                  content={
                    <div className="download-app__wrapper">
                      <div className="qr-code">
                        <img src={downloadAppQRCode} alt={IMG_ALT} />
                      </div>
                      <span className="display-text">{t('header.downloadDisplayText')}</span>
                    </div>
                  }
                >
                  <span>{t('header.download')}</span>
                </Popover>
              </div>

              <div>
                <Select
                  defaultValue={i18n.language}
                  style={{ width: 90 }}
                  bordered={false}
                  onChange={(value) => i18n.changeLanguage(value)}
                >
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="th">Thailand</Select.Option>
                </Select>
              </div>
            </div>
            <div className="collapse-btn">
              <MenuOutlined style={{ fontSize: '1.5rem' }} onClick={onOpenCollapseMenu} />
            </div>
          </div>
        </div>
      </Header>

      <Drawer
        className="landing-header__side-menu"
        placement="right"
        onClose={onCloseCollapseMenu}
        visible={openCollapseMenu}
        width={screenResize < 380 ? '100%' : '378px'}
      >
        <div className="landing-header__side-nav-box">
          {!isUserLoggedIn && (
            <Button
              type="text"
              size="middle"
              className="landing-header__side-btn"
              onClick={() => {
                handleNav('login');
                onCloseCollapseMenu();
              }}
            >
              {t('header.login')}
            </Button>
          )}

          {!isUserLoggedIn && (
            <Button
              type="primary"
              size="middle"
              className="landing-header__side-btn"
              onClick={() => {
                handleNav('register');
                onCloseCollapseMenu();
              }}
            >
              {t('header.register')}
            </Button>
          )}

          {isUserLoggedIn && (
            <NavLink to="/my/market" onClick={onCloseCollapseMenu}>
              {t('header.market')}
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink
              to="/my/trade?orderSide=buy&coinBase=BTC&coinQuote=THB"
              onClick={onCloseCollapseMenu}
            >
              {t('header.trade')}
            </NavLink>
          )}
          {isUserLoggedIn && (
            <NavLink to="/my/wallet" onClick={onCloseCollapseMenu}>
              {t('header.wallet')}
            </NavLink>
          )}

          {!isUserLoggedIn && (
            <NavLink to="/market" onClick={onCloseCollapseMenu}>
              {t('header.market')}
            </NavLink>
          )}
          <NavLink to="/news" onClick={onCloseCollapseMenu}>
            {t('header.news')}
          </NavLink>
          <NavLink to="/blog" onClick={onCloseCollapseMenu}>
            {t('header.blog')}
          </NavLink>
        </div>

        <Divider />

        <div className="landing-header__side-language-box">
          <span>{t('header.language')}</span>
          <Select
            defaultValue={i18n.language}
            style={{ width: '35%' }}
            bordered={false}
            onChange={(value) => handleChangeLang(value)}
          >
            <Select.Option value="en">English</Select.Option>
            <Select.Option value="th">Thailand</Select.Option>
          </Select>
        </div>
      </Drawer>
    </>
  );
};

export default LandingHeader;
