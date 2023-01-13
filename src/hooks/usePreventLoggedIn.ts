import { useAppSelector } from 'app/hooks';
import { selectCurrentUser, selectIsLoggedIn } from 'features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePreventLoggedIn = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = useAppSelector(selectIsLoggedIn);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (isUserLoggedIn && currentUser) navigate('/');
  }, [isUserLoggedIn, currentUser, navigate]);
};
