import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SelectBoxField } from 'components/FormFields';
import { VerticalForm } from 'components/Forms';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import { getBase64FromUrl, isEmptyObject } from 'utils';
import cryptoApi from 'api/cryptoApi';
import QRCode from 'qrcode.react';
import { useHandleResponseError } from 'hooks';
import { AddressDepositCryptoResponse, InforCurrencyState, ListNetworkFormat } from 'models';
import { Form } from 'antd';
import { useSearchParams } from 'react-router-dom';
import logo_maxbit from 'assets/images/logo_maxbit.png';

interface DepositFormCryptoProps {
  onSubmit: any;
  onChange: any;
}

const DepositFormCrypto: React.FunctionComponent<DepositFormCryptoProps> = ({
  onSubmit,
  onChange,
}) => {
  const t = useAppTranslation();
  const [form] = Form.useForm();
  const [nameNetwork, setNameNetwork] = useState('');

  const paramsCrypto = useAppSelector((state) => state.depositWithdrawCrypto.paramsCryto);
  const [listNetwork, setListNetwork] = useState<Array<ListNetworkFormat>>([]);
  const [addressDepositCrypto, setAddressDepositCrypto] =
    useState<AddressDepositCryptoResponse | null>(null);
  const [isChangeNetwork, setIsChangeNetwork] = useState(false);
  const aRefEle = useRef<any>(null);
  const [base64Image, setBase64Image] = useState<any>('');
  const handleResponseError = useHandleResponseError();

  const generatorAddressForDeposit = useCallback(
    async (currencyShortName: string, networkSelect?: string) => {
      if (networkSelect) {
        const res = await cryptoApi.generateAddresForDeposit(currencyShortName, {
          currencyShortName: currencyShortName,
          network: networkSelect,
        });

        if (res.ok) {
          setAddressDepositCrypto(res.body);
        } else if (res.error) {
          handleResponseError(res.error);
        }
      }
    },
    [addressDepositCrypto]
  );
  const getAddress = useCallback(
    async (currencyShortName: string, network: string) => {
      const res = await cryptoApi.getAddress(currencyShortName, {
        network: network,
      });

      if (res.ok) {
        setAddressDepositCrypto({ ...res.body, networkSelect: network });
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [paramsCrypto.currencyShorName]
  );

  useEffect(() => {
    if (addressDepositCrypto && !addressDepositCrypto?.address) {
      generatorAddressForDeposit(addressDepositCrypto.currency, addressDepositCrypto.networkSelect);
    }
  }, [addressDepositCrypto]);

  const onChangeNetwork = (event: any) => {
    setNameNetwork(event);
    onChange();
    setIsChangeNetwork(true);
    getAddress(paramsCrypto.currencyShorName, event);
  };

  const download = async () => {
    const canvas: any = document.querySelector('.qrCode_Maxbit > canvas');
    aRefEle.current.href = canvas.toDataURL();
    const index = inforCurrency.networks.findIndex(
      (network: { network: string }) => network.network === nameNetwork
    );
    aRefEle.current.download = `${getCurrency}_${inforCurrency.networks[index].name}_Address_Qrcode.png`;
  };

  useEffect(() => {
    if (paramsCrypto.inforCoin) {
      getBase64FromUrl(paramsCrypto.inforCoin.logoCoin)
        .then((data) => {
          setBase64Image(data);
        })
        .catch(() => {
          setBase64Image(logo_maxbit);
        });
    }
    return () => {
      setBase64Image('');
    };
  }, [paramsCrypto]);
  const [searchParams, setSearchParams] = useSearchParams();
  const getCurrency = searchParams.get('currency');
  const [inforCurrency, setInforCurrency] = React.useState<InforCurrencyState | any>({});

  const getInformationCurrency = useCallback(
    async (shortName: string) => {
      const res = await cryptoApi.getInformationOfCurrency(shortName);

      if (res.ok) {
        setInforCurrency(res.body);
      } else if (res.error) {
        handleResponseError(res.error);
      }
    },
    [getCurrency]
  );

  useEffect(() => {
    if (getCurrency) {
      getInformationCurrency(getCurrency);
    }
  }, [getCurrency]);

  // format list network
  useEffect(() => {
    if (!isEmptyObject(inforCurrency)) {
      const networksFormat: any = [];
      inforCurrency.networks.map((network: any) => {
        networksFormat.push({
          key: network.network,
          value: (
            <div
              className="flex-row flex-ai-center"
              style={{ gap: '5px', height: '100%', width: '100%' }}
            >
              <div className="text-sb-14-24" style={{ color: '#1E2329' }}>
                {network.network}
              </div>
              <div className="text-r-14-24" style={{ color: '#838E9C' }}>
                {network.name}
              </div>
            </div>
          ),
        });
      });
      if (networksFormat.length === 1) {
        form.setFieldsValue({
          ['network']: networksFormat[0].key,
        });
        setIsChangeNetwork(true);
        getAddress(inforCurrency.shortName, inforCurrency.networks[0].network);
        setNameNetwork(inforCurrency.networks[0].network);
      } else {
        form.resetFields();
        setIsChangeNetwork(false);
      }
      setListNetwork(networksFormat);
    }
  }, [inforCurrency]);
  return (
    <>
      <VerticalForm onFinish={onSubmit} style={{ margin: '30px 0px 30px 0px' }} form={form}>
        <SelectBoxField
          name="network"
          label={t('form.label.netWork')}
          array={listNetwork}
          placeholder="Select network"
          onChange={onChangeNetwork}
          disabled={listNetwork.length === 1 ? true : false}
        />
        {isChangeNetwork &&
          (addressDepositCrypto?.address ? (
            <>
              <div
                className="deposit-withdraw__address"
                style={{ marginBottom: '30px', maxWidth: '431px' }}
              >
                <div className="text-md-14-20" style={{ marginBottom: '4px' }}>
                  {t('form.label.address')}
                </div>
                <Paragraph
                  copyable
                  style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: '600',
                    color: '#1E2329',
                  }}
                >
                  {addressDepositCrypto?.address}
                </Paragraph>
              </div>
            </>
          ) : null)}
        {isChangeNetwork &&
          (addressDepositCrypto?.tag ? (
            <>
              <div className="deposit-withdraw__address" style={{ marginBottom: '30px' }}>
                <div className="text-md-14-20" style={{ marginBottom: '4px' }}>
                  {t('form.label.tagMemo')}
                </div>
                <Paragraph
                  copyable
                  style={{
                    fontSize: '16px',
                    lineHeight: '20px',
                    fontWeight: '600',
                    color: '#1E2329',
                  }}
                >
                  {addressDepositCrypto?.tag}
                </Paragraph>
              </div>
            </>
          ) : null)}
        {isChangeNetwork &&
          (addressDepositCrypto?.address ? (
            <>
              <div className="flex-col flex-ai-center" style={{ gap: '20px' }}>
                {/* from disk cache */}
                {/* <img src={paramsCrypto.inforCoin.logoCoin} alt="" style={{ display: 'none' }} /> */}
                <span className="qrCode_Maxbit">
                  <QRCode
                    value={addressDepositCrypto?.address ? addressDepositCrypto.address : ''}
                    renderAs="canvas"
                    size={200}
                    level="H"
                    imageSettings={{
                      src: base64Image,
                      height: 50,
                      width: 50,
                      excavate: true,
                    }}
                  />
                </span>
                <a
                  ref={aRefEle}
                  className="text-md-12-24"
                  style={{ color: '#357CE1' }}
                  onClick={download}
                >
                  {t('depositWithdraw.saveQrCode')}
                </a>
              </div>
            </>
          ) : null)}
      </VerticalForm>
    </>
  );
};

export default DepositFormCrypto;
