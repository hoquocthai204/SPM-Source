import { HttpResponse } from "models";
import { SystemConfigTrade } from "models/setting/systemConfig";
import axiosClient from "./axiosClient";

const SettingConfigApi = { 
    getConfigTrade(): Promise<HttpResponse<SystemConfigTrade>> {
      const url = `/setting/api/common/configurations/system-config/TRADE`;
      return axiosClient.get(url);
    },
  };
  
  export default SettingConfigApi;