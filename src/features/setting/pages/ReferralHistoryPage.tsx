import userApi from 'api/userApi';
import { useAppTranslation } from 'app/hooks';
import referralHistory1 from 'assets/images/referral_history_1.png';
import referralHistory2 from 'assets/images/referral_history_2.png';
import { Breadcrumb } from 'components/Commons';
import { TableCommon } from 'components/Tables/TableCommon';
import { ReferralHistory } from 'models';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

interface ReferralHistoryPageProps {}

const ReferralHistoryPage: React.FunctionComponent<ReferralHistoryPageProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useAppTranslation();
  const [total, setTotal] = useState(0);
  const [referralData, setReferralData] = useState<ReferralHistory[]>([]);

  const handleOnChangePage = (page: any, pageSize: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getReferralData();
  }, []);

  const dataSource = useMemo(
    () =>
      referralData.map((e, i) => ({
        key: i,
        email: e.email,
        earning: `${e.point} THB`,
      })),
    [referralData]
  );

  const getReferralData = useCallback(async () => {
    const { body } = await userApi.getReferralHistory();
    if (body) {
      setReferralData(body);
    }
  }, []);

  useEffect(() => {
    setTotal(referralData.reduce((total, { point }) => total + point, 0));
  }, [referralData]);

  const columns = useMemo(
    () => [
      {
        title: t('referralHistory.email'),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: t('referralHistory.earnings'),
        dataIndex: 'earning',
        key: 'earning',
        align: 'right' as 'right',
      },
    ],
    [t]
  );

  return (
    <div className="referral-history">
      <div className="referral-history__header">
        <Breadcrumb backUrl={'/my/setting'} title={t('referralHistory.header')} />
      </div>
      <div className="referral-history__table">
        <div className="referral-history__total-box">
          <div className="referral-history__total-info">
            <span>{t('referralHistory.totalEarnings')}</span>
            <span>{total} THB</span>
          </div>
          <div className="referral-history__total-img">
            <img src={referralHistory1} alt="" />
            <img src={referralHistory2} alt="" />
          </div>
        </div>

        <TableCommon
          columns={columns}
          dataSource={dataSource}
          size="small"
          currentPage={currentPage}
          total={dataSource.length}
          showTotal
          onChange={handleOnChangePage}
        />
      </div>
    </div>
  );
};

export default PrivateRoute(ReferralHistoryPage);
