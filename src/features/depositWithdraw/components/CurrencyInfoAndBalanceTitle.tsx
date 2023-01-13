import React, { useCallback, useEffect } from 'react';
import flag_th from 'assets/images/flag_th.png';
import bg_fiat from 'assets/images/bg_fiat.png';
import { useAppSelector, useAppTranslation, useErrTranslation } from 'app/hooks';
import { UserWalletDetails } from 'models';
import { formatBigNumber, formatNumber, formatNumberExponential } from 'utils';
import { isEmptyObject } from 'utils';
import cryptoApi from 'api/cryptoApi';
import { useDispatch } from 'react-redux';
import { setUserWalletDetailCrypto } from '../depositWithdrawCryptoSlice';
import icon_converter from 'assets/images/icon_converter.png';
import fiatApi from 'api/fiatApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setDataFiatUser } from '../depositWithdrawSlice';

interface CurrencyInfoAndBalanceTitleProps {
  type: 'fiat' | 'crypto';
  typeUrl?: string;
  tabUrl?: string;
  dataFiat?: UserWalletDetails;
}

const CurrencyInfoAndBalanceTitle: React.FunctionComponent<CurrencyInfoAndBalanceTitleProps> = ({
  type,
}) => {
  const t = useAppTranslation();
  const et = useErrTranslation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const dataUserWalletFiat = useAppSelector((state) => state.depositWithdraw.dataFiatUser);
  const navigate = useNavigate();
  const getCurrency = searchParams.get('currency');
  const getTypeUrl = searchParams.get('type');
  // FIAT 🥚🥚
  // Calciulate Total Balance
  const calculateTotal = (
    avail: number | undefined,
    block: number | undefined,
    valuation: number | undefined | null
  ) => {
    let totalBalance = 0;
    if (valuation) {
      totalBalance = Number((avail ?? 0) + (block ?? 0)) * valuation;
    } else {
      totalBalance = Number((avail ?? 0) + (block ?? 0));
    }
    return formatNumber(totalBalance);
  };

  const getAllUserWalletForFiat = useCallback(
    async (shortName: string) => {
      const res = await fiatApi.getAllUserWallets();
      if (res.ok) {
        const walletDetail = res.body.find((wallet: any) => {
          return wallet.currency === shortName;
        });
        if (walletDetail) {
          dispatch(setDataFiatUser(walletDetail));
        } else {
          navigate('/404');
        }
      }
    },
    [getCurrency]
  );

  useEffect(() => {
    if (getCurrency) {
      getAllUserWalletForFiat(getCurrency);
    }
  }, [getCurrency]);
  // END FIAT 🥚🥚

  // CRYPTO 🩲🩲
  const paramsCryto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const userWalletDetailCrypto = useAppSelector(
    (state) => state.depositWithdrawCrypto.userWalletDetailCrypto
  );

  useEffect(() => {
    if (!isEmptyObject(paramsCryto) && paramsCryto.idWallet) {
      getUserWalletDetailCrypto(paramsCryto.idWallet);
    }
  }, [paramsCryto]);

  // ✅--- get user wallet detail
  const getUserWalletDetailCrypto = async (idWallet: number) => {
    const res = await cryptoApi.getUserWalletsDetail(idWallet);

    if (res.ok) {
      dispatch(setUserWalletDetailCrypto(res.body));
    } else if (res.error) {
      dispatch(setUserWalletDetailCrypto({}));
    }
  };

  // total balance crypto
  const calciulateTotalBalan = (avail: number, inOrder: number, valuation: number) => {
    let totalBalance = 0;
    if (valuation) {
      totalBalance = Number((avail ?? 0) + (inOrder ?? 0)) * valuation;
    } else {
      totalBalance = Number((avail ?? 0) + (inOrder ?? 0));
    }
    return formatNumber(totalBalance, true);
  };
  // END CRYPTO

  return (
    <>
      {type === 'fiat' && (
        <div
          className="flex-row"
          style={{
            marginBottom: '10px',
            padding: '13px 0px 0px 12px',
            border: '1px solid #E1E3E7',
            borderRadius: '8px',
          }}
        >
          {/* left */}
          <div style={{ width: '98%' }}>
            {/* top */}
            <div
              className="flex-row flex-align-center"
              style={{ gap: '20px', marginBottom: '24px' }}
            >
              <img src={flag_th} alt="ThaiLand" width="50" height="50" />
              <div className="text-md-30-35">Thai Baht</div>
              <div className="text-md-24-28" style={{ color: '#555555' }}>
                THB
              </div>
            </div>
            {/* bottom */}
            <div className="flex-row fiat-deposit__balance">
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.totalBalance')}</div>
                <div className="text-sb-24-30">
                  {calculateTotal(
                    dataUserWalletFiat?.availableBalance,
                    dataUserWalletFiat?.blockedBalance,
                    dataUserWalletFiat?.valuation
                  )}{' '}
                  THB
                </div>
              </div>
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.availableBalance')}</div>
                <div className="text-sb-24-30">
                  {formatNumber(Number(dataUserWalletFiat?.availableBalance))} THB
                </div>
              </div>
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.iodBalance')}</div>
                <div className="text-sb-24-30">
                  {formatNumber(Number(dataUserWalletFiat?.blockedBalance))} THB
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="fiat-deposit-overview__bg" style={{}}>
            <span>
              <img src={bg_fiat} alt="" />
            </span>
          </div>
        </div>
      )}

      {type === 'crypto' && (
        <div
          className="flex-row"
          style={{
            marginBottom: '10px',
            padding: '13px 0px 0px 12px',
            border: '1px solid #E1E3E7',
            borderRadius: '8px',
          }}
        >
          {/* left */}
          <div style={{ width: '98%' }}>
            <div
              className="flex-row flex-align-center"
              style={{ gap: '16px', marginBottom: '24px' }}
            >
              <img
                src={paramsCryto.inforCoin?.logoCoin}
                alt="Bitcoin"
                width="50"
                height="50"
                style={{ borderRadius: '50%' }}
              />
              <div className="text-md-30-35">{paramsCryto.inforCoin?.netWork}</div>
              <div className="text-md-24-28" style={{ color: '#555555' }}>
                {paramsCryto.inforCoin?.nameCoin}
                {/* <Select defaultValue="aaa" bordered={false}>
                  <Option value="aaa">AAA</Option>
                  <Option value="bbb">BBB</Option>
                </Select> */}
              </div>
            </div>
            {/* bottom */}
            <div className="flex-row">
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.totalBalance')}</div>
                <div className="text-sb-24-30">
                  {formatBigNumber(
                    userWalletDetailCrypto?.availableBalance +
                      userWalletDetailCrypto?.blockedBalance
                  )}
                  <img
                    src={icon_converter}
                    alt=""
                    width={20}
                    height={20}
                    style={{ margin: '0px 5px' }}
                  />
                  {calciulateTotalBalan(
                    userWalletDetailCrypto?.availableBalance,
                    userWalletDetailCrypto?.blockedBalance,
                    userWalletDetailCrypto?.valuation
                  )}{' '}
                  THB
                </div>
              </div>
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.availableBalance')}</div>
                <div className="text-sb-24-30">
                  {formatNumber(userWalletDetailCrypto?.availableBalance, false)}
                </div>
              </div>
              <div className="flex-col" style={{ gap: '10px', flexGrow: 1 }}>
                <div className="text-md-16-30">{t('depositWithdraw.iodBalance')}</div>
                <div className="text-sb-24-30">
                  {/* {formatNumber(userWalletDetailCrypto?.blockedBalance, false)} */}
                  {formatNumberExponential(userWalletDetailCrypto?.blockedBalance)}
                </div>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="fiat-deposit-overview__bg" style={{}}>
            <span>
              <img src={bg_fiat} alt="" />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrencyInfoAndBalanceTitle;
