import { HttpResponse, MiniChartImage } from 'models';
import axiosClient from './axiosClient';

const ohlcApi = {
  getChartMini(base: string, quote: string): Promise<HttpResponse<MiniChartImage>> {
    const url = `/ohlc/api/common/chart/mini-24h/${base}/${quote}`;
    return axiosClient.get(url);
  },
  getAllChartMini(): Promise<HttpResponse<MiniChartImage[]>> {
    const url = `/ohlc/api/common/chart/mini-24h`;
    return axiosClient.get(url);
  },
};

export default ohlcApi;
