import { AddressBookInFormation, AddressBookResponse, BaseRequestQueryParam, HttpResponse, ManageAddressBook } from 'models';
import axiosClient, { handleRequest } from './axiosClient';

const manageAddressBookApi = {
  getAddressBook(params: BaseRequestQueryParam): Promise<HttpResponse<ManageAddressBook[]>> {
    const url = `/wallet/api/public/address-books`;
    return axiosClient.get(url, { params });
  },

  addAddressBook(body: AddressBookInFormation): Promise<HttpResponse<AddressBookResponse>> {
    const url = `/wallet/api/public/address-books`;
    return handleRequest(axiosClient.post(url, body));
  },
  deleteAddressBook(addressId: string): Promise<HttpResponse<ManageAddressBook[]>> {
    const url = `/wallet/api/public/address-books/${addressId}`;
    return axiosClient.delete(url);
  },
};

export default manageAddressBookApi;
