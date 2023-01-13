import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, MutableRefObject } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppTranslation = () => useTranslation().t;
export const useI18n = () => useTranslation().i18n;
export const useErrTranslation = () => useTranslation(['errors']).t;
export const useTitle = (newTitle: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = newTitle;
    return () => {
      document.title = prevTitle;
    };
  });
};
export const usePrevious = <T>(value: T): MutableRefObject<T | undefined>['current'] => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
