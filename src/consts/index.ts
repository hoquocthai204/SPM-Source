export const IMG_ALT = 'Maxbit';

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/;

export const PHONE_NUMBER_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const DATE_FORMAT = 'DD-MM-YYYY';

export const TIME_FORMAT = 'HH:mm:ss';

export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';

export const DATE_TIME_FORMAT_2 = 'YYYY-MM-DD HH:mm:ss';

export const DATE_TIME_FORMAT_3 = 'DD/MM/YYYY HH:mm:ss';

export const DATE_TIME_FILE_NAME_FORMAT = 'dddMMMYYYYHH:mm:ss';

export const MAX_SIZE_IMAGE = 5242880;

export const GOOGLE_RECAPTCHA_SITE_KEY = '6LeqkTYeAAAAAJ8XDnitXlxuF98PYhIuIUk7rLtn';

// FORMAT NUMBER: 1,233,333.44
export const SPLIT_NUMBER_REGEX = /\B(?=(\d{3})+(?!\d))/g;

export const ALLOW_ONLY_NUMBER = /^[0-9]*\.?[0-9]*$/;
// export const ALLOW_ONLY_NUMBER = /^[0-9.,]+$/;
export const AUTHENTICATION_CODE = /^[0-9]{6,6}$/;

export const REFERRAL_CODE = /^[0-9]{8}$/;

export const DEFAULT_MAX_MOVEMENT_FOR_CURRENCY = 0.00000001;

export const DEFAULT_MIN_MOVEMENT_FOR_FIAT = 0.01;

export const DEFAULT_MAX_AMOUNT = 999999999999;
export const MIN_AGE_BASE_ON_DAYS = 6570;
