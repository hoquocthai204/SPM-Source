import { Select } from 'antd';
import currencyApi from 'api/currencyApi';
import { IMG_ALT } from 'consts';
import { Currency } from 'models';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MarketPrice from './MarketPrice';

const { Option } = Select;

interface TradeHeaderProps {}

const TradeHeader: React.FunctionComponent<TradeHeaderProps> = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const pairFromQuery = useMemo(() => {
    const base = searchParams.get('coinBase');
    const quote = searchParams.get('coinQuote');
    const side = searchParams.get('orderSide');
    if (!base || !quote || quote !== 'THB' || !side) return undefined;
    if (currencies && currencies.length > 0) {
      const isSide = ['buy', 'sell'].filter((x) => x === side).length > 0;
      const isExistCurrency =
        currencies.filter((currency) => currency.shortName === base).length > 0;
      if (isExistCurrency && isSide) return { base, quote, side };
      else return undefined;
    } else {
      return { base, quote, side };
    }
  }, [searchParams, currencies]);

  useEffect(() => {
    (async () => {
      const { body } = await currencyApi.getAllCurrency({ size: 99999999 });
      if (body) {
        setCurrencies(body.filter((x) => x.type === 'CRYPTO' && x.enabled));
      }
    })();
  }, []);

  useEffect(() => {
    if (!pairFromQuery) navigate('/my/trade/404');
  }, [navigate, pairFromQuery]);

  const onChange = (e: any) => {
    const pair = e.split('_');
    setSearchParams({
      orderSide: pairFromQuery?.side || '',
      coinBase: pair[0],
      coinQuote: pair[1],
    });
  };

  return (
    <>
      <div className="trade__header">
        <div className="trade__header__select-coin">
          <Select
            onChange={(e: any) => onChange(e)}
            value={`${pairFromQuery?.base}_${pairFromQuery?.quote}`}
          >
            {currencies.map((currency, index) => (
              <Option value={currency.shortName + '_THB'} key={index}>
                <div className="buy-thb__buy-coin__option" key={index}>
                  <img
                    src={currency.image}
                    alt={IMG_ALT}
                    style={{ borderRadius: '50%' }}
                  />
                  <span className="select-content">{currency.shortName + ' / THB'}</span>
                </div>
              </Option>
            ))}
          </Select>
        </div>
        <MarketPrice base={pairFromQuery?.base} quote={pairFromQuery?.quote} />
      </div>
    </>
  );
};

export default TradeHeader;
