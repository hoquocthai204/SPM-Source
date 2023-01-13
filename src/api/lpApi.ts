import { BestPriceParams, BestPriceResponse, HttpResponse, PlaceOrderParams, PlaceOrderResponse, SettingTradeParams, TradeSettingResponse } from "models";
import axiosClient, { handleRequest } from "./axiosClient";

const lpApi = {
    
    getTradeSetting(params: SettingTradeParams): Promise<HttpResponse<TradeSettingResponse>> {
      const url = `/lp/api/public/trade-settings`;
      return axiosClient.get(url, {params});
    },

    postBestPrice(body: BestPriceParams): Promise<HttpResponse<BestPriceResponse>> {
      const url = `/lp/api/public/price/best-price`;
      return axiosClient.post(url, body);
    },

    postPlaceOrder(body: PlaceOrderParams): Promise<HttpResponse<PlaceOrderResponse>> {
      const url = `/lp/api/public/orders/place-order`;
      return handleRequest(axiosClient.post(url, body));
    },

    getWallet() : Promise<HttpResponse<any[]>> {
      const url = `/wallet/api/public/user-wallets`;
      return axiosClient.get(url);
    }



  };
  
  export default lpApi;