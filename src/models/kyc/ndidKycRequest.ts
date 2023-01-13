export interface NdidKycRequest {
  identityNumber: any;
  laserCode: any;
  titleId: any;
  title: any;
  nativeName: any;
  englishName: any;
  nationalityId: any;
  maritalStatus: any;
  dob: any;
  countryId: any;
  residentialAddress: any;
  residentialDistrict: any;
  residentialProvince: any;
  residentialPostCode: any;
  residentialSubDistrict: any;

  currentAddress: any;
  currentDistrict: any;
  currentProvince: any;
  currentPostCode: any;
  currentSubDistrict: any;

  occupationId: any;
  workPosition: any;

  companyName: any;
  companyCountryId: any;
  companyAddress: any;
  companyDistrict: any;
  companyProvince: any;
  companyPostCode: any;
  companySubDistrict: any;

  emergencyContactFirstName: any;
  emergencyContactLastName: any;
  emergencyContactPhoneNumber: any;

  passportNumber: any;
  firstName: any;
  lastName: any;

  thaiCitizenship: true;

  // Temporary
  residentialAddressId: any;
  companyAddressId: Number;
  currentAddressId: Number;
}
