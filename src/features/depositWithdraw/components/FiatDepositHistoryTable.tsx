import { Tabs } from 'antd';
import React from 'react';
import { StickyContainer } from 'react-sticky';
import { CustomizeTabBarHistory } from './CustomizeTabBarHistory';
import TabDepositHistory from './deposit/fiat/TabDepositHistoryFiat';
import TabWithdrawHistory from './deposit/fiat/TabWithdrawHistory';
const { TabPane } = Tabs;

interface FiatDepositHistoryTableProps {
  data?: any;
}

const FiatDepositHistoryTable: React.FunctionComponent<FiatDepositHistoryTableProps> = ({
  data,
}) => {
  return (
    <>
      <div className="fiat-deposit-overview__table">
        <StickyContainer>
          <Tabs defaultActiveKey="v-depositHistory" renderTabBar={CustomizeTabBarHistory}>
            {/* Deposit History */}
            <TabPane tab="Deposit History" key="v-depositHistory">
              <TabDepositHistory data={data} />
            </TabPane>
            {/* Withdraw History */}
            <TabPane tab="Withdraw History" key="v-withdrawHistory">
              <TabWithdrawHistory data={data} />
            </TabPane>
          </Tabs>
        </StickyContainer>
      </div>
    </>
  );
};

export default FiatDepositHistoryTable;
