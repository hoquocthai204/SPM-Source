import { Badge, Menu } from 'antd';
import notificationApi from 'api/notificationApi';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import {
  HistorySiderIcon,
  MarketSiderIcon,
  NotificationSiderIcon,
  SettingSiderIcon,
  TradeSiderIcon,
  WalletSiderIcon,
} from 'components/Icons';
import {
  SelectDataNotificationSocket,
  SelectDetailNotification,
  SelectIsReadAllNotification,
} from 'features/notification/notificationSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface ProductMenuContainerProps {
  collapsed: Boolean;
}

const ProductMenuContainer: React.FunctionComponent<ProductMenuContainerProps> = (props) => {
  const { collapsed } = props;
  const t = useAppTranslation();
  const countUnread = useAppSelector(SelectDataNotificationSocket);
  const detailNoti = useAppSelector(SelectDetailNotification);
  const isReadAll = useAppSelector(SelectIsReadAllNotification);
  const [count, setCount] = useState<number | undefined>(0);

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = () => {
    return location.pathname.split('/').slice(2);
  };

  const checkActive = (value: string) => {
    return location.pathname.split('/').includes(value);
  };

  const handleNav = (value: string) => {
    navigate(value);
  };
  useEffect(() => {
    if (countUnread && countUnread >= 0) {
      countUnreadNotification();
    }
  }, [countUnread, detailNoti, isReadAll]);

  const countUnreadNotification = useCallback(async () => {
    const { body } = await notificationApi.getNotiUnread({});
    if (body) {
      setCount(body.countUnread);
    }
  }, []);

  return (
    <Menu
      className="product-sider__menu-container"
      theme="light"
      mode="inline"
      selectedKeys={currentPath()}
    >
      <Menu.Item
        onClick={() => handleNav('market')}
        key="market"
        icon={<MarketSiderIcon active={checkActive('market')} />}
      >
        <span>{t('header.market')}</span>
      </Menu.Item>

      <Menu.Item
        key="trade"
        icon={<TradeSiderIcon active={checkActive('trade')} />}
        onClick={() => handleNav('trade?orderSide=buy&coinBase=BTC&coinQuote=THB')}
      >
        <span>{t('header.trade')}</span>
      </Menu.Item>

      <Menu.Item
        key="wallet"
        onClick={() => handleNav('wallet')}
        icon={<WalletSiderIcon active={checkActive('wallet')} />}
      >
        <span>{t('header.wallet')}</span>
      </Menu.Item>

      <Menu.SubMenu
        key="history"
        icon={<HistorySiderIcon active={checkActive('history')} />}
        title={t('header.history')}
      >
        <Menu.Item key="order">
          <NavLink to={'history/order'}>{t('header.order')}</NavLink>
        </Menu.Item>

        <Menu.Item key="transaction">
          <NavLink to={'history/transaction'}>{t('header.transaction')}</NavLink>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item
        key="notification"
        icon={<NotificationSiderIcon active={checkActive('notification')} />}
        onClick={() => handleNav('notification')}
      >
        <span
          className="badge-notification"
          style={count && count > 0 ? { marginRight: '20px' } : {}}
        >
          {t('header.notification')}
        </span>
        {count !== 0 && (
          <Badge
            count={count}
            overflowCount={10}
            showZero
            className={!collapsed ? 'badge-not-collapsed' : 'badge-collapsed'}
          />
        )}
      </Menu.Item>

      <Menu.Item
        key="setting"
        onClick={() => handleNav('setting')}
        icon={<SettingSiderIcon active={checkActive('setting')} />}
      >
        <span>{t('header.setting')}</span>
      </Menu.Item>
    </Menu>
  );
};

export default ProductMenuContainer;
