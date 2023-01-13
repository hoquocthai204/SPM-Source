import manageAddressBookApi from 'api/manageAddressBook';
import { useAppTranslation } from 'app/hooks';
import { Breadcrumb } from 'components/Commons';
import { showSuccessModal } from 'components/Modals';
import { useHandleResponseError, useSubmitForm } from 'hooks';
import { AddressBookInFormation } from 'models';
import PrivateRoute from 'PrivateRoute';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AddAddressBookForm from '../components/AddAddressBookForm';

interface AddAddressBookProps {}

const initialAddressBookFormValues: AddressBookInFormation = {
  address: '',
  currency: null,
  name: '',
  network: null,
  tag: '',
};

const AddAddressBook: React.FunctionComponent<AddAddressBookProps> = (props) => {
  const navigate = useNavigate();
  const t = useAppTranslation();
  const handleResponseError = useHandleResponseError();
  const [coinSelect, setCoinSelect] = React.useState<string | null>('');

  const obSubmitAddressBook = useSubmitForm(async (value: AddressBookInFormation) => {
    const handleOK = () => {
      navigate('/my/manage-address-book');
    };
    const { ok, error } = await manageAddressBookApi.addAddressBook({
      ...value,
      currency: coinSelect ? coinSelect : '',
    });
    if (ok) showSuccessModal({ message: t('address-book.modal'), onOk: handleOK });
    else if (error) handleResponseError(error);
  });
  const handleGetCurrency = (value: string) => {
    setCoinSelect(value);
  };
  return (
    <div className="add-address-book">
      <div className="add-address-book__head">
        <Breadcrumb backUrl={'/my/setting'} title={t('address-book.title')} />
      </div>
      <div className="add-address-book__form">
        <div className="add-address-book__form__title">
          <span>{t('address-book.formTitle')}</span>
        </div>
        <AddAddressBookForm
          initialValues={initialAddressBookFormValues}
          onGetCurrency={handleGetCurrency}
          onSubmit={obSubmitAddressBook}
        />
      </div>
    </div>
  );
};

export default PrivateRoute(AddAddressBook);
