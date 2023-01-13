import { Select } from 'antd';
import settingApi from 'api/settingApi';
import userApi from 'api/userApi';
import { useAppSelector, useAppTranslation } from 'app/hooks';
import settingElementLogo1 from 'assets/images/setting_component_1.png';
import settingElementLogo2 from 'assets/images/setting_component_2.png';
import settingElementLogo3 from 'assets/images/setting_component_3.png';
import settingElementLogo4 from 'assets/images/setting_component_4.png';
import { CopyIcon } from 'components/Icons';
import { useUserDetail } from 'hooks';
import { Language, UserInformation } from 'models';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cutString } from 'utils';
import { isKycVerifiedStates } from '../SettingSlice';
import GroupContainer from './GroupContainerSetting';

interface ListGroupContainerSettingProps {
  userData?: UserInformation;
}

const REFERRAL_HISTORY_URL = process.env.REACT_APP_REFERRAL_URL as string;

const ListGroupContainerSetting: React.FunctionComponent<ListGroupContainerSettingProps> = (
  props
) => {
  const { userData } = props;
  const t = useAppTranslation();
  const codeRef = useRef<HTMLSpanElement | null>(null);
  const urlRef = useRef<HTMLSpanElement | null>(null);
  const isKycVerified = useAppSelector(isKycVerifiedStates);
  const { currentUser } = useUserDetail();
  const [listLang, setListLang] = useState<Language[]>();

  const handleCopy = (selectedRef: any) => {
    navigator.clipboard.writeText(selectedRef.current.textContent);
  };

  useEffect(() => {
    getListLang();
  }, []);

  const getListLang = useCallback(async () => {
    const { body } = await settingApi.getLanguages();
    setListLang(body);
  }, []);

  const handleChangeLang = useCallback(async (lang: string) => {
    await userApi.updateLanguage(lang);
  }, []);

  return (
    <>
      <GroupContainer
        keyGroup="kyc"
        logo={settingElementLogo1}
        headerText={'KYC'}
        titleElement={[t('setting.mainPage.title')]}
        detailElement={
          isKycVerified
            ? [
                <span className="setting__element-detail setting__element--verify">
                  {t('setting.mainPage.detail')}
                </span>,
              ]
            : [
                <p className="setting__element-detail">
                  <NavLink className={'setting__element-detail-option'} to={'/my/verify-kyc'}>
                    {t('setting.mainPage.detail01')}
                  </NavLink>
                </p>,
              ]
        }
      />

      <GroupContainer
        keyGroup="acount"
        logo={settingElementLogo1}
        headerText={t('setting.mainPage.groupHeader1')}
        titleElement={[t('setting.mainPage.title11'), t('setting.mainPage.title12')]}
        detailElement={[
          <p className="setting__element-detail">
            <span>
              {userData &&
                cutString({
                  start: 4,
                  end: -userData.email.indexOf('@'),
                  originalString: userData.email,
                  replaceBy: '***',
                })}
            </span>
            <NavLink className={'setting__element-detail-option'} to={'/my/change-email'}>
              {t('setting.mainPage.detail11')}
            </NavLink>
          </p>,
          <p className="setting__element-detail">
            <span>
              {userData &&
                cutString({
                  start: 4,
                  end: 3,
                  originalString: userData.phoneNumber,
                  replaceBy: '***',
                })}
            </span>
            <NavLink className={'setting__element-detail-option'} to={'/my/change-phone'}>
              {t('setting.mainPage.detail12')}
            </NavLink>
          </p>,
        ]}
      />

      <GroupContainer
        keyGroup="security"
        logo={settingElementLogo2}
        headerText={t('setting.mainPage.groupHeader2')}
        titleElement={[t('setting.mainPage.title21'), t('setting.mainPage.title22')]}
        detailElement={[
          <p className="setting__element-detail">
            <NavLink className={'setting__element-detail-option'} to={'/my/change-password'}>
              {t('setting.mainPage.detail21')}
            </NavLink>
          </p>,
          <p className="setting__element-detail">
            <NavLink
              className={
                currentUser?.twoFaType === 'NONE'
                  ? 'setting__element-detail-option'
                  : 'setting__element-detail-option--disabled'
              }
              to={currentUser?.twoFaType === 'NONE' ? '/my/set-up-2fa' : '#'}
            >
              {t('setting.mainPage.detail22')}
            </NavLink>
          </p>,
        ]}
      />

      <GroupContainer
        keyGroup="bank"
        logo={settingElementLogo3}
        headerText={t('setting.mainPage.groupHeader3')}
        titleElement={[t('setting.mainPage.title31')]}
        detailElement={[
          <p className="setting__element-detail">
            <NavLink className={'setting__element-detail-option'} to={'/my/manage-bank'}>
              {t('setting.mainPage.detail31')}
            </NavLink>
          </p>,
        ]}
      />

      <GroupContainer
        keyGroup="referral"
        logo={settingElementLogo1}
        headerText={t('setting.mainPage.groupHeader4')}
        titleElement={[
          t('setting.mainPage.title41'),
          t('setting.mainPage.title42'),
          t('setting.mainPage.title43'),
        ]}
        detailElement={[
          <p className="setting__element-detail">
            <span ref={codeRef}>{userData?.referralCode}</span>
            <span className={'setting__element-detail-option'} onClick={() => handleCopy(codeRef)}>
              <CopyIcon />
              <span onClick={() => handleCopy(codeRef)}>{t('setting.mainPage.copy')}</span>
            </span>
          </p>,
          <p className="setting__element-detail">
            <span ref={urlRef}>{`${REFERRAL_HISTORY_URL}${userData?.referralCode}`}</span>
            <span className={'setting__element-detail-option'} onClick={() => handleCopy(urlRef)}>
              <CopyIcon />
              <span>{t('setting.mainPage.copy')}</span>
            </span>
          </p>,
          <p className="setting__element-detail">
            <NavLink className={'setting__element-detail-option'} to={'/my/referral-history'}>
              {t('setting.mainPage.detail43')}
            </NavLink>
          </p>,
        ]}
      />

      <GroupContainer
        keyGroup="notification"
        logo={settingElementLogo4}
        headerText={t('setting.mainPage.groupHeader5')}
        titleElement={[t('setting.mainPage.title51')]}
        detailElement={[
          <div className="setting__element-detail">
            {userData && (
              <Select
                defaultValue={userData.language}
                style={{ fontSize: '12px', minWidth: '90px' }}
                bordered={false}
                onChange={(value) => handleChangeLang(value)}
              >
                {listLang?.map((e) => (
                  <Select.Option value={e.languageCode}>{e.languageName}</Select.Option>
                ))}
              </Select>
            )}
          </div>,
        ]}
      />
    </>
  );
};

export default ListGroupContainerSetting;
