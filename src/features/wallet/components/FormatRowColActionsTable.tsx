import { useAppDispatch, useAppTranslation } from 'app/hooks';
import { tradeActions } from 'features/trade/TradeSlice';
import { NetworksCurrency } from 'models';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IFormatRowColActionsTableProps {
  idUserWallet?: number;
  currencyId?: number;
  shortName?: string;
  userId?: number;
  coin?: {
    logoCoin: string;
    nameCoin: string;
    netWork: string;
  };
  networks: Array<NetworksCurrency>;
}

const FormatRowColActionsTable: React.FunctionComponent<IFormatRowColActionsTableProps> = (
  props
) => {
  const t = useAppTranslation();
  const navigate = useNavigate();

  const handleOnClick = React.useCallback(() => {
    navigate(`/my/trade?orderSide=buy&coinBase=${props.shortName}&coinQuote=THB`);
  }, [navigate, props.shortName]);

  const _canClickDepositTHB =
    props.shortName === 'THB'
      ? `/my/fiat?type=v-depositHistory&tab=v-deposit&currency=${props.shortName}`
      : `/my/crypto?type=v-depositHistory&tab=v-deposit&currency=${props.shortName}`;
  const _canClickWithdrawTHB =
    props.shortName === 'THB'
      ? `/my/fiat?type=v-withdrawHistory&tab=v-withdraw&currency=${props.shortName}`
      : `/my/crypto?type=v-withdrawHistory&tab=v-withdraw&currency=${props.shortName}`;
  return (
    <>
      <div className="table__actions">
        <div className="table__actions-deposit-withdraw">
          <Link to={_canClickDepositTHB}>{t('form.nameButton.deposit')}</Link>/
          <Link to={_canClickWithdrawTHB}>{t('form.nameButton.withdraw')}</Link>
        </div>

        {props.shortName === 'THB' ? null : (
          <div style={{ cursor: 'pointer', color: '#1890FF' }} onClick={handleOnClick}>
            {t('form.nameButton.trade')}
          </div>
        )}
      </div>
    </>
  );
};

export default FormatRowColActionsTable;
