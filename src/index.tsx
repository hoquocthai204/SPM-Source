import { Loading } from 'components/Commons';
import React, { Suspense } from 'react';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import './config/i18n';
import './scss/app.scss';
import * as serviceWorker from './serviceWorker';

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

const defaultTheme = localStorage.getItem('product-theme');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeSwitcherProvider
        themeMap={themes}
        defaultTheme={defaultTheme || 'light'}
        insertionPoint={document.getElementById('inject-styles-here')}
      >
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </ThemeSwitcherProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
