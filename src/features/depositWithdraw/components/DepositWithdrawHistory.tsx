import React, { useEffect, useState } from 'react';
import DepositHistoryTable from './DepositHistoryTable';
import { Tabs } from 'antd';
import { StickyContainer } from 'react-sticky';
import { CustomizeTabBarHistory } from './CustomizeTabBarHistory';
import WithdrawHistoryTable from './WithdrawHistoryTable';
import { useSearchParams } from 'react-router-dom';
import { useAppTranslation } from 'app/hooks';
import { PropsDataTable } from 'models';

const { TabPane } = Tabs;
interface DepositWithdrawHistoryProps {
  showMoreUrl?: string;
  type: 'fiat' | 'crypto';
  typeUrl?: string | null;
  tabUrl?: string | null;
  propsDataTable?: PropsDataTable;
  currencyUrl?: string | null;
}

const DepositWithdrawHistory: React.FunctionComponent<DepositWithdrawHistoryProps> = ({
  type,
  tabUrl,
  propsDataTable,
  currencyUrl,
}) => {
  const t = useAppTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentTabHistory, setCurrentTabHistory] = useState<any>();
  const getTypeParams = searchParams.get('type');

  const onTabClick = (key: string) => {
    if (key === 'v-depositHistory') {
      setSearchParams({
        type: 'v-depositHistory',
        tab: tabUrl ? tabUrl : '',
        currency: currencyUrl ? currencyUrl : 'null',
      });
      setCurrentTabHistory('v-depositHistory');
    } else if (key === 'v-withdrawHistory') {
      setSearchParams({
        type: 'v-withdrawHistory',
        tab: tabUrl ? tabUrl : '',
        currency: currencyUrl ? currencyUrl : 'null',
      });
      setCurrentTabHistory('v-withdrawHistory');
    }
  };

  const onChangTab = (activeKey: any) => {};

  useEffect(() => {
    setCurrentTabHistory(getTypeParams);
  }, [getTypeParams]);

  return (
    <>
      <div className="fiat-deposit-overview__table">
        <StickyContainer>
          <Tabs
            activeKey={currentTabHistory}
            renderTabBar={CustomizeTabBarHistory}
            onTabClick={onTabClick}
            destroyInactiveTabPane={false}
            onChange={onChangTab}
          >
            {/* Deposit History */}
            <TabPane tab={t('depositWithdraw.tabs.depositHistory')} key="v-depositHistory">
              {type === 'fiat' && <DepositHistoryTable type="fiat" />}
              {type === 'crypto' && <DepositHistoryTable type="crypto" />}
              {/* <DepositHistoryTable type="fiat" propsDataTable={propsTableState} /> */}
            </TabPane>
            {/* Withdraw History */}
            <TabPane tab={t('depositWithdraw.tabs.withdrawHistory')} key="v-withdrawHistory">
              {type === 'fiat' && <WithdrawHistoryTable type="fiat" />}
              {type === 'crypto' && <WithdrawHistoryTable type="crypto" />}
            </TabPane>
          </Tabs>
        </StickyContainer>
      </div>
    </>
  );
};

export default DepositWithdrawHistory;
