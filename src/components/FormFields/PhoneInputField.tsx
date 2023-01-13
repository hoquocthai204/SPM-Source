import { Input, Select } from 'antd';
import Flags, { FlagComponent } from 'country-flag-icons/react/3x2';
import React, { ChangeEvent, useRef } from 'react';
import { BaseInputFieldProps } from './BaseInputFieldProps';
import { FormItem } from './FormItem';

interface CountryPhoneCode {
  countryCode: string;
  countryName: string;
  phoneCode: string;
  Flag: FlagComponent;
}

interface PhoneInputFieldProps extends BaseInputFieldProps {
  defaultPhoneCode?: string;
  onChangePhone?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PhoneInputField: React.FunctionComponent<PhoneInputFieldProps> = ({
  defaultPhoneCode,
  label,
  name,
  rules,
  placeholder,
  className,
  disabled,
  onChangePhone,
}) => {
  const phoneNumberInputRef = useRef<Input>(null);

  return (
    <FormItem name={name} rules={rules} label={label} className={`phone__field ${className}`}>
      <Input
        onChange={onChangePhone}
        addonBefore={
          <FormItem name="phoneCode" noStyle>
            <Select
              disabled={disabled}
              defaultValue={defaultPhoneCode || '66'}
              showSearch={true}
              autoClearSearchValue={true}
              dropdownMatchSelectWidth={false}
              optionFilterProp="filter"
              optionLabelProp="label"
              style={{ minWidth: '110px' }}
              onSelect={() => phoneNumberInputRef.current?.focus()}
            >
              {COUNTRY_PHONE.map((value, index) => (
                <Select.Option
                  key={String(index)}
                  value={value.phoneCode}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <value.Flag style={{ width: '15px', height: '15px' }} />
                      <span>+{value.phoneCode}</span>
                    </div>
                  }
                  filter={`${value.countryCode} ${value.countryName} ${value.phoneCode}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <value.Flag style={{ width: '15px', height: '15px' }} />
                    <span>{`${value.countryName} +${value.phoneCode}`}</span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        }
        placeholder={placeholder}
        ref={phoneNumberInputRef}
        disabled={disabled}
      />
    </FormItem>
  );
};

const COUNTRY_PHONE: CountryPhoneCode[] = [
  {
    countryCode: 'AD',
    countryName: 'Andorra',
    phoneCode: '376',
    Flag: Flags.AD,
  },
  {
    countryCode: 'AE',
    countryName: 'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
    phoneCode: '971',
    Flag: Flags.AE,
  },
  {
    countryCode: 'AF',
    countryName: 'Afghanistan (‫افغانستان‬‎)',
    phoneCode: '93',
    Flag: Flags.AF,
  },
  {
    countryCode: 'AG',
    countryName: 'Antigua and Barbuda',
    phoneCode: '1268',
    Flag: Flags.AG,
  },
  {
    countryCode: 'AI',
    countryName: 'Anguilla',
    phoneCode: '1264',
    Flag: Flags.AI,
  },
  {
    countryCode: 'AL',
    countryName: 'Albania (Shqipëri)',
    phoneCode: '355',
    Flag: Flags.AL,
  },
  {
    countryCode: 'AM',
    countryName: 'Armenia (Հայաստան)',
    phoneCode: '374',
    Flag: Flags.AM,
  },
  {
    countryCode: 'AO',
    countryName: 'Angola',
    phoneCode: '244',
    Flag: Flags.AO,
  },
  {
    countryCode: 'AQ',
    countryName: 'Antarctica',
    phoneCode: '672',
    Flag: Flags.AQ,
  },
  {
    countryCode: 'AR',
    countryName: 'Argentina',
    phoneCode: '54',
    Flag: Flags.AR,
  },
  {
    countryCode: 'AT',
    countryName: 'Austria (Österreich)',
    phoneCode: '43',
    Flag: Flags.AT,
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    phoneCode: '61',
    Flag: Flags.AU,
  },
  {
    countryCode: 'AW',
    countryName: 'Aruba',
    phoneCode: '297',
    Flag: Flags.AW,
  },
  {
    countryCode: 'AX',
    countryName: 'Åland Islands',
    phoneCode: '35818',
    Flag: Flags.AX,
  },
  {
    countryCode: 'AZ',
    countryName: 'Azerbaijan (Azərbaycan)',
    phoneCode: '994',
    Flag: Flags.AZ,
  },
  {
    countryCode: 'BA',
    countryName: 'Bosnia and Herzegovina (Босна и Херцеговина)',
    phoneCode: '387',
    Flag: Flags.BA,
  },
  {
    countryCode: 'BB',
    countryName: 'Barbados',
    phoneCode: '1246',
    Flag: Flags.BB,
  },
  {
    countryCode: 'BD',
    countryName: 'Bangladesh (বাংলাদেশ)',
    phoneCode: '880',
    Flag: Flags.BD,
  },
  {
    countryCode: 'BE',
    countryName: 'Belgium (België)',
    phoneCode: '32',
    Flag: Flags.BE,
  },
  {
    countryCode: 'BF',
    countryName: 'Burkina Faso',
    phoneCode: '226',
    Flag: Flags.BF,
  },
  {
    countryCode: 'BG',
    countryName: 'Bulgaria (България)',
    phoneCode: '359',
    Flag: Flags.BG,
  },
  {
    countryCode: 'BH',
    countryName: 'Bahrain (‫البحرين‬‎)',
    phoneCode: '973',
    Flag: Flags.BH,
  },
  {
    countryCode: 'BI',
    countryName: 'Burundi (Uburundi)',
    phoneCode: '257',
    Flag: Flags.BI,
  },
  {
    countryCode: 'BJ',
    countryName: 'Benin (Bénin)',
    phoneCode: '229',
    Flag: Flags.BJ,
  },
  {
    countryCode: 'BL',
    countryName: 'Saint Barthélemy',
    phoneCode: '',
    Flag: Flags.BL,
  },
  {
    countryCode: 'BM',
    countryName: 'Bermuda',
    phoneCode: '1441',
    Flag: Flags.BM,
  },
  {
    countryCode: 'BN',
    countryName: 'Brunei',
    phoneCode: '673',
    Flag: Flags.BN,
  },
  {
    countryCode: 'BO',
    countryName: 'Bolivia',
    phoneCode: '591',
    Flag: Flags.BO,
  },
  {
    countryCode: 'BQ',
    countryName: 'Caribbean Netherlands',
    phoneCode: '5997',
    Flag: Flags.BQ,
  },
  {
    countryCode: 'BR',
    countryName: 'Brazil (Brasil)',
    phoneCode: '55',
    Flag: Flags.BR,
  },
  {
    countryCode: 'BS',
    countryName: 'Bahamas',
    phoneCode: '1242',
    Flag: Flags.BS,
  },
  {
    countryCode: 'BT',
    countryName: 'Bhutan (འབྲུག)',
    phoneCode: '975',
    Flag: Flags.BT,
  },
  {
    countryCode: 'BV',
    countryName: 'Bouvet Island',
    phoneCode: '',
    Flag: Flags.BV,
  },
  {
    countryCode: 'BW',
    countryName: 'Botswana',
    phoneCode: '267',
    Flag: Flags.BW,
  },
  {
    countryCode: 'BZ',
    countryName: 'Belize',
    phoneCode: '501',
    Flag: Flags.BZ,
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    phoneCode: '1',
    Flag: Flags.CA,
  },
  {
    countryCode: 'CC',
    countryName: 'Cocos (Keeling) Islands',
    phoneCode: '61',
    Flag: Flags.CC,
  },
  {
    countryCode: 'CF',
    countryName: 'Central African Republic (République centrafricaine)',
    phoneCode: '236',
    Flag: Flags.CF,
  },
  {
    countryCode: 'CG',
    countryName: 'Congo (Republic) (Congo-Brazzaville)',
    phoneCode: '242',
    Flag: Flags.CG,
  },
  {
    countryCode: 'CH',
    countryName: 'Switzerland (Schweiz)',
    phoneCode: '41',
    Flag: Flags.CH,
  },
  {
    countryCode: 'CI',
    countryName: 'Côte d’Ivoire',
    phoneCode: '225',
    Flag: Flags.CI,
  },
  {
    countryCode: 'CK',
    countryName: 'Cook Islands',
    phoneCode: '682',
    Flag: Flags.CK,
  },
  {
    countryCode: 'CL',
    countryName: 'Chile',
    phoneCode: '56',
    Flag: Flags.CL,
  },
  {
    countryCode: 'CM',
    countryName: 'Cameroon (Cameroun)',
    phoneCode: '237',
    Flag: Flags.CM,
  },
  {
    countryCode: 'CO',
    countryName: 'Colombia',
    phoneCode: '57',
    Flag: Flags.CO,
  },
  {
    countryCode: 'CR',
    countryName: 'Costa Rica',
    phoneCode: '506',
    Flag: Flags.CR,
  },
  {
    countryCode: 'CV',
    countryName: 'Cape Verde (Kabu Verdi)',
    phoneCode: '238',
    Flag: Flags.CV,
  },
  {
    countryCode: 'CW',
    countryName: 'Curaçao',
    phoneCode: '5999',
    Flag: Flags.CW,
  },
  {
    countryCode: 'CX',
    countryName: 'Christmas Island',
    phoneCode: '61',
    Flag: Flags.CX,
  },
  {
    countryCode: 'CY',
    countryName: 'Cyprus (Κύπρος)',
    phoneCode: '357',
    Flag: Flags.CY,
  },
  {
    countryCode: 'CZ',
    countryName: 'Czech Republic (Česká republika)',
    phoneCode: '420',
    Flag: Flags.CZ,
  },
  {
    countryCode: 'DE',
    countryName: 'Germany (Deutschland)',
    phoneCode: '49',
    Flag: Flags.DE,
  },
  {
    countryCode: 'DJ',
    countryName: 'Djibouti',
    phoneCode: '253',
    Flag: Flags.DJ,
  },
  {
    countryCode: 'DK',
    countryName: 'Denmark (Danmark)',
    phoneCode: '45',
    Flag: Flags.DK,
  },
  {
    countryCode: 'DM',
    countryName: 'Dominica',
    phoneCode: '1767',
    Flag: Flags.DM,
  },
  {
    countryCode: 'DO',
    countryName: 'Dominican Republic (República Dominicana)',
    phoneCode: '1809',
    Flag: Flags.DO,
  },
  {
    countryCode: 'DZ',
    countryName: 'Algeria (‫الجزائر‬‎)',
    phoneCode: '213',
    Flag: Flags.DZ,
  },
  {
    countryCode: 'EC',
    countryName: 'Ecuador',
    phoneCode: '593',
    Flag: Flags.EC,
  },
  {
    countryCode: 'EE',
    countryName: 'Estonia (Eesti)',
    phoneCode: '372',
    Flag: Flags.EE,
  },
  {
    countryCode: 'EG',
    countryName: 'Egypt (‫مصر‬‎)',
    phoneCode: '20',
    Flag: Flags.EG,
  },
  {
    countryCode: 'EH',
    countryName: 'Western Sahara (‫الصحراء الغربية‬‎)',
    phoneCode: '212',
    Flag: Flags.EH,
  },
  {
    countryCode: 'ER',
    countryName: 'Eritrea',
    phoneCode: '291',
    Flag: Flags.ER,
  },
  {
    countryCode: 'ES',
    countryName: 'Spain (España)',
    phoneCode: '34',
    Flag: Flags.ES,
  },
  {
    countryCode: 'ET',
    countryName: 'Ethiopia',
    phoneCode: '251',
    Flag: Flags.ET,
  },
  {
    countryCode: 'FI',
    countryName: 'Finland (Suomi)',
    phoneCode: '358',
    Flag: Flags.FI,
  },
  {
    countryCode: 'FJ',
    countryName: 'Fiji',
    phoneCode: '679',
    Flag: Flags.FJ,
  },
  {
    countryCode: 'FK',
    countryName: 'Falkland Islands (Islas Malvinas)',
    phoneCode: '500',
    Flag: Flags.FK,
  },
  {
    countryCode: 'FM',
    countryName: 'Micronesia',
    phoneCode: '691',
    Flag: Flags.FM,
  },
  {
    countryCode: 'FO',
    countryName: 'Faroe Islands (Føroyar)',
    phoneCode: '298',
    Flag: Flags.FO,
  },
  {
    countryCode: 'FR',
    countryName: 'France',
    phoneCode: '33',
    Flag: Flags.FR,
  },
  {
    countryCode: 'GA',
    countryName: 'Gabon',
    phoneCode: '241',
    Flag: Flags.GA,
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    phoneCode: '44',
    Flag: Flags.GB,
  },
  {
    countryCode: 'GD',
    countryName: 'Grenada',
    phoneCode: '1473',
    Flag: Flags.GD,
  },
  {
    countryCode: 'GE',
    countryName: 'Georgia (საქართველო)',
    phoneCode: '995',
    Flag: Flags.GE,
  },
  {
    countryCode: 'GF',
    countryName: 'French Guiana (Guyane française)',
    phoneCode: '594',
    Flag: Flags.GF,
  },
  {
    countryCode: 'GG',
    countryName: 'Guernsey',
    phoneCode: '44',
    Flag: Flags.GG,
  },
  {
    countryCode: 'GH',
    countryName: 'Ghana (Gaana)',
    phoneCode: '233',
    Flag: Flags.GH,
  },
  {
    countryCode: 'GI',
    countryName: 'Gibraltar',
    phoneCode: '350',
    Flag: Flags.GI,
  },
  {
    countryCode: 'GL',
    countryName: 'Greenland (Kalaallit Nunaat)',
    phoneCode: '299',
    Flag: Flags.GL,
  },
  {
    countryCode: 'GM',
    countryName: 'Gambia',
    phoneCode: '220',
    Flag: Flags.GM,
  },
  {
    countryCode: 'GN',
    countryName: 'Guinea (Guinée)',
    phoneCode: '224',
    Flag: Flags.GN,
  },
  {
    countryCode: 'GP',
    countryName: 'Guadeloupe',
    phoneCode: '590',
    Flag: Flags.GP,
  },
  {
    countryCode: 'GQ',
    countryName: 'Equatorial Guinea (Guinea Ecuatorial)',
    phoneCode: '240',
    Flag: Flags.GQ,
  },
  {
    countryCode: 'GR',
    countryName: 'Greece (Ελλάδα)',
    phoneCode: '30',
    Flag: Flags.GR,
  },
  {
    countryCode: 'GS',
    countryName: 'South Georgia and the South Sandwich Islands',
    phoneCode: '500',
    Flag: Flags.GS,
  },
  {
    countryCode: 'GT',
    countryName: 'Guatemala',
    phoneCode: '502',
    Flag: Flags.GT,
  },
  {
    countryCode: 'GW',
    countryName: 'Guinea-Bissau (Guiné Bissau)',
    phoneCode: '245',
    Flag: Flags.GW,
  },
  {
    countryCode: 'GY',
    countryName: 'Guyana',
    phoneCode: '592',
    Flag: Flags.GY,
  },
  {
    countryCode: 'HK',
    countryName: 'Hong Kong (香港)',
    phoneCode: '852',
    Flag: Flags.HK,
  },
  {
    countryCode: 'HM',
    countryName: 'Heard Island and McDonald Islands',
    phoneCode: '',
    Flag: Flags.HM,
  },
  {
    countryCode: 'HN',
    countryName: 'Honduras',
    phoneCode: '504',
    Flag: Flags.HN,
  },
  {
    countryCode: 'HR',
    countryName: 'Croatia (Hrvatska)',
    phoneCode: '385',
    Flag: Flags.HR,
  },
  {
    countryCode: 'HT',
    countryName: 'Haiti',
    phoneCode: '509',
    Flag: Flags.HT,
  },
  {
    countryCode: 'HU',
    countryName: 'Hungary (Magyarország)',
    phoneCode: '36',
    Flag: Flags.HU,
  },
  {
    countryCode: 'ID',
    countryName: 'Indonesia',
    phoneCode: '62',
    Flag: Flags.ID,
  },
  {
    countryCode: 'IE',
    countryName: 'Ireland',
    phoneCode: '353',
    Flag: Flags.IE,
  },
  {
    countryCode: 'IL',
    countryName: 'Israel (‫ישראל‬‎)',
    phoneCode: '972',
    Flag: Flags.IL,
  },
  {
    countryCode: 'IM',
    countryName: 'Isle of Man',
    phoneCode: '',
    Flag: Flags.IM,
  },
  {
    countryCode: 'IN',
    countryName: 'India (भारत)',
    phoneCode: '91',
    Flag: Flags.IN,
  },
  {
    countryCode: 'IO',
    countryName: 'British Indian Ocean Territory',
    phoneCode: '246',
    Flag: Flags.IO,
  },
  {
    countryCode: 'IS',
    countryName: 'Iceland (Ísland)',
    phoneCode: '354',
    Flag: Flags.IS,
  },
  {
    countryCode: 'IT',
    countryName: 'Italy (Italia)',
    phoneCode: '39',
    Flag: Flags.IT,
  },
  {
    countryCode: 'JE',
    countryName: 'Jersey',
    phoneCode: '44',
    Flag: Flags.JE,
  },
  {
    countryCode: 'JM',
    countryName: 'Jamaica',
    phoneCode: '1876',
    Flag: Flags.JM,
  },
  {
    countryCode: 'JO',
    countryName: 'Jordan (‫الأردن‬‎)',
    phoneCode: '962',
    Flag: Flags.JO,
  },
  {
    countryCode: 'JP',
    countryName: 'Japan (日本)',
    phoneCode: '81',
    Flag: Flags.JP,
  },
  {
    countryCode: 'KE',
    countryName: 'Kenya',
    phoneCode: '254',
    Flag: Flags.KE,
  },
  {
    countryCode: 'KG',
    countryName: 'Kyrgyzstan (Кыргызстан)',
    phoneCode: '996',
    Flag: Flags.KG,
  },
  {
    countryCode: 'KH',
    countryName: 'Cambodia (កម្ពុជា)',
    phoneCode: '855',
    Flag: Flags.KH,
  },
  {
    countryCode: 'KI',
    countryName: 'Kiribati',
    phoneCode: '686',
    Flag: Flags.KI,
  },
  {
    countryCode: 'KM',
    countryName: 'Comoros (‫جزر القمر‬‎)',
    phoneCode: '269',
    Flag: Flags.KM,
  },
  {
    countryCode: 'KN',
    countryName: 'Saint Kitts and Nevis',
    phoneCode: '1869',
    Flag: Flags.KN,
  },
  {
    countryCode: 'KR',
    countryName: 'South Korea (대한민국)',
    phoneCode: '82',
    Flag: Flags.KR,
  },
  {
    countryCode: 'KW',
    countryName: 'Kuwait (‫الكويت‬‎)',
    phoneCode: '965',
    Flag: Flags.KW,
  },
  {
    countryCode: 'KY',
    countryName: 'Cayman Islands',
    phoneCode: '1345',
    Flag: Flags.KY,
  },
  {
    countryCode: 'KZ',
    countryName: 'Kazakhstan (Казахстан)',
    phoneCode: '7',
    Flag: Flags.KZ,
  },
  {
    countryCode: 'LA',
    countryName: 'Laos (ລາວ)',
    phoneCode: '856',
    Flag: Flags.LA,
  },
  {
    countryCode: 'LB',
    countryName: 'Lebanon (‫لبنان‬‎)',
    phoneCode: '961',
    Flag: Flags.LB,
  },
  {
    countryCode: 'LC',
    countryName: 'Saint Lucia',
    phoneCode: '1758',
    Flag: Flags.LC,
  },
  {
    countryCode: 'LI',
    countryName: 'Liechtenstein',
    phoneCode: '423',
    Flag: Flags.LI,
  },
  {
    countryCode: 'LK',
    countryName: 'Sri Lanka (ශ්‍රී ලංකාව)',
    phoneCode: '94',
    Flag: Flags.LK,
  },
  {
    countryCode: 'LR',
    countryName: 'Liberia',
    phoneCode: '231',
    Flag: Flags.LR,
  },
  {
    countryCode: 'LS',
    countryName: 'Lesotho',
    phoneCode: '266',
    Flag: Flags.LS,
  },
  {
    countryCode: 'LT',
    countryName: 'Lithuania (Lietuva)',
    phoneCode: '370',
    Flag: Flags.LT,
  },
  {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    phoneCode: '352',
    Flag: Flags.LU,
  },
  {
    countryCode: 'LV',
    countryName: 'Latvia (Latvija)',
    phoneCode: '371',
    Flag: Flags.LV,
  },
  {
    countryCode: 'LY',
    countryName: 'Libya (‫ليبيا‬‎)',
    phoneCode: '218',
    Flag: Flags.LY,
  },
  {
    countryCode: 'MA',
    countryName: 'Morocco (‫المغرب‬‎)',
    phoneCode: '212',
    Flag: Flags.MA,
  },
  {
    countryCode: 'MC',
    countryName: 'Monaco',
    phoneCode: '377',
    Flag: Flags.MC,
  },
  {
    countryCode: 'MD',
    countryName: 'Moldova (Republica Moldova)',
    phoneCode: '373',
    Flag: Flags.MD,
  },
  {
    countryCode: 'ME',
    countryName: 'Montenegro (Crna Gora)',
    phoneCode: '382',
    Flag: Flags.ME,
  },
  {
    countryCode: 'MF',
    countryName: 'Saint Martin (Saint-Martin (partie française))',
    phoneCode: '590',
    Flag: Flags.MF,
  },
  {
    countryCode: 'MG',
    countryName: 'Madagascar (Madagasikara)',
    phoneCode: '261',
    Flag: Flags.MG,
  },
  {
    countryCode: 'MH',
    countryName: 'Marshall Islands',
    phoneCode: '692',
    Flag: Flags.MH,
  },
  {
    countryCode: 'MK',
    countryName: 'Macedonia (FYROM) (Македонија)',
    phoneCode: '389',
    Flag: Flags.MK,
  },
  {
    countryCode: 'ML',
    countryName: 'Mali',
    phoneCode: '223',
    Flag: Flags.ML,
  },
  {
    countryCode: 'MM',
    countryName: 'Myanmar (Burma) (မြန်မာ)',
    phoneCode: '95',
    Flag: Flags.MM,
  },
  {
    countryCode: 'MN',
    countryName: 'Mongolia (Монгол)',
    phoneCode: '976',
    Flag: Flags.MN,
  },
  {
    countryCode: 'MO',
    countryName: 'Macau (澳門)',
    phoneCode: '853',
    Flag: Flags.MO,
  },
  {
    countryCode: 'MQ',
    countryName: 'Martinique',
    phoneCode: '596',
    Flag: Flags.MQ,
  },
  {
    countryCode: 'MR',
    countryName: 'Mauritania (‫موريتانيا‬‎)',
    phoneCode: '222',
    Flag: Flags.MR,
  },
  {
    countryCode: 'MS',
    countryName: 'Montserrat',
    phoneCode: '1664',
    Flag: Flags.MS,
  },
  {
    countryCode: 'MT',
    countryName: 'Malta',
    phoneCode: '356',
    Flag: Flags.MT,
  },
  {
    countryCode: 'MU',
    countryName: 'Mauritius (Moris)',
    phoneCode: '230',
    Flag: Flags.MU,
  },
  {
    countryCode: 'MV',
    countryName: 'Maldives',
    phoneCode: '960',
    Flag: Flags.MV,
  },
  {
    countryCode: 'MW',
    countryName: 'Malawi',
    phoneCode: '265',
    Flag: Flags.MW,
  },
  {
    countryCode: 'MX',
    countryName: 'Mexico (México)',
    phoneCode: '52',
    Flag: Flags.MX,
  },
  {
    countryCode: 'MY',
    countryName: 'Malaysia',
    phoneCode: '60',
    Flag: Flags.MY,
  },
  {
    countryCode: 'MZ',
    countryName: 'Mozambique (Moçambique)',
    phoneCode: '258',
    Flag: Flags.MZ,
  },
  {
    countryCode: 'NA',
    countryName: 'Namibia (Namibië)',
    phoneCode: '264',
    Flag: Flags.NA,
  },
  {
    countryCode: 'NC',
    countryName: 'New Caledonia (Nouvelle-Calédonie)',
    phoneCode: '687',
    Flag: Flags.NC,
  },
  {
    countryCode: 'NE',
    countryName: 'Niger (Nijar)',
    phoneCode: '227',
    Flag: Flags.NE,
  },
  {
    countryCode: 'NF',
    countryName: 'Norfolk Island',
    phoneCode: '672',
    Flag: Flags.NF,
  },
  {
    countryCode: 'NG',
    countryName: 'Nigeria',
    phoneCode: '234',
    Flag: Flags.NG,
  },
  {
    countryCode: 'NI',
    countryName: 'Nicaragua',
    phoneCode: '505',
    Flag: Flags.NI,
  },
  {
    countryCode: 'NL',
    countryName: 'Netherlands (Nederland)',
    phoneCode: '31',
    Flag: Flags.NL,
  },
  {
    countryCode: 'NO',
    countryName: 'Norway (Norge)',
    phoneCode: '47',
    Flag: Flags.NO,
  },
  {
    countryCode: 'NP',
    countryName: 'Nepal (नेपाल)',
    phoneCode: '977',
    Flag: Flags.NP,
  },
  {
    countryCode: 'NR',
    countryName: 'Nauru',
    phoneCode: '674',
    Flag: Flags.NR,
  },
  {
    countryCode: 'NU',
    countryName: 'Niue',
    phoneCode: '683',
    Flag: Flags.NU,
  },
  {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    phoneCode: '64',
    Flag: Flags.NZ,
  },
  {
    countryCode: 'OM',
    countryName: 'Oman (‫عُمان‬‎)',
    phoneCode: '968',
    Flag: Flags.OM,
  },
  {
    countryCode: 'PA',
    countryName: 'Panama (Panamá)',
    phoneCode: '507',
    Flag: Flags.PA,
  },
  {
    countryCode: 'PE',
    countryName: 'Peru (Perú)',
    phoneCode: '51',
    Flag: Flags.PE,
  },
  {
    countryCode: 'PF',
    countryName: 'French Polynesia (Polynésie française)',
    phoneCode: '689',
    Flag: Flags.PF,
  },
  {
    countryCode: 'PG',
    countryName: 'Papua New Guinea',
    phoneCode: '675',
    Flag: Flags.PG,
  },
  {
    countryCode: 'PH',
    countryName: 'Philippines',
    phoneCode: '63',
    Flag: Flags.PH,
  },
  {
    countryCode: 'PK',
    countryName: 'Pakistan (‫پاکستان‬‎)',
    phoneCode: '92',
    Flag: Flags.PK,
  },
  {
    countryCode: 'PL',
    countryName: 'Poland (Polska)',
    phoneCode: '48',
    Flag: Flags.PL,
  },
  {
    countryCode: 'PM',
    countryName: 'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
    phoneCode: '508',
    Flag: Flags.PM,
  },
  {
    countryCode: 'PN',
    countryName: 'Pitcairn Islands',
    phoneCode: '64',
    Flag: Flags.PN,
  },
  {
    countryCode: 'PS',
    countryName: 'Palestine (‫فلسطين‬‎)',
    phoneCode: '970',
    Flag: Flags.PS,
  },
  {
    countryCode: 'PT',
    countryName: 'Portugal',
    phoneCode: '351',
    Flag: Flags.PT,
  },
  {
    countryCode: 'PW',
    countryName: 'Palau',
    phoneCode: '680',
    Flag: Flags.PW,
  },
  {
    countryCode: 'PY',
    countryName: 'Paraguay',
    phoneCode: '595',
    Flag: Flags.PY,
  },
  {
    countryCode: 'QA',
    countryName: 'Qatar (‫قطر‬‎)',
    phoneCode: '974',
    Flag: Flags.QA,
  },
  {
    countryCode: 'RE',
    countryName: 'Réunion (La Réunion)',
    phoneCode: '262',
    Flag: Flags.RE,
  },
  {
    countryCode: 'RO',
    countryName: 'Romania (România)',
    phoneCode: '40',
    Flag: Flags.RO,
  },
  {
    countryCode: 'RS',
    countryName: 'Serbia (Србија)',
    phoneCode: '381',
    Flag: Flags.RS,
  },
  {
    countryCode: 'RU',
    countryName: 'Russia (Россия)',
    phoneCode: '7',
    Flag: Flags.RU,
  },
  {
    countryCode: 'RW',
    countryName: 'Rwanda',
    phoneCode: '250',
    Flag: Flags.RW,
  },
  {
    countryCode: 'SA',
    countryName: 'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
    phoneCode: '966',
    Flag: Flags.SA,
  },
  {
    countryCode: 'SB',
    countryName: 'Solomon Islands',
    phoneCode: '677',
    Flag: Flags.SB,
  },
  {
    countryCode: 'SC',
    countryName: 'Seychelles',
    phoneCode: '248',
    Flag: Flags.SC,
  },
  {
    countryCode: 'SE',
    countryName: 'Sweden (Sverige)',
    phoneCode: '46',
    Flag: Flags.SE,
  },
  {
    countryCode: 'SH',
    countryName: 'Saint Helena',
    phoneCode: '290',
    Flag: Flags.SH,
  },
  {
    countryCode: 'SI',
    countryName: 'Slovenia (Slovenija)',
    phoneCode: '386',
    Flag: Flags.SI,
  },
  {
    countryCode: 'SJ',
    countryName: 'Svalbard and Jan Mayen',
    phoneCode: '47',
    Flag: Flags.SJ,
  },
  {
    countryCode: 'SK',
    countryName: 'Slovakia (Slovensko)',
    phoneCode: '421',
    Flag: Flags.SK,
  },
  {
    countryCode: 'SL',
    countryName: 'Sierra Leone',
    phoneCode: '232',
    Flag: Flags.SL,
  },
  {
    countryCode: 'SM',
    countryName: 'San Marino',
    phoneCode: '378',
    Flag: Flags.SM,
  },
  {
    countryCode: 'SN',
    countryName: 'Senegal (Sénégal)',
    phoneCode: '221',
    Flag: Flags.SN,
  },
  {
    countryCode: 'SO',
    countryName: 'Somalia (Soomaaliya)',
    phoneCode: '252',
    Flag: Flags.SO,
  },
  {
    countryCode: 'SR',
    countryName: 'Suriname',
    phoneCode: '597',
    Flag: Flags.SR,
  },
  {
    countryCode: 'ST',
    countryName: 'São Tomé and Príncipe (São Tomé e Príncipe)',
    phoneCode: '239',
    Flag: Flags.ST,
  },
  {
    countryCode: 'SV',
    countryName: 'El Salvador',
    phoneCode: '503',
    Flag: Flags.SV,
  },
  {
    countryCode: 'SX',
    countryName: 'Sint Maarten',
    phoneCode: '1721',
    Flag: Flags.SX,
  },
  {
    countryCode: 'SZ',
    countryName: 'Swaziland',
    phoneCode: '268',
    Flag: Flags.SZ,
  },
  {
    countryCode: 'TC',
    countryName: 'Turks and Caicos Islands',
    phoneCode: '1649',
    Flag: Flags.TC,
  },
  {
    countryCode: 'TD',
    countryName: 'Chad (Tchad)',
    phoneCode: '235',
    Flag: Flags.TD,
  },
  {
    countryCode: 'TF',
    countryName: 'French Southern Territories',
    phoneCode: '',
    Flag: Flags.TF,
  },
  {
    countryCode: 'TG',
    countryName: 'Togo',
    phoneCode: '228',
    Flag: Flags.TG,
  },
  {
    countryCode: 'TH',
    countryName: 'Thailand (ไทย)',
    phoneCode: '66',
    Flag: Flags.TH,
  },
  {
    countryCode: 'TJ',
    countryName: 'Tajikistan',
    phoneCode: '992',
    Flag: Flags.TJ,
  },
  {
    countryCode: 'TK',
    countryName: 'Tokelau',
    phoneCode: '690',
    Flag: Flags.TK,
  },
  {
    countryCode: 'TL',
    countryName: 'Timor-Leste',
    phoneCode: '',
    Flag: Flags.TL,
  },
  {
    countryCode: 'TM',
    countryName: 'Turkmenistan',
    phoneCode: '993',
    Flag: Flags.TM,
  },
  {
    countryCode: 'TN',
    countryName: 'Tunisia (‫تونس‬‎)',
    phoneCode: '216',
    Flag: Flags.TN,
  },
  {
    countryCode: 'TO',
    countryName: 'Tonga',
    phoneCode: '676',
    Flag: Flags.TO,
  },
  {
    countryCode: 'TR',
    countryName: 'Turkey (Türkiye)',
    phoneCode: '90',
    Flag: Flags.TR,
  },
  {
    countryCode: 'TT',
    countryName: 'Trinidad and Tobago',
    phoneCode: '1868',
    Flag: Flags.TT,
  },
  {
    countryCode: 'TV',
    countryName: 'Tuvalu',
    phoneCode: '688',
    Flag: Flags.TV,
  },
  {
    countryCode: 'TW',
    countryName: 'Taiwan (台灣)',
    phoneCode: '886',
    Flag: Flags.TW,
  },
  {
    countryCode: 'TZ',
    countryName: 'Tanzania',
    phoneCode: '255',
    Flag: Flags.TZ,
  },
  {
    countryCode: 'UA',
    countryName: 'Ukraine (Україна)',
    phoneCode: '380',
    Flag: Flags.UA,
  },
  {
    countryCode: 'UG',
    countryName: 'Uganda',
    phoneCode: '256',
    Flag: Flags.UG,
  },
  {
    countryCode: 'UY',
    countryName: 'Uruguay',
    phoneCode: '598',
    Flag: Flags.UY,
  },
  {
    countryCode: 'UZ',
    countryName: 'Uzbekistan (Oʻzbekiston)',
    phoneCode: '998',
    Flag: Flags.UZ,
  },
  {
    countryCode: 'VA',
    countryName: 'Vatican City (Città del Vaticano)',
    phoneCode: '379',
    Flag: Flags.VA,
  },
  {
    countryCode: 'VC',
    countryName: 'Saint Vincent and the Grenadines',
    phoneCode: '1784',
    Flag: Flags.VC,
  },
  {
    countryCode: 'VE',
    countryName: 'Venezuela',
    phoneCode: '58',
    Flag: Flags.VE,
  },
  {
    countryCode: 'VG',
    countryName: 'British Virgin Islands',
    phoneCode: '1284',
    Flag: Flags.VG,
  },
  {
    countryCode: 'VN',
    countryName: 'Vietnam (Việt Nam)',
    phoneCode: '84',
    Flag: Flags.VN,
  },
  {
    countryCode: 'VU',
    countryName: 'Vanuatu',
    phoneCode: '678',
    Flag: Flags.VU,
  },
  {
    countryCode: 'WF',
    countryName: 'Wallis and Futuna (Wallis-et-Futuna)',
    phoneCode: '681',
    Flag: Flags.WF,
  },
  {
    countryCode: 'WS',
    countryName: 'Samoa',
    phoneCode: '685',
    Flag: Flags.WS,
  },
  {
    countryCode: 'XK',
    countryName: 'Kosovo',
    phoneCode: '383',
    Flag: Flags.XK,
  },
  {
    countryCode: 'YE',
    countryName: 'Yemen (‫اليمن‬‎)',
    phoneCode: '967',
    Flag: Flags.YE,
  },
  {
    countryCode: 'YT',
    countryName: 'Mayotte',
    phoneCode: '262',
    Flag: Flags.YT,
  },
  {
    countryCode: 'ZA',
    countryName: 'South Africa',
    phoneCode: '27',
    Flag: Flags.ZA,
  },
  {
    countryCode: 'ZM',
    countryName: 'Zambia',
    phoneCode: '260',
    Flag: Flags.ZM,
  },
];
