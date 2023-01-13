import { useAppDispatch } from 'app/hooks';
import { setClearStateToLogout } from 'features/auth/authSlice';
import { useUserDetail } from 'hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface PrivateRouteProps {}

export default function PrivateRoute<T extends PrivateRouteProps = PrivateRouteProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentPrivateRoute = (props: Omit<T, keyof PrivateRouteProps>) => {
    const { getUserDetail } = useUserDetail();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      (async () => {
        const detail = await getUserDetail();
        if (!detail) {
          dispatch(setClearStateToLogout());
          navigate('/login');
        }
      })();
    }, []);

    return <WrappedComponent {...(props as T)} />;
  };

  ComponentPrivateRoute.displayName = `PrivateRoute(${displayName})`;

  return ComponentPrivateRoute;
}
