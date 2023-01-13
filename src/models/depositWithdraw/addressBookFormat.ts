import React from 'react';

export interface AddressBookFormat {
  address?: string;
  createdDate?: string;
  currencyId?: number;
  currencySN?: string;
  id?: number;
  key?: number;
  name?: string;
  networkId?: number;
  networkSN?: string;
  tag?: string | null;
  userId?: number;
  value?: React.ReactNode;
}
