import sessionHistoryApi from 'api/sessionHistoryApi';
import userApi from 'api/userApi';
import { useAppDispatch, useAppTranslation } from 'app/hooks';
import settingElementLogo from 'assets/images/setting_header.png';
import userLogo from 'assets/images/user_logo.png';
import { Breadcrumb } from 'components/Commons';
import { DATE_TIME_FORMAT_2 } from 'consts';
import date from 'date-and-time';
import { CurrentSession, UserInformation } from 'models';
import PrivateRoute from 'PrivateRoute';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cutString } from 'utils';
import { padLeadingZeros } from 'utils/padLeadingZeros';
import ListGroupContainerSetting from '../components/ListGroupContainerSetting';
import { setIsKycVerified } from '../SettingSlice';

interface SettingPageProps {}

const SettingPage: React.FunctionComponent<SettingPageProps> = (props) => {
  const t = useAppTranslation();
  const [userData, setUserData] = useState<UserInformation>();
  const [currentSession, setCurrentSession] = useState<CurrentSession>();
  const [listCurrentSession, setListCurrentSession] = useState<CurrentSession[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserDetail();
    getCurrentSession();
  }, []);

  useEffect(() => {
    if (userData) {
      switch (userData.kycStatus) {
        case 'ACCEPTED':
          dispatch(setIsKycVerified(true));
          break;

        case 'INPROGRESS':
        case 'REJECTED':
          dispatch(setIsKycVerified(false));
          break;

        default:
          break;
      }
    } else dispatch(setIsKycVerified(false));
  }, [userData]);

  const getUserDetail = useCallback(async () => {
    const { body } = await userApi.getUserDetail();
    if (body) {
      setUserData(body);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setCurrentSession(listCurrentSession?.find((e) => e.sessionId === userData.sessionId));
    }
  }, [userData, listCurrentSession]);

  const getCurrentSession = useCallback(async () => {
    const { body } = await sessionHistoryApi.getAllCurrentSession();
    if (body) {
      setListCurrentSession(body);
    }
  }, []);

  return (
    <div className="setting">
      <Breadcrumb title={t('setting.setting')} />

      <div className="setting-container">
        <div className="setting__info">
          <div className="setting__info-container">
            <img src={userLogo} alt="" />

            <div className="setting__info-box">
              <div className="setting__info-detail">
                <span className="setting__info-mail">
                  {userData &&
                    cutString({
                      start: 4,
                      end: -userData.email.indexOf('@'),
                      originalString: userData.email,
                      replaceBy: '***',
                    })}
                </span>
                <span className="setting__info-id">
                  <span>{t('setting.mainPage.userID')}</span>
                  <span>{userData && padLeadingZeros(Number(userData?.userId), 10)}</span>
                </span>
              </div>

              <div className="setting__info-date">
                <span>
                  {t('setting.mainPage.lastTimeLogin')}{' '}
                  {currentSession &&
                    date.format(new Date(String(currentSession?.dateTime)), DATE_TIME_FORMAT_2)}
                </span>
                <span>IP: {currentSession && currentSession?.ipAddress}</span>
              </div>

              <NavLink to={'/my/session-history'} className={'setting__info-session-history-btn'}>
                {t('setting.mainPage.showSessionHistory')}
              </NavLink>
            </div>
          </div>

          <img src={settingElementLogo} alt="" />
        </div>

        <ListGroupContainerSetting userData={userData} />
      </div>
    </div>
  );
};

export default PrivateRoute(SettingPage);
