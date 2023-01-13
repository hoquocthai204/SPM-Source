import { Sticky } from 'react-sticky';
import { useAppTranslation } from 'app/hooks';
import routeConstants from 'routes';
import { Link } from 'react-router-dom';

const {DEPOSIT_WITHDRAW} = routeConstants
export const CustomizeTabBarHistory = (props: any, DefaultTabBar: any) => {
  const t = useAppTranslation();

  return (
    <Sticky>
      {({ style }) => {
        return (
          <>
            <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            <div className="text-sb-12-16" style={{ marginRight: '0px', color: '#357CE1' }}>
              <Link to={DEPOSIT_WITHDRAW.SHOW_MORE_HISTORY.route}>{t('depositWithdraw.showMoreHistory')}</Link>
            </div>
          </>
        );
      }}
    </Sticky>
  );
};
