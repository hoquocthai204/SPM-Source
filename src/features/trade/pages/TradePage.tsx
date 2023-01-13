import SettingConfigApi from 'api/settingConfigApi';
import { useAppTranslation, useTitle } from 'app/hooks';
import { usePreventPage } from 'hooks';
import { SystemConfigTrade } from 'models/setting/systemConfig';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useState } from 'react';
import OrderHistory from '../components/OrderHistory';
import Trade from '../components/Trade';
import TradeHeader from '../components/TradeHeader';
import TradingChart from '../components/TradingChart';

interface TradePageProps {}

const TradePage: React.FunctionComponent<TradePageProps> = (props) => {
  const t = useAppTranslation();
  useTitle(t('title.trade'));
  usePreventPage({ kyc: true });
  const [systemConfigTrade, setSystemConfigTrade] = useState<SystemConfigTrade>();

  useEffect(() => {
    getSettingConfigTrade();
  }, []);

  const getSettingConfigTrade = useCallback(async () => {
    const { body } = await SettingConfigApi.getConfigTrade();
    if (body) {
      setSystemConfigTrade(body);
    }
  }, []);

  return (
    <>
      <div className="trade-page">
        <div className="trade-description">
          <TradeHeader />
          <TradingChart />
        </div>
        <div className="trade-transaction">
          <Trade isTrade={systemConfigTrade?.value} />
        </div>
        <div className="trade-order-history">
          <OrderHistory />
        </div>
      </div>
    </>
  );
};

export default PrivateRoute(TradePage);
